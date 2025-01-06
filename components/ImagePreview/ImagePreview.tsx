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
            width={300}
            height={300}
            className="object-cover rounded-md h-[300px] border"
          />
        </div>
      ) : (
        <div className="h-[300px] bg-gray-200 rounded-md flex justify-center items-center">
          <RiFileReduceLine />
        </div>
      )}
    </>
  );
}
