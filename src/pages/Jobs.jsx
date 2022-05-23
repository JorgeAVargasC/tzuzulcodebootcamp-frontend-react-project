import React, { useEffect, useRef, useState } from "react";
import { getWithToken, postWithToken, putWithToken } from "../api";
import Navbar from "../components/Navbar";

export default function Jobs() {
	const [jobs, setJobs] = useState([]);
	const [oneJob, setOneJob] = useState()
	const [modalJob, setModalJob] = useState(false);
	const [categories, setCategories] = useState([]);
	const [countries, setCountries] = useState([]);

	const [selectedCategory, setSelectedCategory] = useState([]);
	
	const selectedCountryRef = useRef();

	const alljobs = () => {
		const token = localStorage.getItem("token");
		getWithToken("/api/jobs", { token })
			.then(({ data }) => {
				setJobs(data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		alljobs();
	}, []);


	// Countries

	const removeAccents = (str) => {
		return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
	} 

	var countryTemp = [];

	jobs.map((job) => {
		var normCountry = removeAccents(job.location.country);
		if(!countryTemp.includes(normCountry)) {
			countryTemp.push(normCountry);
		}
	});

	useEffect(() => {
		setCountries(countryTemp.sort());
	},[]);
	

	// Cateogories

	var categTemp = [];

	jobs.map((job) => {
		job.category.map((category) => {
			var catWithOutSpaces = category.trim();
			if (!categTemp.includes(catWithOutSpaces)) {
				categTemp.push(catWithOutSpaces);
			}
		});
	});

	useEffect(() => {
		setCategories(categTemp.sort());
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
					data.message ? alert(data.message) : setJobs(data);
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
				"country": selectedCountryRef.current.value,
			})
			.then(({ data }) => {
				data.message ? alert(data.message) : setJobs(data);
			})
			.catch((err) => {
				console.log(err);
			});
		}	else{
			alljobs();
		}	
	}

	const viewJob = (id) =>{
		const token = localStorage.getItem("token");
		getWithToken("/api/jobs/" + id, { token })
		.then(({ data }) => {
			setOneJob(data);
			setModalJob(true);
		})
		.catch((err) => {
			console.log(err);
		})
	}

	const applyJob = (id) => {
		const token = localStorage.getItem("token");
		putWithToken("/api/jobs/apply/" + id, { token })
		.then(({ data }) => {
			console.log(data);
			data.message ? alert(data.message) : console.log(data);			
		})
		.catch((err) => {
			console.log(err);
		})
	}

	const unApplyJob = (id) => {
		const token = localStorage.getItem("token");
		putWithToken("/api/jobs/unapply/" + id, { token })
		.then(({ data }) => {
			console.log(data);
			data.message ? alert(data.message) : console.log(data);			
		})
		.catch((err) => {
			console.log(err);
		})
	}

	return (
		<>
			<Navbar />

			{
				modalJob && 
				<div className="modal">
					<h2>{oneJob.title}</h2>
					<button className="btn" onClick={() => setModalJob(false)}><span>Close</span></button>
					<button className="btn" onClick={() => applyJob(oneJob._id)}><span>Apply</span></button>
					<button className="btn" onClick={() => unApplyJob(oneJob._id)}><span>Unapply</span></button>
				</div> 
			}
			
			<div className="container">
				
				<h4 className="title-find">Find your job</h4>
				<input className="inp find-job" type="text" placeholder="Job" />
				<button className="btn" onClick={() => byCategory()} type="button">
					<span>Find!</span>
				</button>				

				<h4 className="title-country">Country</h4>
				<select className="inp select-country" ref={selectedCountryRef}>
					<option value="all">All</option>
					{countries.map((country) => {
						return <option value={country}>{country}</option>;
					})}
				</select>
				<button className="btn" onClick={() => byCountry()}><span>Search Country</span></button>

				<h4 className="title-categories">Categories</h4>
				<div className="categories-checkboxes">
					
					{
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
					}
				</div>

				{jobs.map((job) => {
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
							<button onClick={() => viewJob(job._id)} className="btn">
								<span>Ver</span>
							</button>
						</div>
					);
				})}
			</div>
		</>
	);
}
