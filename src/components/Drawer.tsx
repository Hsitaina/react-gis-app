import { useContext, useRef, useState } from "react";
import { LeftIcon } from "../icons/SVGIcons";
import { GlobalContext } from "../utils/GlobalContext";
import { DEFAULT_GEOJSON_DATA } from "../utils/constants";
import PolygonAdder from "./PolygonAdder";

export type geoDataType = {
	type: string;
	features: any[];
};

const Drawer = () => {
	const [showTextInput, setShowTextInput] = useState(false);
	const [showPoly, setShowPoly] = useState(false);
	const [showLayerInput, setShowLayerInput] = useState(false);
	const textAreaRef = useRef<HTMLTextAreaElement>(null);
	const layerRef = useRef<HTMLInputElement>(null);
	const globalContext = useContext(GlobalContext);

	const combineGeoJsonData = (a: geoDataType, b: geoDataType) => {
		return {
			type: "FeatureCollection",
			features: a.features.concat(b.features),
		};
	};

	const handleAddData = () => {
		if (!textAreaRef.current) return;
		const data = textAreaRef.current.value;
		const combinedData = combineGeoJsonData(
			JSON.parse(data) ?? DEFAULT_GEOJSON_DATA,
			globalContext?.geoJsonData ?? DEFAULT_GEOJSON_DATA
		);
		globalContext?.setGeoJsonData(combinedData);
	};

	return (
		globalContext?.showDrawer && (
			<div className="fixed flex flex-col h-screen w-[240px] top-0 left-0 drop-shadow-md p-2 bg-white z-20 text-sm overflow-scroll custom-scroll">
				<div className="flex w-full justify-between items-center font-bold text-xl pb-2 border-b-2 mb-2 pr-2">
					<p>GIS App</p>
					<div className="mt-1">
						<button
							onClick={() => {
								globalContext?.setShowDrawer(false);
							}}
						>
							<LeftIcon />
						</button>
					</div>
				</div>
				<div className="flex flex-col items-start w-full">
					<button
						onClick={() => {
							setShowTextInput((prev) => !prev);
							setShowLayerInput(false);
							setShowPoly(false);
						}}
					>
						<p className="hover:underline font-medium">
							Add geoJSON data
						</p>
					</button>
					{showTextInput && (
						<>
							<textarea
								className="focus:outline-0 bg-[#dadada] rounded-md p-2 w-full mt-1"
								placeholder="Paste the geoJSON data here"
								rows={5}
								ref={textAreaRef}
							/>
							<div className="flex flex-col w-full items-end">
								<button
									className="bg-[#40A2D8] px-2 py-1 mt-1 rounded-md text-white mb-2"
									onClick={() => {
										setShowTextInput(false);
										handleAddData();
									}}
								>
									Add
								</button>
							</div>
						</>
					)}
					<div className="flex w-full justify-between">
						<button
							className="hover:underline font-medium"
							onClick={() => {
								setShowPoly((prev) => !prev);
								setShowTextInput(false);
							}}
						>
							Add polygon
						</button>
						{showPoly && (
							<button
								onClick={() => globalContext?.setPolyType("")}
								className="hover:underline font-medium"
							>
								Collapse
							</button>
						)}
					</div>
					{showPoly && <PolygonAdder />}
					<button
						onClick={() => {
							setShowLayerInput((prev) => !prev);
							setShowTextInput(false);
						}}
					>
						<p className="hover:underline font-medium">Add layer</p>
					</button>
					{showLayerInput && (
						<>
							{globalContext.layers.map((item, index) => {
								return (
									<div
										key={index}
										className="justify-between w-full flex"
									>
										<button
											className={`${
												globalContext.selectedLayer ===
													item && "underline"
											} `}
											onClick={() => {
												globalContext.setSelectedLayer(
													item
												);
												if (
													!globalContext.shownLayers.includes(
														item
													)
												) {
													globalContext.setShownLayers(
														(prev) => [
															...prev,
															item,
														]
													);
												}
											}}
										>
											{item}
										</button>
										<button
											onClick={() => {
												if (
													globalContext.shownLayers.includes(
														item
													)
												) {
													globalContext.setShownLayers(
														(prev) =>
															prev.filter(
																(litem) =>
																	litem !==
																	item
															)
													);
												} else {
													globalContext.setShownLayers(
														(prev) => [
															...prev,
															item,
														]
													);
												}
											}}
										>
											{globalContext.shownLayers.includes(
												item
											)
												? "Hide"
												: "Show"}
										</button>
									</div>
								);
							})}
							<input
								className="focus:outline-0 bg-[#dadada] rounded-md p-2 w-full mt-2"
								placeholder="Enter layer name"
								ref={layerRef}
							/>
							<div className="flex flex-col w-full items-end">
								<button
									className="bg-[#40A2D8] px-2 py-1 mt-1 rounded-md text-white mb-2"
									onClick={() => {
										const layerVal =
											layerRef.current?.value ?? "";
										globalContext.setLayers((prev) => {
											if (layerVal === "") return prev;
											else return [...prev, layerVal];
										});
										globalContext.setShownLayers((prev) => {
											if (layerVal === "") return prev;
											else return [...prev, layerVal];
										});
									}}
								>
									Add
								</button>
							</div>
						</>
					)}
				</div>
			</div>
		)
	);
};

export default Drawer;
