"use client";

import {
  dreamOptions,
  genderOptions,
  orientationOptions,
} from "@/components/DatingProfileForm/datingProfile.consts";
import ImagePreview from "@/components/ImagePreview/ImagePreview";
import UserLocation from "@/components/UserLocation/UserLocation";
import { imageRefIds } from "@/constants/user-profile";
import useAuthUser from "@/hooks/useAuthUser";
import { useGetImages } from "@/hooks/useGetImages";
import { getLabel } from "@/utils/getLabel";

export default function UserProfilePage() {
  const { user } = useAuthUser();

  const { images } = useGetImages(imageRefIds, user?.uid);

  const dream = getLabel(dreamOptions, user?.dream);
  const gender = getLabel(genderOptions, user?.gender);
  const orientation = getLabel(orientationOptions, user?.orientation);

  return (
    <>
      {user && (
        <div className="flex h-screen justify-center items-center flex-col w-full">
          <div className="grid-cols-3 grid gap-3 mb-4">
            {images?.map((image, index) => {
              return (
                <ImagePreview
                  key={`profile_image_${index + 1}`}
                  imgSrc={image}
                  alt={`profile_image_${index + 1}`}
                />
              );
            })}
          </div>
          <div className="flex items-center flex-col w-2/3 md:w-1/3 mx-auto">
            <h3 className="font-secondary border-b-2 mb-4 w-full">
              {user?.username}, {user?.age}
            </h3>

            <div className="border-b-2 mb-4 w-full">
              <p className="font-secondary font-bold">Bio</p>
              <p className="font-secondary text-xl">{user?.bio}</p>
            </div>

            <div className="w-full mb-4">
              <p className="font-secondary font-bold">Dream</p>
              <ul className="font-secondary flex space-x-2">
                <li className="bg-gray-200 rounded-full w-fit px-2 py-1">
                  {dream}
                </li>
              </ul>
            </div>

            <div className="w-full mb-4">
              <p className="font-secondary font-bold">Essentials</p>
              <ul className="font-secondary flex space-x-2">
                <li className="bg-gray-200 rounded-full w-fit px-2 py-1">
                  {gender}
                </li>
                <li className="bg-gray-200 rounded-full w-fit px-2 py-1">
                  {orientation}
                </li>
              </ul>
            </div>
            <div className="w-full">
              <p className="font-secondary font-bold">Location</p>
              <UserLocation />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
