import { useContext } from "react";
import { MenuIcon } from "../icons/SVGIcons";
import { GlobalContext } from "../utils/GlobalContext";

const Menu = () => {
	const globalContext = useContext(GlobalContext);
	return (
		<div className="fixed flex top-2 left-2 rounded-[4px] drop-shadow-md bg-white z-10 h-6 w-6 items-center justify-center">
			<button onClick={() => globalContext?.setShowDrawer(true)}>
				<MenuIcon />
			</button>
		</div>
	);
};

export default Menu;
