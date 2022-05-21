import React, { useEffect, useState } from "react";
import { getWithToken } from "../api";
import Navbar from "../components/Navbar";

export default function Home() {
	const [jobs, setJobs] = useState([]);
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		const token = localStorage.getItem("token");
		getWithToken("/api/jobs", { token })
			.then(({ data }) => {
				setJobs(data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	console.log(jobs);

	return (
		<>
			<Navbar />
			<div className="container">
				<div className="trabajo">
					<input type="text" placeholder="Job" />
					<input type="text" placeholder="City, Province" />
					<button className="btn2" type="button"><span>Find!</span></button>
				</div>
				
				{
					<select className="inp">
						<option value="">All Categories</option>
						{
							categories.map((category,key) => {
								return <option key={key} value={category}>{category}</option>
							})
						}
					</select>
				}

				{
				jobs.map((job) => {
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
							<button className="btn"><span>Aplicar</span></button>
						</div>
					);
				})}

				{/* <p className="tag">
					Javascript
				</p> */}
			</div>
		</>
	);
}
