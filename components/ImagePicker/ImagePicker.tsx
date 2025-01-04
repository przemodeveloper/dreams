import { RiImageCircleFill } from "@remixicon/react";

export default function ImagePicker() {
  return (
    <button
      type="button"
      className="transition ease-in-out duration-300 group hover:bg-black border w-full border-gray-300 border-2 h-[300px] p-4 rounded-md"
    >
      <RiImageCircleFill className="transition ease-in-out duration-300 group-hover:text-white w-10 h-10 mx-auto" />
    </button>
  );
}
