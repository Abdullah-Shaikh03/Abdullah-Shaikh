"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

interface S3ImageProps {
  imageKey: string;
  width?: number;
  height: number; // Provide an initializer for the height property
}

export default function S3Image({
  imageKey,
  width = 300,
  height = 200,
}: S3ImageProps) {
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    async function fetchImageUrl() {
      try {
        const res = await fetch(
          `/api/getImageUrl?key=${encodeURIComponent(imageKey)}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch image URL");
        }
        const data = await res.json();
        setImageUrl(data.url);
      } catch (error) {
        console.error("Error fetching image URL:", error);
      }
    
    }
    fetchImageUrl();
  }, [imageKey]);

  return (
    <Image
      src={imageUrl}
      alt={`S3 Image - ${imageKey}`}
      width={Number(width)}
      height={Number(height)}
      className="rounded-t-3xl"/>
  );
}
