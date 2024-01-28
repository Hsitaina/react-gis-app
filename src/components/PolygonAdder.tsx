import { useContext } from "react";
import { GlobalContext } from "../utils/GlobalContext";

const PolygonAdder = () => {
	const globalContext = useContext(GlobalContext);
	return (
		<div className="flex flex-col w-full items-start">
			<div>
				<button
					onClick={() => globalContext?.setPolyType("point")}
					className={`${
						globalContext?.polyType === "point" && "underline"
					}`}
				>
					Point
				</button>
				{globalContext?.polyType === "point" && (
					<p className="flex flex-col text-sm">
						{globalContext.points
							?.filter((item) =>
								globalContext.shownLayers.includes(item.layer)
							)
							.map((point, index) => {
								return (
									<span className="" key={index}>
										{point.point.toString()}
									</span>
								);
							})}
					</p>
				)}
			</div>
			<div>
				<button
					onClick={() => globalContext?.setPolyType("line")}
					className={`${
						globalContext?.polyType === "line" && "underline"
					}`}
				>
					Line
				</button>
				{globalContext?.polyType === "line" && (
					<p className="flex flex-col text-sm">
						{globalContext.lines
							?.filter((item) =>
								globalContext.shownLayers.includes(item.layer)
							)
							.map((point, index) => {
								return (
									<span className="" key={index}>
										{point.point.toString()}
									</span>
								);
							})}
					</p>
				)}
			</div>
			<div>
				<button
					onClick={() => globalContext?.setPolyType("polygon")}
					className={`${
						globalContext?.polyType === "polygon" && "underline"
					}`}
				>
					Polygon
				</button>
				{globalContext?.polyType === "polygon" && (
					<p className="flex flex-col text-sm">
						{globalContext.polygons
							?.filter((item) =>
								globalContext.shownLayers.includes(item.layer)
							)
							.map((point, index) => {
								return (
									<span className="" key={index}>
										{point.point.toString()}
									</span>
								);
							})}
					</p>
				)}
			</div>
		</div>
	);
};

export default PolygonAdder;
