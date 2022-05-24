import { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {postWithToken} from './api';
import { authContext } from './context/AuthContext';
import Create from './pages/Create';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import Login from './pages/Login';
import MyApplications from './pages/MyApplications';
import MyOffers from './pages/MyOffers';
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
				email:data.user.email,
				role:data.user.role,
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
					<Route path="/jobs" element={<Jobs/>} />
					<Route path="/my-applications" element={<MyApplications/>} />
					<Route path="/create" element={<Create/>} />
					<Route path="/my-offers" element={<MyOffers/>} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<SignUp />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
