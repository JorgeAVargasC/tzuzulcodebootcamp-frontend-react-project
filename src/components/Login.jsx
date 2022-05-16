import React from "react";

export default function Login() {
	return (
		<div className="card">
			<h4 className="subtitle">Login</h4>

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
					<span>Login</span>
				</button>
			</div>

			<div className="txt-section">
				<p>Don't have an account yet?</p>
				<p className="txt-blue">Sign up here!</p>
			</div>
		</div>
	);
}
