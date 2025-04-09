import { RiImageCircleFill } from "@remixicon/react";

interface ImageSkeletonProps {
	count: number;
}

const ImageSkeleton = ({ count = 1 }: ImageSkeletonProps) => {
	const skeletons = Array.from({ length: count }, (_, index) => index);

	return (
		<>
			{skeletons.map((index) => {
				return (
					<div
						className="animate-pulse w-full bg-gray-200 h-[300px] rounded-lg mb-5 flex justify-center items-center"
						key={index}
					>
						<RiImageCircleFill className="w-10 h-10 dark:text-emerald-600" />
					</div>
				);
			})}
		</>
	);
};

export default ImageSkeleton;
