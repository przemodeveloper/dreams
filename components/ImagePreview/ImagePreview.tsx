import { RiImageCircleFill } from "@remixicon/react";
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
						className="object-cover rounded h-full w-full border"
					/>
				</div>
			) : (
				<div className="h-full w-full bg-gray-200 rounded flex justify-center items-center">
					<RiImageCircleFill className="w-10 h-10" />
				</div>
			)}
		</>
	);
}
