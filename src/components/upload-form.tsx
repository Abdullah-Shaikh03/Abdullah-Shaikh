"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Loader2, CheckCircle, AlertCircle } from "lucide-react";

export function UploadForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    dateOfAcquisition: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState<string>("");
  const router = useRouter();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setFile(files[0]);
      setUploadError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploadError("");
    setUploadSuccess(false);

    if (
      !file ||
      !formData.name ||
      !formData.description ||
      !formData.dateOfAcquisition
    ) {
      setUploadError("Please fill in all fields and select an image.");
      return;
    }

    setUploading(true);
    setUploadStatus("Starting upload...");

    try {
      console.log("Starting upload process...");
      setUploadStatus("Getting upload URL...");

      // Get presigned URL for S3 upload
      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filename: file.name,
          contentType: file.type,
        }),
      });

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json();
        console.error("Failed to get presigned URL:", errorData);
        throw new Error(errorData.error || "Failed to get upload URL");
      }

      const { url, fields, key } = await uploadResponse.json();
      console.log("Got presigned URL successfully");
      setUploadStatus("Uploading image to S3...");

      // Upload file to S3
      const formDataS3 = new FormData();
      Object.entries(fields).forEach(([fieldKey, value]) => {
        formDataS3.append(fieldKey, value as string);
      });
      formDataS3.append("file", file);

      console.log("Uploading to S3...");
      const s3Response = await fetch(url, {
        method: "POST",
        body: formDataS3,
      });

      if (!s3Response.ok) {
        const responseText = await s3Response.text();
        console.error("S3 upload failed:", {
          status: s3Response.status,
          statusText: s3Response.statusText,
          responseText: responseText.substring(0, 500),
        });

        if (responseText.includes("<?xml")) {
          const errorMatch = responseText.match(/<Message>(.*?)<\/Message>/);
          const errorMessage = errorMatch ? errorMatch[1] : "S3 upload failed";
          throw new Error(`S3 Error: ${errorMessage}`);
        }

        throw new Error(
          `S3 upload failed: ${s3Response.status} ${s3Response.statusText}`
        );
      }

      console.log("S3 upload successful!");
      setUploadStatus("Saving certificate data...");

      // Construct the image URL
      const bucketName =
        process.env.NEXT_PUBLIC_AWS_BUCKET_NAME || "your-bucket";
      const region = process.env.NEXT_PUBLIC_AWS_REGION || "us-east-1";
      const imageUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${encodeURIComponent(
        key
      )}`;

      console.log("Saving certificate to database...");
      console.log("Certificate data:", { ...formData, imageUrl });

      // Save certificate data to MongoDB using Mongoose
      const certificateResponse = await fetch("/api/certificates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          imageUrl,
        }),
      });

      console.log(
        "Certificate API response status:",
        certificateResponse.status
      );

      if (!certificateResponse.ok) {
        const responseText = await certificateResponse.text();
        console.error("Certificate save failed:", {
          status: certificateResponse.status,
          statusText: certificateResponse.statusText,
          responseText: responseText.substring(0, 500),
        });

        // Try to parse as JSON, fallback to text
        let errorMessage = "Failed to save certificate";
        try {
          const errorData = JSON.parse(responseText);
          errorMessage = errorData.error || errorMessage;
        } catch {
          // If it's not JSON, it might be HTML error page
          if (responseText.includes("<!DOCTYPE")) {
            errorMessage = "Server error - check MongoDB connection";
          } else {
            errorMessage = responseText.substring(0, 100);
          }
        }

        throw new Error(errorMessage);
      }

      const result = await certificateResponse.json();
      console.log("Certificate saved successfully:", result);

      setUploadStatus("Upload complete!");
      setUploadSuccess(true);

      // Reset form
      setFormData({ name: "", description: "", dateOfAcquisition: "" });
      setFile(null);

      // Redirect after a short delay
      setTimeout(() => {
        router.push("/certificates");
      }, 2000);
    } catch (error) {
      console.error("Upload error:", error);
      setUploadStatus("");
      setUploadError(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
    } finally {
      setUploading(false);
      setTimeout(() => setUploadStatus(""), 3000);
    }
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-card-foreground">
          Certificate Details
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Fill in the information about your certification
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground">
              Certificate Name
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g., AWS Certified Solutions Architect"
              className="bg-background border-input text-foreground focus-ring"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-foreground">
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe what this certification covers and its significance..."
              rows={4}
              className="bg-background border-input text-foreground focus-ring resize-none"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dateOfAcquisition" className="text-foreground">
              Date of Acquisition
            </Label>
            <Input
              id="dateOfAcquisition"
              name="dateOfAcquisition"
              type="date"
              value={formData.dateOfAcquisition}
              onChange={handleInputChange}
              className="bg-background border-input text-foreground focus-ring"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image" className="text-foreground">
              Certificate Image
            </Label>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="image"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-input rounded-lg cursor-pointer bg-muted/50 hover:bg-muted/80 transition-colors focus-ring"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                  <p className="mb-2 text-sm text-muted-foreground">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG or JPEG (MAX. 10MB)
                  </p>
                  {file && (
                    <p className="text-xs text-primary mt-2 font-medium">
                      Selected: {file.name}
                    </p>
                  )}
                </div>
                <Input
                  id="image"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept="image/png,image/jpeg,image/jpg"
                  required
                />
              </label>
            </div>
          </div>

          {uploadStatus && (
            <div className="flex items-center gap-2 text-sm text-primary bg-primary/10 p-3 rounded-md border border-primary/20">
              <Loader2 className="w-4 h-4 animate-spin" />
              {uploadStatus}
            </div>
          )}

          {uploadSuccess && (
            <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 dark:bg-green-900/20 p-3 rounded-md border border-green-200 dark:border-green-800">
              <CheckCircle className="w-4 h-4" />
              Certificate uploaded successfully! Redirecting...
            </div>
          )}

          {uploadError && (
            <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 p-3 rounded-md border border-destructive/20">
              <AlertCircle className="w-4 h-4" />
              {uploadError}
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 focus-ring"
            disabled={uploading}
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              "Upload Certificate"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
