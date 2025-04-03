import { useCallback, useEffect, useState } from "react";
import { fromLatLng, setKey } from "react-geocode";

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

		const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
		if (apiKey) {
			setKey(apiKey);
		}

		if (!navigator.geolocation) {
			setError("Geolocation is not supported by this browser.");
			setLoading(false);
			return;
		}

		try {
			const position = await new Promise<GeolocationPosition>(
				(resolve, reject) =>
					navigator.geolocation.getCurrentPosition(resolve, reject)
			);

			const { latitude, longitude } = position.coords;

			const { results } = await fromLatLng(latitude, longitude);

			if (results.length > 0) {
				const address = results[0].formatted_address;
				setLocation({ address, coords: { latitude, longitude } });
			} else {
				setError("No address found for the given coordinates.");
			}
		} catch (err) {
			setError(
				err instanceof Error ? err.message : "Failed to fetch location."
			);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		if (skipOnMount) {
			return;
		}

		(async function fetchLocation() {
			await getUserLocation();
		})();
	}, [getUserLocation, skipOnMount]);

	return { error, location, loading, getUserLocation };
}
