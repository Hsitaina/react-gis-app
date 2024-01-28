import { LatLngExpression, latLng } from "leaflet";
import { useRef } from "react";
import { DEFAULT_CENTER } from "../utils/constants";
import { GeoencodingRequest } from "../api/Geoencoding";

const SearchBar = ({
	setMapCoordinates,
}: {
	setMapCoordinates: React.Dispatch<React.SetStateAction<LatLngExpression>>;
}) => {
	const inputVal = useRef<HTMLInputElement>(null);
	const handleSubmit = async (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			e.preventDefault();
			let coordinatesBatch = "";
			if (inputVal.current && inputVal.current.value) {
				if (!inputVal.current.value.includes(",")) {
					try {
						const res = await GeoencodingRequest({
							query: inputVal.current.value,
						});
						if (res.data && res.data.features?.length > 0) {
							const [longitude, latitude] =
								res.data.features[0].center;
							coordinatesBatch = `${latitude},${longitude}`;
						}
					} catch {
						console.log(
							"error while fetching the specified location"
						);
						return;
					}
				} else {
					coordinatesBatch = inputVal.current.value;
				}
			}
			if (coordinatesBatch === "") return;
			const coordinates = coordinatesBatch.split(",");
			setMapCoordinates(() => {
				if (
					coordinates !== undefined &&
					coordinates !== null &&
					coordinates.length === 2
				) {
					return latLng([
						parseFloat(coordinates[0]),
						parseFloat(coordinates[1]),
					]);
				} else return DEFAULT_CENTER;
			});
		}
	};
	return (
		<input
			className="fixed top-2 right-2 w-60 rounded-md focus:outline-0 drop-shadow-md p-2 bg-white z-10 text-sm"
			placeholder="Search"
			ref={inputVal}
			onKeyDown={handleSubmit}
		/>
	);
};

export default SearchBar;
