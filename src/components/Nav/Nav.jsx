import './Nav.css';
import { NavLink } from 'react-router-dom'

const Nav = () => {
	return (
		<div className="navbar">
			<h3>J & L</h3>
			<nav>
				<NavLink to="/home" className="links">Home</NavLink>
				<NavLink to="/about" className="links">About</NavLink>
			</nav>
		</div>
	);
};

export default Nav;
