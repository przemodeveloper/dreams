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

	const getUserLocation = useCallback(() => {
		setLoading(true);
		const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
		if (apiKey) {
			setKey(apiKey);
		}
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;
					if (latitude && longitude) {
						fromLatLng(latitude, longitude)
							.then(({ results }) => {
								if (results && results.length > 0) {
									const address = results[0].formatted_address;
									setLocation({ address, coords: { latitude, longitude } });
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
		if (skipOnMount) {
			return;
		}

		getUserLocation();
	}, [getUserLocation, skipOnMount]);

	return { error, location, loading, getUserLocation };
}
