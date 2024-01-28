import { LatLngExpression } from "leaflet";
import React from "react";
import { useMapEvents } from "react-leaflet";

export function PointSelector({
	setPoints,
	selectedLayer,
}: {
	setPoints: React.Dispatch<
		React.SetStateAction<{ point: LatLngExpression; layer: string }[]>
	>;
	selectedLayer: string;
}) {
	useMapEvents({
		click: (e) => {
			setPoints((p) => {
				return [...p, { point: e.latlng, layer: selectedLayer }];
			});
		},
	});
	return null;
}

export function LineSelector({
	setLine,
	selectedLayer,
}: {
	setLine: React.Dispatch<
		React.SetStateAction<{ point: LatLngExpression; layer: string }[]>
	>;
	selectedLayer: string;
}) {
	useMapEvents({
		click: (e) => {
			setLine((p) => {
				return [...p, { point: e.latlng, layer: selectedLayer }];
			});
		},
	});
	return null;
}
export function PolygonSelector({
	setPolygon,
	selectedLayer,
}: {
	setPolygon: React.Dispatch<
		React.SetStateAction<{ point: LatLngExpression; layer: string }[]>
	>;
	selectedLayer: string;
}) {
	useMapEvents({
		click: (e) => {
			setPolygon((p) => {
				return [...p, { point: e.latlng, layer: selectedLayer }];
			});
		},
	});
	return null;
}
