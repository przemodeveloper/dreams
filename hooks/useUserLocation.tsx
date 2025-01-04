import { useCallback, useEffect, useState } from "react";
import { fromLatLng, setKey } from "react-geocode";

export function useUserLocation() {
  const [error, setError] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const getUserLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          if (latitude && longitude) {
            fromLatLng(latitude, longitude)
              .then(({ results }) => {
                if (results && results.length > 0) {
                  const address = results[0].formatted_address;
                  setAddress(address);
                } else {
                  setError("No address found for the given coordinates.");
                }
              })
              .catch(console.error)
              .finally(() => setLoading(false));
          }
        },
        (error) => {
          setError(error.message);
          setLoading(false);
        }
      );
      setError(null);
    } else {
      setError("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (apiKey) {
      setKey(apiKey);
    }

    getUserLocation();
  }, [getUserLocation]);

  return { error, address, loading };
}
