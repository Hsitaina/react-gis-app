import axios from "axios";
import { API_KEY } from "../utils/constants";

export const GeoencodingRequest = ({ query }: { query: string }) => {
	return axios.get(
		`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${API_KEY}`
	);
};
