import ImageSkeleton from "@/components/image/ImageSkeleton/ImageSkeleton";

export default function UserProfileSkeleton() {
	return (
		<>
			<div className="relative w-full md:w-2/3 lg:w-1/2 grid grid-cols-3 gap-3 mb-4">
				<ImageSkeleton count={3} />
			</div>
			<div className="flex items-center flex-col w-2/3 lg:w-1/3 mx-auto">
				<div className="w-full rounded p-4 animate-pulse">
					<div className="h-6 bg-gray-300 rounded-full mb-4 w-full" />

					<p className="font-bold">Bio</p>
					<div className="h-4 bg-gray-300 rounded-full mb-4" />

					<p className="font-bold">Age</p>
					<div className="h-4 bg-gray-300 rounded-full mb-4" />

					<p className="font-bold">Dream</p>
					<div className="h-4 bg-gray-300 rounded-full mb-4" />

					<p className="font-bold">Gender</p>
					<div className="h-4 bg-gray-300 rounded-full mb-4" />

					<p className="font-bold">Orientation</p>
					<div className="h-4 bg-gray-300 rounded-full mb-4" />

					<p className="font-bold">Location</p>
					<div className="h-4 bg-gray-300 rounded-full mb-4" />
				</div>
			</div>
		</>
	);
}
