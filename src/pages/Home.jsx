import Login from "../components/Login";
import SignUp from "../components/SignUp";

import {useState} from "react";

export default function Home() {

	const [section, setSection] = useState('login');

	const handleLogin = () => {
		setSection('login');
	};

	const handleSignUp = () => {
		setSection('signup');		
	};

	return (
		<div className="container">
			<h3 className="subtitle">
				Welcome to Job <span className="txt-blue">Search!</span>
			</h3>
			<div className="login-signup-navigation">
				<button onClick={handleLogin} className={section==='login' ? 'btn active' : 'btn'}>
					<span>Login</span>
				</button>
				<button onClick={handleSignUp} className={section==='signup' ? 'btn active' : 'btn'}>
					<span>Sign Up</span>
				</button>
			</div>

			{section==='login' ? <Login /> : <SignUp />}

		</div>
	);
}
