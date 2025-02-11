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
			) : null}
		</>
	);
}
