import React, {useContext, useRef} from "react";
import { useNavigate } from "react-router-dom";
import { post } from "../api";
import { authContext } from "../context/AuthContext";
import { NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Login() {

	const {auth, setAuth} = useContext(authContext);

	const navigate = useNavigate();

	const emailRef = useRef();
	const passwordRef = useRef();

	const login = (e) => {
		e.preventDefault();

		post("/api/auth/login", {
			email: emailRef.current.value,
			password: passwordRef.current.value

		})
		.then(({data}) => {
			const {token,user} = data;
			localStorage.setItem("token", token);
			setAuth({
				id: user.id,
				name: user.name,
				logged: true
			})
			navigate("/", {replace: true});
		})
		.catch(err => {
			console.log(err);
		})
	}

	return (
		<>
			<Navbar/>
			<form onSubmit={login} className="container">
				<h4 className="subtitle">Login</h4>

				<div className="form-group">
					<label className="lbl">Email address</label>
					<input ref={emailRef} className="inp" placeholder="jhondoe@domain.com" type="email" />
				</div>

				<div className="form-group">
					<label className="lbl">Password</label>
					<input ref={passwordRef} className="inp" type="password" placeholder="Password" />
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
			</form>
		</>
	);
}
