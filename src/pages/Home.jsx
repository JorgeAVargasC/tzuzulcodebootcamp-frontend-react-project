import React, { useState } from "react";
import Navbar from "../components/Navbar";
import img1 from "../assets/img/process-01.png";
import img2 from "../assets/img/process-02.png";
import img3 from "../assets/img/process-03.png";
import 'animate.css';

export default function Home() {

	const [img, setImg] = useState(img1);

	const handleClick = (img) => {
		if (img === 1) {
			setImg(img1);
		} else if (img === 2) {
			setImg(img2);
		} else if (img === 3) {
			setImg(img3);
		}
	}

	return (
		<>
			<Navbar />
			<div className="section">
				<div className="container2">

					<div className="col-lg-6">
						<div className="section-title">
							<h1>How It work</h1>
							<p>Job Search is an app to solicit employment or submit a job offer. If you're looking for a job, you have to follow the next steps:</p>

							<div className="process-menu animate__animated animate__fadeInUp">
								<div className={img === img1? "nav-link home-active-link": "nav-link"} onClick={() => handleClick(1)}>
									<div className="d-flex">
										<div className="number flex-shrink-0">
											1
										</div>
										<div className="parrafo">
											<h3>Register an account</h3>
											<p>Create an account or login to see all the job offers available. </p>
										</div>
									</div>
								</div>

								<div className={img === img2? "nav-link home-active-link": "nav-link"} onClick={() => handleClick(2)}>
									<div className="d-flex">
										<div className="number flex-shrink-0">
											2
										</div>

										<div className="parrafo">
											<h3>Find your job</h3>
											<p>Once you have been registered to login, you can see all the job offers available. You can use the filter to find your dream job! </p>
										</div>
									</div>
								</div>

								<div className={img === img3? "nav-link home-active-link": "nav-link"} onClick={() => handleClick(3)}>
									<div className="d-flex">
										<div className="number flex-shrink-0">
											3
										</div>

										<div className="parrafo">
											<h3>Apply for job</h3>
											<p>If you finally find your perfect job, you can click on the "Apply" button to send your request.</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="col-lg-6">
						<div className="tab-content">
							<div className="images">
								<img className="img-fluid" src={img} alt="" width="300" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
