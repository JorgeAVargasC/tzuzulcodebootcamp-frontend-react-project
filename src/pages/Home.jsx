import React from "react";
import Navbar from "../components/Navbar";

export default function Home() {
	return (
		<>
			<Navbar />
			<div className="container">
				<div className="trabajo">
					<input type="text" placeholder="Job, Company name..." />
					<button type="button">Find!</button>
				</div>

				{/* <p className="tag">
					Javascript
				</p> */}
			</div>
		</>
	);
}
