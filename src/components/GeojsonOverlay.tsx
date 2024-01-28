import { GeoJSON } from "react-leaflet";

export const onEachFeature = (feature: any, layer: any) => {
	if (feature.properties) {
		layer.bindPopup(
			Object.keys(feature.properties)
				.map((key) => `${key}: ${feature.properties[key]}`)
				.join("<br />")
		);
	}
};

export const GeoJSONLayer = ({ geojsonData, onEachFeature, k }: any) => {
	return (
		<GeoJSON key={k} data={geojsonData} onEachFeature={onEachFeature} />
	);
};
