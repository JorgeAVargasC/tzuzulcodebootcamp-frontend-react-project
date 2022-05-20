import { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {postWithToken} from './api';
import { authContext } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

function App() {

	const context = useContext(authContext);

	useEffect(() => {
		postWithToken('/api/auth/validate')
		.then(({data})=>{
			data.failed?
			console.log(data) :
			context.setAuth({
				id:data.user.id,
				name:data.user.name,
				logged:true
			})
		})	
	}, [])

	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/home" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<SignUp />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
