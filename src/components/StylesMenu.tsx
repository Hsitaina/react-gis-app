import { useState } from "react";
import { SwatchIcon } from "../icons/SVGIcons";

const mapStyles = [
	"streets-v12",
	"outdoors-v12",
	"light-v11",
	"dark-v11",
	"satellite-v9",
	"satellite-streets-v12",
	"navigation-day-v1",
	"navigation-night-v1",
];

const MapStylesOptionContainer = ({
	item,
	handlePress,
}: {
	item: string;
	handlePress: () => void;
}) => {
	return (
		<div className="flex flex-col items-center justify-center">
			<button onClick={handlePress}>
				<img
					className="w-[120px] h-[50px]"
					src={`/assets/${item}.png`}
				/>
				<p className="text-xs">{item}</p>
			</button>
		</div>
	);
};

const StylesMenu = ({
	setMapStyle,
}: {
	setMapStyle: React.Dispatch<React.SetStateAction<string>>;
}) => {
	const [showMapStyles, setShowMapStyles] = useState(false);
	return !showMapStyles ? (
		<div className="fixed right-2 top-14 px-2 py-1 z-10 bg-white rounded-md drop-shadow-md">
			<button
				onClick={() => {
					setShowMapStyles(true);
				}}
			>
				<SwatchIcon />
			</button>
		</div>
	) : (
		<div className="fixed right-2 h-[400px] overflow-auto top-28 px-2 pb-2 z-10 bg-white rounded-md drop-shadow-md custom-scroll">
			<button onClick={() => setShowMapStyles(false)}>
				<p className="text-xs mb-1">Back</p>
			</button>
			<div className="flex flex-col gap-3">
				{mapStyles.map((item, index) => {
					return (
						<MapStylesOptionContainer
							item={item}
							key={index}
							handlePress={() => {
								setMapStyle(item);
								setShowMapStyles(false);
							}}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default StylesMenu;
