import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "../api";
import { authContext } from "../context/AuthContext";
import { NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";
import Logo from "../assets/svg/logo.svg";
import swal from "sweetalert";

import Swal from "sweetalert2";

export default function Login() {
	const { setAuth } = useContext(authContext);

	const navigate = useNavigate();

	const emailRef = useRef();
	const passwordRef = useRef();

	const login = (e) => {
		e.preventDefault();

		post("/api/auth/login", {
			email: emailRef.current.value,
			password: passwordRef.current.value,
		})
		.then(({ data }) => {
			const { token, user } = data;
			localStorage.setItem("token", token);
			setAuth({
				id: user.id,
				name: user.name,
				role: user.role,
				email: user.email,
				logged: true,
			});
			navigate("/", { replace: true });
			Swal.fire({
				icon: "success",
				title: "Login Success",
				text: "Welcome back!",
			});
			})
		
		.catch((err) => {
			console.log(err);
		});
	}

	return (
		<>
			<Navbar />
			<div className="container">
				<form onSubmit={login}>

					<img className="logo2" src={Logo} alt="job search logo" />
					<h4 className="subtitle">Login</h4>

					<div className="form-group">
						<label className="lbl">Email address</label>
						<input
							ref={emailRef}
							className="inp"
							placeholder="jhondoe@domain.com"
							type="email"
						/>
					</div>

					<div className="form-group">
						<label className="lbl">Password</label>
						<input
							ref={passwordRef}
							className="inp"
							type="password"
							placeholder="Password"
						/>
					</div>

					<div className="form-group">
						<button className="btn" type="submit">
							<span>Login</span>
						</button>
					</div>

					<div className="txt-section">
						<p>Don't have an account yet?</p>
						<NavLink to="/signup" className="blue-tag">
							Sing up here!
						</NavLink>
					</div>
				</form>
			</div>
		</>
	);
}
