import AppLoader from "@/components/appLoader/AppLoader";

interface UserLocationProps {
	address: string | null;
	error: string | null;
	loading: boolean;
}

export default function UserLocation({
	address,
	error,
	loading,
}: UserLocationProps) {
	return (
		<>
			{loading ? (
				<AppLoader />
			) : error ? (
				<p className="text-red-500">{error}</p>
			) : (
				<p>{address}</p>
			)}
		</>
	);
}
