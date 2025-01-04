import { useUserLocation } from "@/hooks/useUserLocation";
import { Loader } from "../Loader/Loader";

export default function UserLocation() {
  const { address, error, loading } = useUserLocation();

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
