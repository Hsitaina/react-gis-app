import { LatLngExpression } from "leaflet";
import { useState } from "react";
import Map from "./components/Map";
import Menu from "./components/Menu";
import SearchBar from "./components/SearchBar";
import Sidebar from "./components/StylesMenu";
import { DEFAULT_CENTER } from "./utils/constants";
import Drawer from "./components/Drawer";

const App = () => {
	const [mapCoordinates, setMapCoordinates] =
		useState<LatLngExpression>(DEFAULT_CENTER);
	const [mapStyle, setMapStyle] = useState("streets-v12");

	return (
		<div className="flex w-screen h-screen overflow-auto">
			<Map mapCoordinates={mapCoordinates} mapStyle={mapStyle} />
			<Drawer />
			<Sidebar setMapStyle={setMapStyle} />
			<SearchBar setMapCoordinates={setMapCoordinates} />
			<Menu />
		</div>
	);
};

export default App;
