"use client";

import {
  dreamOptions,
  genderOptions,
  orientationOptions,
} from "@/components/DatingProfileForm/datingProfile.consts";
import useAuthUser from "@/hooks/useAuthUser";

export default function UserProfilePage() {
  const { user } = useAuthUser();

  const dream = dreamOptions.find(
    (option) => option.value === user?.dream
  )?.label;

  const gender = genderOptions.find(
    (option) => option.value === user?.gender
  )?.label;

  const orientation = orientationOptions.find(
    (option) => option.value === user?.orientation
  )?.label;

  return (
    <div className="h-screen flex justify-center items-center flex-col w-2/3 md:w-1/3 mx-auto">
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
          <li className="bg-gray-200 rounded-full w-fit px-2 py-1">{dream}</li>
        </ul>
      </div>

      <div className="w-full">
        <p className="font-secondary font-bold">Essentials</p>
        <ul className="font-secondary flex space-x-2">
          <li className="bg-gray-200 rounded-full w-fit px-2 py-1">{gender}</li>
          <li className="bg-gray-200 rounded-full w-fit px-2 py-1">
            {orientation}
          </li>
        </ul>
      </div>
    </div>
  );
}
