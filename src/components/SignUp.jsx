import React from "react";

export default function SignUp() {
	return (
		<div className="card">
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
				<button className="btn" type="submit">
					<span>Sign Up</span>
				</button>
			</div>

			<div className="txt-section">
				<p>Already have an account?</p>
				<p className="txt-blue">Login here!</p>
			</div>
		</div>
	);
}
