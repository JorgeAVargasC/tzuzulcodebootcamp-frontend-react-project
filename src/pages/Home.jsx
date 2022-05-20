import React from "react";
import Navbar from "../components/Navbar";

export default function Home() {
	return (
		<>
			<Navbar/>
			<div className="container">
				<h2>Find your dream jobs with <h1>J&L</h1></h2>
				{/* <p className="tag">
					Javascript
				</p> */}
			</div>
		</>
	);
}
