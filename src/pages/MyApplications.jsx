import React, { useEffect, useState } from "react";
import { postWithToken, putWithToken, getWithToken } from "../api";
import Navbar from "../components/Navbar";
import {IoLocation, IoPerson} from "react-icons/io5";

export default function MyApplications() {
	const [applications, setApplications] = useState([]);
	const [oneJob, setOneJob] = useState();
	const [modalJob, setModalJob] = useState(false);

	useEffect(() => {
		postWithToken("/api/jobs/me", {
			token: localStorage.getItem("token"),
		})
			.then(({ data }) => {
				console.log(data);
				setApplications(data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

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

	const unApplyJob = (id) => {
		const token = localStorage.getItem("token");
		putWithToken("/api/jobs/unapply/" + id, { token })
			.then(({ data }) => {
				console.log(data);
                applications.splice(applications.findIndex(application => application.id === id), 1);
                setApplications([...applications]);
				data.message ? alert(data.message) : console.log(data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<>
			<Navbar />

			{modalJob && (
				<div className="modal">
					<h2>{oneJob.title}</h2>
					<button className="btn" onClick={() => setModalJob(false)}>
						<span>Close</span>
					</button>
				</div>
			)}

			<div className="container">
				<h4>My Applications</h4>
				{
                    applications.length > 0 ?
                        applications.map((job) => {
                            return (

								<div key={job._id} className="job-container">

									<div className="job-first-section">
										<div className="job-title">
											<h3>{job.title}</h3>
										</div>
										<div className="job-location">										
											<IoLocation/>
											<p>{`${job.location.country}, ${job.location.province}${job.location.city ? ", "+job.location.city : ""}`}</p>
										</div>

										<div className="job-salary">
											<p className="symbol">$</p>
											<p>{`${job.salary}`}</p>
										</div>

										<div className="job-applicants">
											<IoPerson/>
											<p>{job.applicants.length}</p>
										</div>

										
									</div>

									<div className="job-categories">
										{job.category.map((category) => {
											return <p className={`tags tag-${category.replace(/ /g, "")}`} key={category}>{category}</p>;
										})}
									</div>
									
									
									<div className="job-buttons">
										<button onClick={() => viewJob(job._id)} className="btn-secondary">
											<span>View</span>
										</button>
										<button className="btn" onClick={() => unApplyJob(job._id)}>
											<span>Unapply</span>
										</button>										
									</div>
									
								</div>
                                // <div className="job-container">
                                //     <div className="job-title">
                                //         <h3>{application.title}</h3>
                                //         <p>{application.salary}</p>
                                //     </div>
                                //     {/* <button onClick={() => viewJob(application._id)} className="btn">
                                //         <span>Ver</span>
                                //     </button> */}
                                //     <button className="btn" onClick={() => unApplyJob(application._id)}>
                                //         <span>Unapply</span>
                                //     </button>
                                // </div>
                            );
                        })
                    : <h2>You have not yet applied for any job offer</h2>
                
                }
			</div>
		</>
	);
}
