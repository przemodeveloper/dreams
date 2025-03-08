import { Loader } from "../Loader/Loader";

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
				<p className="font-secondary text-red-500">{error}</p>
			) : (
				<p className="font-secondary">{address}</p>
			)}
		</>
	);
}
