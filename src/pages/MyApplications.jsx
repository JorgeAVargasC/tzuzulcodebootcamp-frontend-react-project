import React, { useEffect, useState } from "react";
import { postWithToken } from "../api";
import Navbar from "../components/Navbar";
import Jobs from "./Jobs";


export default function MyApplications() {

    const [applications, setApplications] = useState([])

    useEffect(() => {
        postWithToken("/api/jobs/me", {
            token: localStorage.getItem("token")
        })
        .then(({ data }) => {
            console.log(data);
            setApplications(data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

	return (
        
		<>
            <Navbar/>
            <div className="container">
                <h4>My Applications</h4>
                {applications.map((application) => {
                    return (
                        <div className="job-container">
                            <div className="job-title">
                                <h3>{application.title}</h3>
                                <p>{application.salary}</p>
                            </div>
                            {/* <button onClick={() => viewJob(application._id)} className="btn">
								<span>Ver</span>
							</button> */}
                        </div>
                    )
                })}
            </div>
			
		</>
	);
}
