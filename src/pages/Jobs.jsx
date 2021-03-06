import React, { useEffect, useRef, useState } from "react";
import { getWithToken, postWithToken, putWithToken } from "../api";
import Navbar from "../components/Navbar";
import { IoLocation, IoPerson } from "react-icons/io5";
import "animate.css"
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";

export default function Jobs() {

	const MySwal = withReactContent(Swal);

	const navigate = useNavigate();

	const [jobs, setJobs] = useState([]);
	const [oneJob, setOneJob] = useState();
	const [modalJob, setModalJob] = useState(false);
	const [categories, setCategories] = useState([]);
	const [countries, setCountries] = useState([]);

	const [selectedCategory, setSelectedCategory] = useState([]);

	const selectedCountryRef = useRef();

	const searchRef = useRef();

	// Cateogories
	var categTemp = [];

	// Country
	var countryTemp = [];

	// Countries
	const removeAccents = (str) => {
		return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
	};

	const alljobs = () => {
		const token = localStorage.getItem("token");
		getWithToken("/api/jobs", { token })
			.then(({ data }) => {
				setJobs(data);

				data.map((job) => {
					job.category.map((category) => {
						var catWithOutSpaces = category.trim();
						if (!categTemp.includes(catWithOutSpaces)) {
							categTemp.push(catWithOutSpaces);
						}
					});
				});

				setCategories(categTemp.sort());

				data.map((job) => {
					var normCountry = removeAccents(job.location.country);
					if (!countryTemp.includes(normCountry)) {
						countryTemp.push(normCountry);
					}
				});

				setCountries(countryTemp.sort());
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		alljobs();
	}, []);

	const addCategory = (category) => {
		if (!selectedCategory.includes(category)) {
			setSelectedCategory([...selectedCategory, category]);
		} else {
			setSelectedCategory(selectedCategory.filter((cat) => cat !== category));
		}
	};

	const byCategory = () => {
		if (selectedCategory.length > 0) {
			postWithToken("/api/jobs/category", {
				category: selectedCategory,
			})
				.then(({ data }) => {
					data.message ? Swal.fire({
						icon: 'error',
						title: 'Oops...',
						text: 'Something went wrong!',
						footer: data.message,
					}) : setJobs(data);
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			alljobs();
		}
	};

	const byCountry = () => {
		if (selectedCountryRef.current.value !== "all") {
			postWithToken("/api/jobs/location", {
				country: selectedCountryRef.current.value,
			})
				.then(({ data }) => {
					data.message ? Swal.fire({
						icon: 'error',
						title: 'Oops...',
						text: 'Something went wrong!',
						footer: data.message,
					}) : setJobs(data);
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			alljobs();
		}
	};

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

	const applyJob = (id) => {
		const token = localStorage.getItem("token");
		putWithToken("/api/jobs/apply/" + id, { token })
			.then(({ data }) => {
				console.log(data);
				if(data.message){
					Swal.fire({
						icon: 'error',
						title: 'Oops...',
						text: 'Something went wrong!',
						footer: data.message,
					})
				}else{
					Swal.fire({
						icon: 'success',
						title: 'Correct!',
						text: 'You have correctly applied to the job',
						footer: data.message,
					})
					navigate("/my-applications");
				}
				
			})
			.catch((err) => {
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Something went wrong!',
					footer: err.message,
				})
			});
	};

	const unApplyJob = (id) => {
		const token = localStorage.getItem("token");
		putWithToken("/api/jobs/unapply/" + id, { token })
			.then(({ data }) => {
				console.log(data);
				data.message ? Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Something went wrong!',
					footer: data.message,
				}) : console.log(data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const generalSearch = () => {
		var jobsFilter = [];

		jobs.filter((job) => {
			if(searchRef.current.value !== ""){				
				if(job.title.toLowerCase().includes(searchRef.current.value.toLowerCase())){
					jobsFilter.push(job);
				}
			}else{
				alljobs();
			}
		})

		setJobs(jobsFilter);
	}

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
							<button className="btn" onClick={() => applyJob(oneJob._id)}>
								<span>Apply</span>
							</button>
						</div>
					</div>
				</div>
			)}

			<div className="container">
				<div className="jobs-grid-container">
					<div className="item-container">
						<h4 className="title-find">Find your job</h4>
						<div className="search-job">
							<input ref={searchRef} onChange={() => generalSearch()} className="inp find-job" type="text" placeholder="React Junior Developer..." />
							<button className="btn" onClick={() => generalSearch()} type="button">
								<span>Find!</span>
							</button>
						</div>
					</div>

					<div className="item-container">
						<h4 className="title-country">Country</h4>
						<select className="inp select-country" ref={selectedCountryRef}>
							<option value="all">All</option>
							{countries.map((country) => {
								return <option value={country}>{country}</option>;
							})}
						</select>
						<button className="btn" onClick={() => byCountry()}>
							<span>Search Country</span>
						</button>

						<h4 className="title-categories">Categories</h4>
						<button className="btn" onClick={() => byCategory()}>
							<span>Search Categories</span>
						</button>
						<div className="categories-checkboxes">
							{categories.length === 0 ? (
								<div className="loader">
									<div class="lds-dual-ring"></div>
								</div>
							) : (
								categories.map((category, key) => {
									return (
										<div className="form-group">
											<input
												className="cbx"
												id="cbx"
												type="checkbox"
												value={category}
												onClick={() => addCategory(category)}
											/>
											<label className="">{category}</label>
										</div>
									);
								})
							)}
						</div>
					</div>

					<div className="item-container">
						<h4 className="title-find">Jobs</h4>

						{jobs.length === 0 ? (
							<div className="loader">
								<div class="lds-dual-ring"></div>
							</div>
						) : (
							jobs.map((job) => {
								return (
									<div key={job._id} className="job-container">
										<div className="job-first-section">
											<div className="job-title">
												<h3>{job.title}</h3>
											</div>
											<div className="job-location">
												<IoLocation />
												<p>{`${job.location.country}, ${
													job.location.province
												}${
													job.location.city
														? ", " + job.location.city
														: ""
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
														className={`tags tag-${category.replace(
															/ /g,
															""
														)}`}
														key={category}
													>
														{category}
													</p>
												);
											})}
										</div>

										<div className="job-buttons">
											<button
												onClick={() => viewJob(job._id)}
												className="btn-secondary"
											>
												<span>View</span>
											</button>
											<button
												onClick={() => applyJob(job._id)}
												className="btn"
											>
												<span>Apply</span>
											</button>
										</div>
									</div>
								);
							})
						)}
					</div>
				</div>
			</div>
		</>
	);
}
