import { RiFileReduceLine } from "@remixicon/react";
import Image from "next/image";
import ImagePicker from "../ImagePicker/ImagePicker";
import type { UploadingImage } from "@/hooks/useManageUser";
import { Loader } from "@/components/loader/Loader";

interface ImagePreviewProps {
	imgSrc: string | null;
	alt: string;
	filePath: string;
	userId?: string;
	imageRefId: string;
	onDeleteImage: (imageRef: string) => Promise<void>;
	onUploadImage: (file: File) => Promise<void>;
	uploadingImage: UploadingImage;
}

export default function ImagePreview({
	imgSrc,
	alt,
	imageRefId,
	filePath,
	userId,
	uploadingImage,
	onUploadImage,
	onDeleteImage,
}: ImagePreviewProps) {
	const handleRemoveImage = async () => {
		await onDeleteImage(filePath);
	};

	return (
		<div className="relative h-[300px]">
			{uploadingImage.loading === "pending" &&
				uploadingImage.imageRefId === imageRefId && (
					<div className="h-full absolute z-50 top-0 left-0 w-full bg-black bg-opacity-50 flex justify-center items-center">
						<Loader color="white" />
					</div>
				)}
			{imgSrc ? (
				<div className="h-full">
					<Image
						src={imgSrc}
						alt={alt}
						loading="eager"
						priority
						width={300}
						height={300}
						className="object-cover rounded-md h-full border"
					/>
					<button
						type="button"
						onClick={handleRemoveImage}
						title="Remove image"
						className="absolute right-0 top-0 transition ease-in-out duration-300 hover:bg-black hover:text-white m-1 p-1 rounded-md"
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
