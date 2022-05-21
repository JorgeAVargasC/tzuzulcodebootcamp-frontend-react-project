import React, { useEffect, useState } from "react";
import { getWithToken } from "../api";
import Navbar from "../components/Navbar";

export default function Home() {
	const [jobs, setJobs] = useState([]);

	useEffect(() => {
		const token = localStorage.getItem("token");
		getWithToken("/api/jobs", { token })
		.then(({ data }) => {
			// console.clear();
			// console.log(data);
			setJobs(data);
		})
		.catch((err) => {
			console.log(err);
		});
	}, []);
	

	return (
		<>
			<Navbar />
			<div className="container">
				<div className="trabajo">
					<input type="text" placeholder="Job, Company name..." />
					<button type="button">Find!</button>
				</div>

				{jobs.map((job) => {
					return (
						<div className="job-container">
							<div className="job-title">
								{console.log(job)}
								<h3>{job.title}</h3>
								<p>{job.salary}</p>
							</div>
							<div className="job-description">
								<p>{job.description}</p>
							</div>
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
