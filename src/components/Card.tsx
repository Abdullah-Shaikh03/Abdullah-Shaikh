"use client";
import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Link from "next/link";
import S3Image from "./S3Image";

interface CardProps {
  imageKey: string;
}

export function Card({ imageKey }: CardProps) {
  const [imageUrl, setImageUrl] = React.useState<string>("");

  React.useEffect(() => {
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

  const handleOpenImage = () => {
    if (imageUrl) {
      window.open(imageUrl, "_blank");
    }
  };

  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-white/10 border-white relative group/card dark:hover:shadow-2xl rounded-3xl border-2 flex flex-col items-center justify-center">
        <CardItem translateZ="100" className="w-full mt-4">
          <S3Image
            imageKey={imageKey}
            height={200}
            width={500} // Adjust width as needed
          />
        </CardItem>
        <div className="flex justify-between items-center mt-20">
          <CardItem
            translateZ={60}
            as="button"
            onClick={handleOpenImage}
            className="px-4 py-2 rounded-xl bg-black text-white text-xs font-bold"
          >
            Open Image
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
