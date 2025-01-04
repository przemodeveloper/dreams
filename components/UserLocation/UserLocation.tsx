import { useEffect, useState, useCallback } from "react";
import { fromLatLng, setKey } from "react-geocode";

export default function UserLocation() {
  const [error, setError] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);

  const getUserLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          if (latitude && longitude) {
            fromLatLng(latitude, longitude)
              .then(({ results }) => {
                const address = results[0].formatted_address;
                setAddress(address);
              })
              .catch(console.error);
          }
        },
        (error) => {
          setError(error.message);
        }
      );
      setError(null);
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (apiKey) {
      setKey(apiKey);
    }

    getUserLocation();
  }, [getUserLocation]);

  return <>{location && <p className="font-secondary">{address}</p>}</>;
}
