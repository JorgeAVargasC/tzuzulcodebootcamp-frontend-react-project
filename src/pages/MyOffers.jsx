import React, {useState, useEffect, useContext} from "react";
import Navbar from "../components/Navbar";
import { authContext } from "../context/AuthContext";
import { postWithToken, getWithToken } from "../api";

export default function MyOffers() {

	const [myOffers, setMyOffers] = useState([]);

	const {auth} = useContext(authContext);

	useEffect(() => {
		const token = localStorage.getItem("token");
		console.log(auth.id);
		postWithToken("/api/jobs/employer", {token})
		.then(({ data }) => {			
			console.log(data);
			data.message ? setMyOffers([]) : setMyOffers(data);
		})
		.catch((err) => {
			console.log(err);
		});		
	}, []);

	return (
		<>
			<Navbar />
			<div className="container">
				<h2>My Offers</h2>

                {myOffers.map((job) => {
					return (
						// console.clear(),
						// console.log(job),
						<div key={job._id} className="job-container">
							<div className="job-title">
								<h3>{job.title}</h3>
								<p>{job.salary}</p>
							</div>
							{/* Quitar los comentarios luego */}
							{/* <div className="job-date">
								<p>{Date(job.creationDate)}</p>
							</div>
							<div className="job-description">
								<p>{job.description}</p>
							</div>
							<div className="applicants">
								<p>{job.applicants.length}</p>
							</div>
							{job.category.map((category,key) => {
								return <p key={key}>{category}</p>;
							})} */}
							<button className="btn">
								<span>Ver</span>
							</button>
						</div>
					);
				})}

			</div>
		</>
	);
}
