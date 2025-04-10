import Loader from "@/components/loader/Loader";

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
				<Loader />
			) : error ? (
				<p className="text-red-500">{error}</p>
			) : (
				<p>{address}</p>
			)}
		</>
	);
}
