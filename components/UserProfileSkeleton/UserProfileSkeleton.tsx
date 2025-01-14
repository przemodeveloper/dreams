export default function UserProfileSkeleton() {
	return (
		<div role="status" className="w-full rounded p-4 animate-pulse">
			<h3 className="h-6 bg-gray-300 rounded-full mb-4 w-full"></h3>

			<p className="font-secondary font-bold">Bio</p>
			<div className="h-4 bg-gray-300 rounded-full mb-4"></div>

			<p className="font-secondary font-bold">Essentials</p>
			<div className="h-4 bg-gray-300 rounded-full mb-4"></div>

			<p className="font-secondary font-bold">Location</p>
			<div className="h-4 bg-gray-300 rounded-full mb-4"></div>
		</div>
	);
}
