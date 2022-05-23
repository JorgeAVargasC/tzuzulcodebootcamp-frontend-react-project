import React, {useState, useEffect, useRef, useContext} from "react";
import Navbar from "../components/Navbar";
import { getWithToken, postWithToken } from "../api";
import { authContext } from "../context/AuthContext";

export default function Create() {

	const {auth} = useContext(authContext);

	const [jobs, setJobs] = useState([]);
	const [categories, setCategories] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState([]);

	const newCategoryRef = useRef();

	const titleRef = useRef();
	const countryRef = useRef();
	const cityRef = useRef();
	const provinceRef = useRef();
	const salaryRef = useRef();
	const descriptionRef = useRef();

	var categTemp = [];
	var countryTemp = [];

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


	const newCategory = () => {
		if (newCategoryRef.current.value !== "") {
			if(!categories.includes(newCategoryRef.current.value)) {
				setCategories([newCategoryRef.current.value, ...categories]);
				newCategoryRef.current.value = "";
			}
		}
	}

	const createJob = () => {
		postWithToken("/api/jobs", {
			"employer":{
				"id": auth.id,
				"name": auth.name,
				"email": auth.email,
				"role": auth.role
			},
			"description": descriptionRef.current.value,
			"title": titleRef.current.value,
			"category": selectedCategory,
			"location":{
				"country": countryRef.current.value,
				"province": provinceRef.current.value,
				"city": cityRef.current.value
			},
			"salary": salaryRef.current.value,
		})
		.then(({ data }) => {
			data.message ? alert(data.message) : console.log(data);
		})
		.catch((err) => {
			console.log(err);
		});
	}

	return (
		<>
			<Navbar />
			<div className="container">
                <h2>Create</h2>

                <input ref={titleRef} className="inp" type="text" placeholder="Title" />
                <input ref={countryRef} className="inp" type="text" placeholder="Country"/>
                <input ref={provinceRef} className="inp" type="text" placeholder="Province"/>
                <input ref={cityRef} className="inp" type="text" placeholder="City"/>
				<input ref={salaryRef} className="inp" type="number" placeholder="$1000"/>

				<h4>Categories</h4>
				<input className="inp" ref={newCategoryRef} type="text" placeholder="New category..."/>
				<button className="btn" onClick={() => newCategory()}><span>Add New Category</span></button>
				<div className="categories-checkboxes">
					
					{categories.map((category, key) => {
						return (
							<div key={key} className="form-group">
								<input								
									type="checkbox"
									value={category}
									onClick={() => addCategory(category)}
								/>
								<label>{category}</label>
							</div>
						);
					})}
				</div>

                <textarea ref={descriptionRef} className="inp" placeholder="Description"></textarea>

				<button className="btn" onClick={() => createJob()}><span>Create Offer</span></button>
            </div>
		</>
	);
}
