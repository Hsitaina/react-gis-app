import { createContext, useState } from "react";
import { DEFAULT_GEOJSON_DATA } from "./constants";
import { geoDataType } from "../components/Drawer";
import { LatLngExpression } from "leaflet";

export type polyValType = "" | "point" | "line" | "polygon";

export const GlobalContext = createContext<{
	geoJsonData: geoDataType;
	setGeoJsonData: React.Dispatch<React.SetStateAction<geoDataType>>;
	showDrawer: boolean;
	setShowDrawer: React.Dispatch<React.SetStateAction<boolean>>;
	polyType: polyValType;
	setPolyType: React.Dispatch<React.SetStateAction<polyValType>>;
	layers: string[];
	points: { point: LatLngExpression; layer: string }[];
	lines: { point: LatLngExpression; layer: string }[];
	polygons: { point: LatLngExpression; layer: string }[];
	setPoints: React.Dispatch<
		React.SetStateAction<{ point: LatLngExpression; layer: string }[]>
	>;
	setLines: React.Dispatch<
		React.SetStateAction<{ point: LatLngExpression; layer: string }[]>
	>;
	setPolygons: React.Dispatch<
		React.SetStateAction<{ point: LatLngExpression; layer: string }[]>
	>;
	setLayers: React.Dispatch<React.SetStateAction<string[]>>;
	selectedLayer: string;
	setSelectedLayer: React.Dispatch<React.SetStateAction<string>>;
	shownLayers: string[];
	setShownLayers: React.Dispatch<React.SetStateAction<string[]>>;
} | null>(null);

export const GlobalContextProvider = ({
	children,
}: React.PropsWithChildren) => {
	const [geoJsonData, setGeoJsonData] =
		useState<geoDataType>(DEFAULT_GEOJSON_DATA);
	const [showDrawer, setShowDrawer] = useState(false);
	const [polyType, setPolyType] = useState<polyValType>("");
	const [points, setPoints] = useState<
		{ point: LatLngExpression; layer: string }[]
	>([]);
	const [lines, setLines] = useState<
		{ point: LatLngExpression; layer: string }[]
	>([]);
	const [polygons, setPolygons] = useState<
		{ point: LatLngExpression; layer: string }[]
	>([]);
	const [layers, setLayers] = useState<string[]>(["default"]);
	const [selectedLayer, setSelectedLayer] = useState<string>("default");
	const [shownLayers, setShownLayers] = useState<string[]>(["default"]);
	return (
		<GlobalContext.Provider
			value={{
				geoJsonData,
				setGeoJsonData,
				showDrawer,
				setShowDrawer,
				polyType,
				setPolyType,
				points,
				lines,
				polygons,
				setPoints,
				setLines,
				setPolygons,
				layers,
				setLayers,
				selectedLayer,
				setSelectedLayer,
				shownLayers,
				setShownLayers,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
