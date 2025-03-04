import { RiFileReduceLine } from "@remixicon/react";
import Image from "next/image";
import ImagePicker from "../ImagePicker/ImagePicker";

interface ImagePreviewProps {
	imgSrc: string | null;
	alt: string;
	filePath: string;
	userId?: string;
	imageRefId: string;
	onDeleteImage: (imageRef: string) => Promise<void>;
	onUploadImage: (file: File) => Promise<void>;
}

export default function ImagePreview({
	imgSrc,
	alt,
	imageRefId,
	filePath,
	userId,
	onUploadImage,
	onDeleteImage,
}: ImagePreviewProps) {
	const handleRemoveImage = async () => {
		await onDeleteImage(filePath);
	};

	return (
		<>
			{imgSrc ? (
				<div className="relative">
					<Image
						src={imgSrc}
						alt={alt}
						width={300}
						height={300}
						className="object-cover rounded-md h-[300px] border"
					/>
					<button
						type="button"
						onClick={handleRemoveImage}
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
		</>
	);
}
