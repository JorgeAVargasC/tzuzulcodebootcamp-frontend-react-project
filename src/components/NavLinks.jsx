import React, {useContext} from "react";
import { NavLink } from "react-router-dom";
import { authContext } from "../context/AuthContext";
import {IoHome, IoBusiness, IoLogIn, IoCreate, IoList, IoAddCircle} from "react-icons/io5";


export default function NavLinks() {

	const { auth } = useContext(authContext);

	return (
		<>
			
			<NavLink to="/home" className="links"><IoHome/>Home</NavLink>
			{(auth.logged && auth.role==="applicant") && <NavLink to="/jobs" className="links"><IoBusiness/> Jobs</NavLink>}
			{(auth.logged && auth.role==="applicant") && <NavLink to="/my-applications" className="links"><IoList/> My Applications</NavLink>}
			{(auth.logged && auth.role==="employer") ? <NavLink to="/my-offers" className="links"><IoList/> My Offers</NavLink>:null}
			{(auth.logged && auth.role==="employer") ? <NavLink to="/create" className="links"><IoAddCircle/> Create Offers</NavLink>:null}
			{!auth.logged && <NavLink to="/login" className="links"><IoLogIn/> Login</NavLink>}
			{!auth.logged && <NavLink to="/signup" className="links"><IoCreate/> Sign Up</NavLink>}
		</>
	);
}
