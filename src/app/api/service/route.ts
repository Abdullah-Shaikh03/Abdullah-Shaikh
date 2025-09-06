// app/api/certificates/route.ts  (or wherever your API route lives)
import { dbConnect } from "@/lib/dbConfig";
import Certificate from "@/models/certificates";
import { NextResponse } from "next/server";
import { z } from "zod";
import s3 from "@/lib/s3Config";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

const BUCKET = process.env.S3_BUCKET_NAME;
const S3_BASE_URL = process.env.S3_BASE_URL || null; // optional override

if (!BUCKET) {
  // You may prefer to throw on startup; here we just warn.
  console.warn("S3_BUCKET_NAME is not set. S3 uploads will fail.");
}

const certificateSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(1000),
  // image can be:
  //  - a data URL (data:<mime>;base64,<base64data>)
  //  - a full URL (https://s3.../key)
  //  - a plain key/path (folder/image.jpg)
  image: z.string().min(1),
  // accept many date-like inputs but coerce to Date
  date: z.coerce.date(),
});

// Helper: detect data URL and extract mime + base64
function parseDataUrl(dataUrl: string): { mime: string; base64: string } | null {
  const match = /^data:([^;]+);base64,(.+)$/.exec(dataUrl);
  if (!match) return null;
  return { mime: match[1], base64: match[2] };
}

// Helper: if passed a URL, return the path (remove leading '/')
function extractKeyFromUrlOrPath(imageStr: string) {
  try {
    const url = new URL(imageStr);
    const pathname = url.pathname || "";
    return pathname.startsWith("/") ? pathname.substring(1) : pathname;
  } catch {
    // not a URL, treat as key/path
    return imageStr.startsWith("/") ? imageStr.substring(1) : imageStr;
  }
}

function extensionFromMime(mime: string): string {
  // Minimal mapping; extend if needed
  const map: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif",
    "image/svg+xml": "svg",
  };
  return map[mime] || "bin";
}

function makePublicS3Url(bucket: string, key: string) {
  if (S3_BASE_URL) {
    // If you provided a base url like https://bucket.s3.region.amazonaws.com
    return `${S3_BASE_URL.replace(/\/$/, "")}/${encodeURIComponent(key)}`;
  }
  // Fallback to common endpoint (works for most regions)
  return `https://${bucket}.s3.amazonaws.com/${encodeURIComponent(key)}`;
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const parsed = certificateSchema.safeParse(body);

    if (!parsed.success) {
      const formatted = parsed.error.format();
      return NextResponse.json({ error: "Validation failed", details: formatted }, { status: 400 });
    }

    const { title, description, image, date } = parsed.data;

    let imageKey: string | null = null;
    let imageUrl: string | null = null;

    // 1) If the image is a data URL (base64), upload to S3
    const dataUrl = parseDataUrl(image);
    if (dataUrl) {
      if (!BUCKET) {
        return NextResponse.json({ error: "S3 bucket is not configured" }, { status: 500 });
      }

      const mime = dataUrl.mime;
      const base64 = dataUrl.base64;
      const buffer = Buffer.from(base64, "base64");

      const ext = extensionFromMime(mime);
      const key = `certificates/${uuidv4()}.${ext}`;

      const putParams = {
        Bucket: BUCKET,
        Key: key,
        Body: buffer,
        ContentType: mime,
        // Uncomment if you want public-read; many setups prefer private
        // ACL: "public-read",
      };

      await s3.send(new PutObjectCommand(putParams));

      imageKey = key;
      imageUrl = makePublicS3Url(BUCKET, key);
    } else {
      // 2) Not a data URL — accept URL or key/path
      // If user sent a remote URL, we normalize to the key. If it's a key we keep it.
      imageKey = extractKeyFromUrlOrPath(image);
      // Build a likely public URL for convenience. If your bucket is private you might not want to expose this.
      if (BUCKET) {
        imageUrl = makePublicS3Url(BUCKET, imageKey);
      } else {
        imageUrl = image; // best guess
      }
    }

    // 3) Save the certificate (store the key; optionally store imageUrl as well)
    const certificate = new Certificate({
      title,
      description,
      image: imageKey,
      date,
    });

    const saved = await certificate.save();
    const savedObj = saved.toObject();

    // Attach imageUrl for client convenience
    savedObj.imageUrl = imageUrl;

    return NextResponse.json(savedObj, { status: 201 });
  } catch (err) {
    console.error("Failed to create certificate:", err);
    return NextResponse.json({ error: (err as Error).message || "Server error" }, { status: 500 });
  }
}
