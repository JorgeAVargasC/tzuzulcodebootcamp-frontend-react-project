import React from "react";
import { NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function SignUp() {
	return (
		<>
			<Navbar/>
			<div className="container">
				<h4 className="subtitle">Sign Up</h4>

				<div className="form-group">
					<label className="lbl">Name</label>
					<input className="inp" placeholder="Jhon Doe" type="text" />
				</div>

				<div className="form-group">
					<label className="lbl">Email address</label>
					<input className="inp" placeholder="jhondoe@domain.com" type="email" />
				</div>

				<div className="form-group">
					<label className="lbl">Password</label>
					<input className="inp" type="password" />
				</div>

				<div className="form-group">
					<label className="lbl">Role</label>
					<select className="inp">
						<option className="opt" value="applicant">Applicant</option>
						<option className="opt" value="employer">Employer</option>
					</select>
				</div>

				<div className="form-group">
					<button className="btn" type="submit">
						<span>Sign Up</span>
					</button>
				</div>

				<div className="txt-section">
					<p className="">Already have an account?</p>
					<NavLink to="/login" className="">
						Login here!
					</NavLink>
				</div>
			</div>
		</>
	);
}
