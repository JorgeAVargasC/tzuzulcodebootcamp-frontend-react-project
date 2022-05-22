import React, {useContext} from "react";
import { NavLink } from "react-router-dom";
import { authContext } from "../context/AuthContext";


export default function NavLinks() {

	const { auth } = useContext(authContext);

	console.log(auth.role);

	return (
		<>
			<NavLink to="/home" className="links">Home</NavLink>
			{(auth.logged && auth.role==="applicant") && <NavLink to="/jobs" className="links">Jobs</NavLink>}
			{(auth.logged && auth.role==="applicant") && <NavLink to="/my-applications" className="links">My Applications</NavLink>}
			{(auth.logged && auth.role==="employer") ? <NavLink to="/my-offers" className="links">My Offers</NavLink>:null}
			{(auth.logged && auth.role==="employer") ? <NavLink to="/create" className="links">Create Offers</NavLink>:null}
			{!auth.logged && <NavLink to="/login" className="links">Login</NavLink>}
			{!auth.logged && <NavLink to="/signup" className="links">Sign Up</NavLink>}
		</>
	);
}
