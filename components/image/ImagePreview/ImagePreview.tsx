import { RiFileReduceLine } from "@remixicon/react";
import Image from "next/image";
import ImagePicker from "../ImagePicker/ImagePicker";
import { LOADING_STATE, type LoadingState } from "@/constants/user-profile";
import AppLoader from "@/components/appLoader/AppLoader";

interface ImagePreviewProps {
  imgSrc: string | null;
  alt: string;
  filePath: string;
  userId?: string;
  imageRefId: string;
  onDeleteImage: (imageRef: string) => Promise<void>;
  onUploadImage: (file: File) => void;
  uploadingImages: Record<string, LoadingState>;
}

export default function ImagePreview({
  imgSrc,
  alt,
  imageRefId,
  filePath,
  userId,
  uploadingImages,
  onUploadImage,
  onDeleteImage,
}: ImagePreviewProps) {
  const handleRemoveImage = async () => {
    await onDeleteImage(filePath);
  };

  return (
    <div className="relative h-[300px]">
      {uploadingImages[imageRefId] === LOADING_STATE.PENDING && (
        <div className="h-full w-full absolute rounded z-50 top-0 left-0 w-full bg-black bg-opacity-50 flex justify-center items-center">
          <AppLoader />
        </div>
      )}
      {imgSrc ? (
        <div className="h-full">
          <Image
            src={imgSrc}
            alt={alt}
            loading="eager"
            priority
            width={244}
            height={300}
            className="object-cover rounded-md h-full w-full border"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            title="Remove image"
            className="absolute right-0 top-0 transition ease-in-out duration-300 hover:bg-emerald-600 hover:text-white m-1 p-1 rounded-md"
          >
            <RiFileReduceLine />
          </button>
        </div>
      ) : (
        <>
          <ImagePicker
            imageRefId={imageRefId}
            userId={userId}
            onUploadImage={onUploadImage}
          />
        </>
      )}
    </div>
  );
}
