import { RiFileReduceLine } from "@remixicon/react";
import Image from "next/image";

interface ImagePreviewProps {
  imgSrc: string | null;
  alt: string;
}

export default function ImagePreview({ imgSrc, alt }: ImagePreviewProps) {
  return (
    <>
      {imgSrc ? (
        <div className="relative">
          <Image
            src={imgSrc}
            priority={true}
            alt={alt}
            width={250}
            height={300}
            className="object-cover rounded h-auto w-full border"
          />
        </div>
      ) : (
        <div className="h-auto w-full bg-gray-200 rounded-md flex justify-center items-center">
          <RiFileReduceLine />
        </div>
      )}
    </>
  );
}
