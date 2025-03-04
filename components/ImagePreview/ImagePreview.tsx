import { RiFileReduceLine } from "@remixicon/react";
import Image from "next/image";

interface ImagePreviewProps {
	imgSrc: string | null;
	alt: string;
	filePath: string;
	onDeleteImage: (imageRef: string) => Promise<void>;
}

export default function ImagePreview({
	imgSrc,
	alt,
	filePath,
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
			) : null}
		</>
	);
}
