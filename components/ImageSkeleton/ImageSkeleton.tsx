import { RiImageCircleFill } from "@remixicon/react";

interface ImageSkeletonProps {
  count: number;
  width: number;
  height: number;
}

const ImageSkeleton = ({ count = 1, width, height }: ImageSkeletonProps) => {
  const skeletons = Array.from({ length: count }, (_, index) => index);

  return (
    <>
      {skeletons.map((index) => {
        return (
          <div
            className="animate-pulse w-full bg-gray-200 h-48 rounded-lg mb-5 flex justify-center items-center"
            style={{ width: `${width}px`, height: `${height}px` }}
            key={index}
          >
            <RiImageCircleFill className="w-10 h-10 dark:text-black" />
          </div>
        );
      })}
    </>
  );
};

export default ImageSkeleton;
