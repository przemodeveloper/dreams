import { useCallback, useEffect, useState } from "react";
import { fromLatLng, setKey } from "react-geocode";

const fetchGeolocation = async () => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (apiKey) {
    setKey(apiKey);
  }

  if (!navigator.geolocation) {
    return {
      error: "Geolocation is not supported by this browser.",
      location: null,
    };
  }

  try {
    const position = await new Promise<GeolocationPosition>((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject)
    );

    const { latitude, longitude } = position.coords;

    const { results } = await fromLatLng(latitude, longitude);

    if (results.length > 0) {
      const address = results[0].formatted_address;

      return {
        location: { address, coords: { latitude, longitude } },
        error: null,
      };
    }
    return null;
  } catch (err) {
    return {
      location: null,
      error: err instanceof Error ? err.message : "Failed to fetch location.",
    };
  }
};

export function useUserLocation({
  skipOnMount = false,
}: {
  skipOnMount?: boolean;
}) {
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<{
    address: "";
    coords: { latitude: number; longitude: number };
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const getUserLocation = useCallback(async () => {
    setLoading(true);
    setError(null);

    const result = await fetchGeolocation();

    if (result?.error) {
      setError(result.error);
    }

    if (result?.location) {
      setLocation(result.location);
    }

    setLoading(false);
    return result;
  }, []);

  useEffect(() => {
    if (skipOnMount) {
      return;
    }

    (async () => {
      await getUserLocation();
    })();
  }, [getUserLocation, skipOnMount]);

  return { error, location, loading, getUserLocation };
}
