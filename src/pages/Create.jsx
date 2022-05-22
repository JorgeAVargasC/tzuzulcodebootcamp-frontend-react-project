import React from "react";
import Navbar from "../components/Navbar";

export default function Create() {
	return (
		<>
			<Navbar />
			<div className="container">
                <h2>Create</h2>

                <input type="text" placeholder="Title" />
                <input type="text" />
                <textarea placeholder="Descripción"></textarea>
            </div>
		</>
	);
}
