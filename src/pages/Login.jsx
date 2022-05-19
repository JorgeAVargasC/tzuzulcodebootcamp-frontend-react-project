import React from "react";
import { NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Login() {
	return (
		<>
			<Navbar/>
			<div className="container">
				<h4 className="subtitle">Login</h4>

				<div className="form-group">
					<label className="lbl">Email address</label>
					<input className="inp" placeholder="jhondoe@domain.com" type="email" />
				</div>

				<div className="form-group">
					<label className="lbl">Password</label>
					<input className="inp" type="password" placeholder="Password" />
				</div>

				<div className="form-group">
					<button className="btn" type="submit">
						<span>Login</span>
					</button>
				</div>

				<div className="txt-section">
					<p>Don't have an account yet?</p>
					<NavLink to="/signup" className="">
						Sing up here!
					</NavLink>
				</div>
			</div>
		</>
	);
}
