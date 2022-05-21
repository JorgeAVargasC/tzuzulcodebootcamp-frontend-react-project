import React from "react";
import Navbar from "../components/Navbar";

export default function Home() {
	return (
		<>
			<Navbar />
			<section className="section">
				<div className="container">
					<div className="row align-items-center">
						<div className="col-lg-6">
							<div className="section-title me-5">
								<h3 className="title">How It Work</h3>
								<p className="text-muted">Post a job to tell us about your project. We'll quickly match you with the
									right freelancers.</p>
								<div className="process-menu nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
									<a className="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">
										<div className="d-flex">
											<div className="number flex-shrink-0">
												1
											</div>
											<div className="flex-grow-1 text-start ms-3">
												<h5 className="fs-18">Register an account</h5>
												<p className="text-muted mb-0">Due to its widespread use as filler text for layouts, non-readability
													is of great importance.</p>
											</div>
										</div>
									</a>
									<a className="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">
										<div className="d-flex">
											<div className="number flex-shrink-0">
												2
											</div>
											<div className="flex-grow-1 text-start ms-3">
												<h5 className="fs-18">Find your job</h5>
												<p className="text-muted mb-0">There are many variations of passages of avaibookmark-label, but the majority
													alteration in some form.</p>
											</div>
										</div>
									</a>
									<a className="nav-link" id="v-pills-messages-tab" data-bs-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">
										<div className=" d-flex">
											<div className="number flex-shrink-0">
												3
											</div>
											<div className="flex-grow-1 text-start ms-3">
												<h5 className="fs-18">Apply for job</h5>
												<p className="text-muted mb-0">It is a long established fact that a reader will be distracted by the
													readable content of a page.</p>
											</div>
										</div>
									</a>
								</div>
							</div>
						</div>
						<div className="col-lg-6">
							<div className="tab-content" id="v-pills-tabContent">
								<div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
									{/* <img src="assets/images/process-01.png" alt="" className="img-fluid"> */}
								</div>
								<div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
									{/* <img src="assets/images/process-02.png" alt="" className="img-fluid"> */}
								</div>
								<div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
									{/* <img src="assets/images/process-03.png" alt="" className="img-fluid"> */}
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}
