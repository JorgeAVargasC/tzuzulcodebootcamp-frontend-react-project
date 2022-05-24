import React, { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import { authContext } from "../context/AuthContext";
import { postWithToken, getWithToken } from "../api";
import {IoLocation, IoPerson} from "react-icons/io5";

export default function MyOffers() {
	const [myOffers, setMyOffers] = useState([]);
	const [oneJob, setOneJob] = useState();
	const [modalJob, setModalJob] = useState(false);

	const { auth } = useContext(authContext);

	const viewJob = (id) => {
		const token = localStorage.getItem("token");
		getWithToken("/api/jobs/" + id, { token })
			.then(({ data }) => {
				setOneJob(data);
				setModalJob(true);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		const token = localStorage.getItem("token");
		console.log(auth.id);
		postWithToken("/api/jobs/employer", { token })
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

			{modalJob && (
				<div className="modal ">
					<div className="modal-info animate__animated animate__bounceIn">
						<div className="job-first-section">
							<div className="job-title">
								<h3>{oneJob.title}</h3>
							</div>
							<div className="job-location">
								<IoLocation />
								<p>{`${oneJob.location.country}, ${oneJob.location.province}${
									oneJob.location.city ? ", " + oneJob.location.city : ""
								}`}</p>
							</div>

							<div className="job-salary">
								<p className="symbol">$</p>
								<p>{`${oneJob.salary}`}</p>
							</div>

							<div className="job-applicants">
								<IoPerson />
								<p>{oneJob.applicants.length}</p>
							</div>
						</div>

						<div className="job-categories">
							{oneJob.category.map((category) => {
								return (
									<p
										className={`tags tag-${category.replace(/ /g, "")}`}
										key={category}
									>
										{category}
									</p>
								);
							})}
						</div>

						<div className="job-description">
							<p>{oneJob.description}</p>
						</div>

						<div className="job-buttons">
							<button className="btn-secondary" onClick={() => setModalJob(false)}>
								<span>Close</span>
							</button>
						</div>
					</div>
				</div>
			)}

			<div className="container">
				<h2 className="title-categories">My Offers</h2>

				{
				myOffers.length === 0 ? <h4>No offers yet</h4> : 
				myOffers.map((job) => {
					return (
						<div key={job._id} className="job-container">
							<div className="job-first-section">
								<div className="job-title">
									<h3>{job.title}</h3>
								</div>
								<div className="job-location">
									<IoLocation />
									<p>{`${job.location.country}, ${job.location.province}${
										job.location.city ? ", " + job.location.city : ""
									}`}</p>
								</div>

								<div className="job-salary">
									<p className="symbol">$</p>
									<p>{`${job.salary}`}</p>
								</div>

								<div className="job-applicants">
									<IoPerson />
									<p>{job.applicants.length}</p>
								</div>
							</div>

							<div className="job-categories">
								{job.category.map((category) => {
									return (
										<p
											className={`tags tag-${category.replace(/ /g, "")}`}
											key={category}
										>
											{category}
										</p>
									);
								})}
							</div>

							<div className="job-buttons">
								<button onClick={() => viewJob(job._id)} className="btn-secondary">
									<span>View</span>
								</button>								
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
}
