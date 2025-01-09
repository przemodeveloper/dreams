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
            className="rounded animate-pulse"
            style={{ width: `${width}px`, height: `${height}px` }}
            key={index}
          >
            <div className="flex items-center justify-center h-full w-full mb-4 bg-gray-300 rounded dark:bg-black">
              <RiImageCircleFill className="w-10 h-10 text-gray-200 dark:text-gray-600" />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ImageSkeleton;
