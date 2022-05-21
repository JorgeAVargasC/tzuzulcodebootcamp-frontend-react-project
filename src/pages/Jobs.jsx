import React, { useEffect, useState } from "react";
import { getWithToken, postWithToken } from "../api";
import Navbar from "../components/Navbar";

export default function Jobs() {
	const [jobs, setJobs] = useState([]);
	const [categories, setCategories] = useState([]);

	const [selectedCategory, setSelectedCategory] = useState([]);

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

	jobs.map((job) => {
		job.category.map((category) => {
			var catWithOutSpaces = category.trim();
			if (!categories.includes(catWithOutSpaces)) {
				setCategories([...categories, catWithOutSpaces].sort());
			}
		});
	});

	const addCategory = (category) => {
		if (!selectedCategory.includes(category)) {
			setSelectedCategory([...selectedCategory, category]);
			console.clear();
			console.log(selectedCategory);
		} else {
			setSelectedCategory(selectedCategory.filter((cat) => cat !== category));
			console.clear();
			console.log(selectedCategory);
		}
	};

	const byCategory = () => {
		if (selectedCategory.length > 0) {
			postWithToken("/api/jobs/category", {
				category: selectedCategory,
			})
				.then(({ data }) => {
					console.log(data);
					data.message?
					alert(data.message) :
					setJobs(data)			
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			alljobs();
		}
	};

	return (
		<>
			<Navbar />
			<div className="container">
				<div className="trabajo">
					<input type="text" placeholder="Job" />
					<input type="text" placeholder="City, Province" />
					<button onClick={() => byCategory()} className="btn2" type="button">
						<span>Find!</span>
					</button>
				</div>

				{categories.map((category, key) => {
					return (
						<div className="form-group">
							<input
								type="checkbox"
								value={category}
								onClick={() => addCategory(category)}
							/>
							<label>{category}</label>
						</div>
					);
				})}

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
							<button className="btn">
								<span>Aplicar</span>
							</button>
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
