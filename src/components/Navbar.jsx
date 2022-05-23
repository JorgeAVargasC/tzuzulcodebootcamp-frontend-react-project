import React, { useState } from "react";
import { useContext } from "react";
import { authContext } from "../context/AuthContext";
import { Spin as Hamburger } from "hamburger-react";
import NavLinks from "./NavLinks";
import LogOut from "./LogOut";
import Logo from "../assets/svg/logo.svg";
import { NavLink } from "react-router-dom";

export default function Navbar() {
	const [isOpen, setOpen] = useState(false);

	const { auth } = useContext(authContext);

	return (
		<div className="navbar">
			<div className="navbar-content">
				<NavLink to="/home">
					<img className="logo" src={Logo} alt="" />
				</NavLink>

				{/* Mobile Navigation */}
				<nav
					className={isOpen ? "navlinks-mobile open" : "navlinks-mobile close"}
					onClick={() => setOpen(false)}
				>
					
					{
						auth.logged && 
						<div className="data-user">
						<p className="name">Hi! {auth.name}</p>
                        <p className="role">{auth.role}</p>
                        {/* {auth.logged && <p className="email">{auth.email}</p>} */}
						{/* {auth.logged && <LogOut />} */}
						</div>					
					}

					<h4 className="menu-title">
						Menu
					</h4>
					

                    {auth.logged && <LogOut />}

					<div className="navlinks-container">
						<NavLinks />
					</div>
				</nav>                

				<Hamburger
					rounded
					toggled={isOpen}
					toggle={setOpen}
					direction="left"
					duration={0.4}
				/>

				{/* Desktop Navigation */}
				<nav className="navlinks">
					<NavLinks />
					{auth.logged && <p className="blue-tag">{auth.name}</p>}
					{auth.logged && <LogOut />}
				</nav>
			</div>
		</div>
	);
}
