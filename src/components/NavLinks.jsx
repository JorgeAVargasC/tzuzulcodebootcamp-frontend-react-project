import React from "react";
import { NavLink } from "react-router-dom";

export default function NavLinks() {
	return (
		<>
			<NavLink to="/home" className="links">Home</NavLink>
			<NavLink to="/login" className="links">Login</NavLink>
			<NavLink to="/signup" className="links">Sign Up</NavLink>
		</>
	);
}
