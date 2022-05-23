import React, { useEffect, useState } from "react";
import { postWithToken, putWithToken } from "../api";
import Navbar from "../components/Navbar";

export default function MyApplications() {
	const [applications, setApplications] = useState([]);

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
			<div className="container">
				<h4>My Applications</h4>
				{
                    applications.length > 0 ?
                        applications.map((application) => {
                            return (
                                <div className="job-container">
                                    <div className="job-title">
                                        <h3>{application.title}</h3>
                                        <p>{application.salary}</p>
                                    </div>
                                    {/* <button onClick={() => viewJob(application._id)} className="btn">
                                        <span>Ver</span>
                                    </button> */}
                                    <button className="btn" onClick={() => unApplyJob(application._id)}>
                                        <span>Unapply</span>
                                    </button>
                                </div>
                            );
                        })
                    : <h2>You have not yet applied for any job offer</h2>
                
                }
			</div>
		</>
	);
}
