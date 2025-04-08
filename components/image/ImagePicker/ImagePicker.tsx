import { RiFileReduceLine, RiImageCircleFill } from "@remixicon/react";
import Image from "next/image";
import { useRef, useState } from "react";

interface ImagePickerProps {
	imageRefId: string;
	userId?: string;
	onUploadImage?: (file: File) => Promise<void>;
}

export default function ImagePicker({
	imageRefId,
	userId,
	onUploadImage,
}: ImagePickerProps) {
	const inputRef = useRef<HTMLInputElement>(null);
	const [image, setImage] = useState<ArrayBuffer | string | null>(null);

	const handleClick = () => {
		inputRef.current?.click();
	};

	const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];

		if (!file || !userId) {
			setImage(null);
			return;
		}

		const fileReader = new FileReader();

		fileReader.onload = () => {
			setImage(fileReader.result);
		};

		fileReader.readAsDataURL(file);
		if (onUploadImage) await onUploadImage(file);
	};

	const handleRemoveImage = () => {
		setImage(null);
	};

	return (
		<div className="h-full">
			{image ? (
				<div className="relative">
					<Image
						src={image as string}
						alt="Image"
						loading="eager"
						priority
						width={300}
						height={300}
						className="object-cover rounded-md h-[300px] border"
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
					<button
						onClick={handleClick}
						type="button"
						className="transition ease-in-out duration-300 group hover:bg-emerald-600 border w-full border-slate-500 border-1 h-[300px] p-4 rounded-md"
						title="Add image"
					>
						<RiImageCircleFill className="transition ease-in-out duration-300 group-hover:text-white w-10 h-10 mx-auto" />
					</button>
				</>
			)}

			<input
				type="file"
				id={imageRefId}
				onChange={handleImageChange}
				accept="image/png, image/jpeg"
				name={imageRefId}
				ref={inputRef}
				className="hidden"
			/>
		</div>
	);
}
