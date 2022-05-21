import React, {useContext} from "react";
import { NavLink } from "react-router-dom";
import { authContext } from "../context/AuthContext";


export default function NavLinks() {

	const { auth } = useContext(authContext);


	return (
		<>
			<NavLink to="/home" className="">Home</NavLink>
			{auth.logged && <NavLink to="/jobs" className="">Jobs</NavLink>}
			{!auth.logged && <NavLink to="/login" className="">Login</NavLink>}
			{!auth.logged && <NavLink to="/signup" className="">Sign Up</NavLink>}
		</>
	);
}
