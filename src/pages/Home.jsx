import React from "react";
import Navbar from "../components/Navbar";
import img1 from "../assets/img/process-01.png"
import img2 from "../assets/img/process-02.png"
import img3 from "../assets/img/process-03.png"

export default function Home() {
	return (
		<>
			<Navbar />
			<div className="section">
				<div className="container2">

					<div className="col-lg-6">
						<div className="section-title">
							<h1>How It work</h1>
							<p>Post a job to tell us about your project. We'll quickly match you with the right freelancers. </p>

							<div className="process-menu">
								<div className="nav-link">
									<div className="d-flex">
										<div className="number">
											1
										</div>

										<div className="parrafo">
											<h3>Register an account</h3>
											<p>Due to its widespread use as filler text for layouts, non-readability is of great importance</p>
										</div>
									</div>
								</div>

								<div className="nav-link">
									<div className="d-flex">
										<div className="number">
											2
										</div>

										<div className="parrafo">
											<h3>Find your job</h3>
											<p>There are many variations of passages of avaibookmarl-label, but the majority alteration in some form</p>
										</div>
									</div>
								</div>
							</div>

							<div className="nav-link">
								<div className="d-flex">
									<div className="number">
										3
									</div>

									<div className="parrafo">
										<h3>Apply for job</h3>
										<p>It is a long established fact that a reader will be distracted by the readable content of</p>
									</div>
								</div>
							</div>
						</div>

					</div>

					<div className="col-lg-6">
						<div className="tab-content">
							<div className="images">
								<img className="img-fluid" src={img1} alt="" width="300" />
							</div>

							<div className="images">
								<img className="img-fluid" src={img2} alt="" width="300" />
							</div>

							<div className="images">
								<img className="img-fluid" src={img3} alt="" width="300" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
