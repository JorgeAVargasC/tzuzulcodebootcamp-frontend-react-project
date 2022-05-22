import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { post, postWithToken } from "../api";
import { authContext } from "../context/AuthContext";
import { NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function SignUp() {
	const { setAuth } = useContext(authContext);

	const navigate = useNavigate();

	const nameRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();
	const roleRef = useRef();

	const signup = (e) => {
		e.preventDefault();
		post("/api/auth/signup", {
			name: nameRef.current.value,
			email: emailRef.current.value,
			password: passwordRef.current.value,
			role: roleRef.current.value,
		})
		.then(({ data }) => {
			data.error ? 
			console.log(data.error) : 
			console.log(data);
			localStorage.setItem("token", data.token);
			setAuth({
				id: data.user.id,
				name: data.user.name,
				role: data.user.role,
				email: data.user.email,
				logged: true,
			});
			navigate("/", {replace: true});
		})
		.catch((err) => console.log(err));
	};

	const recoverSession = () => {
		const token = localStorage.getItem("token");
		if (token) {
			postWithToken("/api/auth/validate", { token })
			.then(({ data }) => {
				data.error ? 
				console.log(data.error) :
				setAuth({
					id: data.user.id,
					name: data.user.name,
					logged: true,
				});
			})
			.catch((err) => console.log(err));
		}
	};

	return (
		<>
			<Navbar />
			<form onSubmit={signup} className="container">
				<h4 className="subtitle">Sign Up</h4>

				<div className="form-group">
					<label className="lbl">Name</label>
					<input ref={nameRef} className="inp" placeholder="Jhon Doe" type="text" />
				</div>

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
					<input ref={passwordRef} className="inp" type="password" />
				</div>

				<div className="form-group">
					<label className="lbl">Role</label>
					<select ref={roleRef} className="inp">
						<option className="opt" value="applicant">
							Applicant
						</option>
						<option className="opt" value="employer">
							Employer
						</option>
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
			</form>
			
			<button onClick={recoverSession} className="btn">
				<span>Recover Ression</span>
			</button>
		</>
	);
}
