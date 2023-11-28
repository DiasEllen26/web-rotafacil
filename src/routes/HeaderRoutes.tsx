import { Outlet } from "react-router-dom";
import Header from "../components/Navbar";

export default function HeaderRoutes(){
	return(
		<>
			<Header />
			<Outlet />
		</>
	)
}