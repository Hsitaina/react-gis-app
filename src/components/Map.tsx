import { LatLngExpression } from "leaflet";
import "mapbox-gl/dist/mapbox-gl.css";
import { useContext, useEffect, useState } from "react";
import {
	MapContainer,
	Marker,
	Polygon,
	Polyline,
	Popup,
	TileLayer,
	useMap,
} from "react-leaflet";
import { GlobalContext } from "../utils/GlobalContext";
import { API_KEY, DEFAULT_CENTER } from "../utils/constants";
import { GeoJSONLayer, onEachFeature } from "./GeojsonOverlay";
import { LineSelector, PointSelector, PolygonSelector } from "./Polygon";

const LocationMarker = ({
	mapCoordinates,
}: {
	mapCoordinates: LatLngExpression;
}) => {
	const map = useMap();
	useEffect(() => {
		if (mapCoordinates) {
			map.panTo(mapCoordinates);
		}
	}, [map, mapCoordinates]);

	return mapCoordinates === null ? null : (
		<Marker position={mapCoordinates}>
			<Popup>You are here</Popup>
		</Marker>
	);
};

const Map = ({
	mapCoordinates,
	mapStyle,
}: {
	mapCoordinates: LatLngExpression;
	mapStyle: string;
}) => {
	const globalContext = useContext(GlobalContext);
	const [forceRender, setForceRender] = useState(false);
	const key = `map_${mapStyle}`;
	useEffect(() => {
		setForceRender((prev) => !prev);
	}, [globalContext?.geoJsonData]);

	return (
		<MapContainer
			center={DEFAULT_CENTER}
			zoom={3}
			className="flex w-full h-full z-0"
		>
			<TileLayer
				url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
				id={`mapbox/${mapStyle}`}
				tileSize={512}
				zoomOffset={-1}
				accessToken={API_KEY}
				key={key}
			/>
			<LocationMarker mapCoordinates={mapCoordinates} />

			{globalContext?.points
				?.filter((item) =>
					globalContext.shownLayers.includes(item.layer)
				)
				.map((point, index) => {
					return (
						<LocationMarker
							key={index}
							mapCoordinates={point.point}
						/>
					);
				})}
			<Polyline
				positions={
					globalContext?.lines
						.filter((item) =>
							globalContext.shownLayers.includes(item.layer)
						)
						.map((item) => item.point) || []
				}
			/>
			<Polygon
				positions={
					globalContext?.polygons
						.filter((item) =>
							globalContext.shownLayers.includes(item.layer)
						)
						.map((item) => item.point) || []
				}
			/>

			<GeoJSONLayer
				k={forceRender}
				geojsonData={globalContext?.geoJsonData}
				onEachFeature={onEachFeature}
			/>
			{globalContext?.polyType === "point" && (
				<PointSelector
					setPoints={globalContext.setPoints}
					selectedLayer={globalContext.selectedLayer}
				></PointSelector>
			)}
			{globalContext?.polyType === "line" && (
				<LineSelector
					setLine={globalContext.setLines}
					selectedLayer={globalContext.selectedLayer}
				></LineSelector>
			)}
			{globalContext?.polyType === "polygon" && (
				<PolygonSelector
					setPolygon={globalContext.setPolygons}
					selectedLayer={globalContext.selectedLayer}
				></PolygonSelector>
			)}
		</MapContainer>
	);
};

export default Map;
