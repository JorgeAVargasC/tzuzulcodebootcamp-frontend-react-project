import React, {useContext} from "react";
import { NavLink } from "react-router-dom";
import { authContext } from "../context/AuthContext";


export default function NavLinks() {

	const { auth } = useContext(authContext);


	return (
		<>
			<NavLink to="/home" className="links">Home</NavLink>
			{auth.logged && <NavLink to="/jobs" className="links">Jobs</NavLink>}
			{!auth.logged && <NavLink to="/login" className="links">Login</NavLink>}
			{!auth.logged && <NavLink to="/signup" className="links">Sign Up</NavLink>}
		</>
	);
}
