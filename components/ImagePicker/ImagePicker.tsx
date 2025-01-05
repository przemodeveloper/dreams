import { uploadImage } from "@/utils/uploadImage";
import { RiImageCircleFill } from "@remixicon/react";
import Image from "next/image";
import { useRef, useState } from "react";

interface ImagePickerProps {
  imageRefId: string;
  userId?: string;
}

export default function ImagePicker({ imageRefId, userId }: ImagePickerProps) {
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

    await uploadImage(file, imageRefId, userId);
  };

  return (
    <div>
      {image ? (
        <Image
          src={image as string}
          alt="Image"
          width={300}
          height={300}
          className="object-cover rounded-md h-[300px] border"
        />
      ) : (
        <>
          <button
            onClick={handleClick}
            type="button"
            className="transition ease-in-out duration-300 group hover:bg-black border w-full border-gray-300 border-2 h-[300px] p-4 rounded-md"
          >
            <RiImageCircleFill className="transition ease-in-out duration-300 group-hover:text-white w-10 h-10 mx-auto" />
          </button>
        </>
      )}

      <input
        type="file"
        id="image"
        onChange={handleImageChange}
        accept="image/png, image/jpeg"
        name="image"
        ref={inputRef}
        required
        className="hidden"
      />
    </div>
  );
}
