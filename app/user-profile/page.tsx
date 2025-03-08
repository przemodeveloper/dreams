"use client";

import {
	dreamOptions,
	genderOptions,
	orientationOptions,
} from "@/components/DatingProfileForm/datingProfile.consts";
import ImagePreview from "@/components/ImagePreview/ImagePreview";
import ImageSkeleton from "@/components/ImageSkeleton/ImageSkeleton";
import UserLocation from "@/components/UserLocation/UserLocation";
import UserProfileSkeleton from "@/components/UserProfileSkeleton/UserProfileSkeleton";
import { imageRefIds } from "@/constants/user-profile";
import useAuthUser from "@/hooks/useAuthUser";
import { useGetImages } from "@/hooks/useGetImages";
import { getLabel } from "@/utils/getLabel";
import { RiEditCircleLine } from "@remixicon/react";

export default function UserProfilePage() {
	const { user, loading: loadingUser } = useAuthUser();

	const {
		images,
		downloadingImages,
		uploadingImage,
		handleDeleteImage,
		handleUploadImage,
	} = useGetImages(imageRefIds, user?.uid);

	const dream = getLabel(dreamOptions, user?.dream);
	const gender = getLabel(genderOptions, user?.gender);
	const orientation = getLabel(orientationOptions, user?.orientation);

	return (
		<div className="h-screen">
			<form className="flex justify-center items-center flex-col w-full h-full">
				<div className="relative grid-cols-3 h-1/3 w-full md:w-2/3 lg:w-1/2 grid gap-3 mb-4">
					{downloadingImages === "pending" && images.length === 0 ? (
						<ImageSkeleton count={3} />
					) : (
						<>
							{images?.map((image) => (
								<ImagePreview
									key={image.imageRefId}
									imageRefId={image.imageRefId}
									uploadingImage={uploadingImage}
									onDeleteImage={handleDeleteImage}
									onUploadImage={async (file) =>
										await handleUploadImage(file, image.imageRefId, user?.uid)
									}
									filePath={image.filePath}
									imgSrc={image.downloadUrl}
									userId={user?.uid}
									alt={image.imageRefId}
								/>
							))}
						</>
					)}
				</div>
				<div className="flex items-center flex-col w-2/3 md:w-1/3 mx-auto">
					{loadingUser === "pending" && !user ? (
						<UserProfileSkeleton />
					) : (
						<>
							<h3 className="font-secondary border-b-2 mb-4 w-full">
								{user?.username}, {user?.age}
							</h3>

							<div className="border-b-2 mb-4 w-full">
								<div className="flex items-center">
									<p className="font-secondary text-lg font-bold">Bio</p>
									<button type="button" className="ml-1">
										<RiEditCircleLine size="20px" />
									</button>
								</div>
								<p className="font-secondary text-xl">{user?.bio}</p>
							</div>

							<div className="w-full mb-4">
								<div className="flex items-center">
									<p className="font-secondary text-lg font-bold">Dream</p>
									<button type="button" className="ml-1">
										<RiEditCircleLine size="20px" />
									</button>
								</div>

								<ul className="font-secondary flex space-x-2">
									<li className="bg-gray-200 rounded-full w-fit px-2 py-1">
										{dream}
									</li>
								</ul>
							</div>

							<div className="w-full mb-4">
								<div className="flex items-center">
									<p className="font-secondary text-lg font-bold">Essentials</p>
									<button type="button" className="ml-1">
										<RiEditCircleLine size="20px" />
									</button>
								</div>

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
								<p className="font-secondary text-lg font-bold">Location</p>
								<UserLocation />
							</div>
						</>
					)}
				</div>
			</form>
		</div>
	);
}
