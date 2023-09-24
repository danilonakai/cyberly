import Image from 'next/image'
import Link from 'next/link'
import { faPlus, faKey, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useEffect } from "react"

export default function Home() {
	const [userID, setUserID] = useState("4");
	const [categoryList, setCategoryList] = useState();
	const [selectedCategory, setSelectedCategory] = useState({id:"",name:""});
	const [credentialsList, setCredentialsList] = useState();
	const [selectedCredential, setSelectedCredential] = useState({
		id: "",
		title: "",
		username: "",
		password: "",
		website: "",
		category_id: "",
		owner_id: "",
		date: ""
	});

	useEffect(() => {
		getCategories();
	}, []);



	// GENERAL
	function clearPopupInputs() {
		document.querySelector("#new-category-name").value = "";
		document.querySelector("#new-credential-title").value = "";
		document.querySelector("#new-credential-username").value = "";
		document.querySelector("#new-credential-password").value = "";
		document.querySelector("#new-credential-website").value = "";
	}

	function hidePopup() {
		document.querySelector(".popup").style.display = "none";
		document.querySelector(".popup .category").style.display = "none";
		document.querySelector(".popup .credential").style.display = "none";
	}

	// CATEGORY
	function showCategoryPopup() {
		document.querySelector(".popup").style.display = "block";
		document.querySelector(".popup .category").style.display = "block";
	}

	async function createCategory() {
		let res = await fetch("https://cyberly.vercel.app/api/categories/create", {
			method: "POST",
			body: JSON.stringify({
				name: document.querySelector("#new-category-name").value,
				owner_id: "11"
			}),
		});
		res = await res.json();
		console.log(res);

		if (res.acknowledged == true) {
			hidePopup();
			clearPopupInputs();
			getCategories();
		}
	}

	async function getCategories() {
		let data = [];
		let res = await fetch("https://cyberly.vercel.app/api/categories/read", {
			method: "GET"
		});
		res = await res.json();

		res.forEach(item => {
			data.push(
				<li onClick={(event)=>{
					selectCategory(event,item._id,item.name)
				}}>{item.name}</li>
			);
		});

		setCategoryList(data);
	}

	function selectCategory(event,id,name){
		document.querySelector("main div button").style.display = "block";

		setSelectedCategory({
			id: id,
			name: name
		});

		document.querySelectorAll("aside ul li").forEach(item=>{
			item.classList.remove("selected");
		});
		
		event.target.classList = "selected";

		getCredentials(id);
	}

	// CREDENTIALS
	function showCredentialsPopup() {
		document.querySelector(".popup").style.display = "block";
		document.querySelector(".popup .credential").style.display = "block";
	}

	async function createCredential() {
		let res = await fetch("https://cyberly.vercel.app/api/credentials/create", {
			method: "POST",
			body: JSON.stringify({
				title: document.querySelector("#new-credential-title").value,
				username: document.querySelector("#new-credential-username").value,
				password: document.querySelector("#new-credential-password").value,
				website: document.querySelector("#new-credential-website").value,
				date: new Date().toUTCString(),
				category_id: selectedCategory.id,
				owner_id: userID
			}),
		});
		res = await res.json();
		console.log(res);

		if (res.acknowledged == true) {
			hidePopup();
			clearPopupInputs();
			getCredentials(selectedCategory.id);
		}
	}

	async function getCredentials(id) {
		let data = [];

		let params = JSON.stringify({
			category_id: id,
			owner_id: userID
		}).replaceAll('{','').replaceAll('}','').replaceAll(':','=').replaceAll('","','&').replaceAll('"','');

		let res = await fetch("https://cyberly.vercel.app/api/credentials/read?"+params, {
			method: "GET"
		});
		res = await res.json();

		res.forEach(item => {
			console.log(item);

			data.push(
				<li onClick={(event)=> selectCredential(
					event,
					item._id,
					item.title,
					item.username,
					item.password,
					item.website,
					item.category_id,
					item.owner_id,
					item.date
				)}>
					<div>
						<h3><FontAwesomeIcon icon={faKey} /> {item.title}</h3>
					</div>

					<span>{item.username}</span>
				</li>
			);
		});

		setCredentialsList(data);
	}
	
	function selectCredential(event,id,title,username,password,website,category_id,owner_id,date){
		document.querySelector("section .credential-content").style.display = "block";

		document.querySelectorAll("main ul li").forEach(item=>{
			item.classList.remove("selected");
		});
		
		event.target.classList = "selected";

		setSelectedCredential({
			id: id,
			title: title,
			username: username,
			password: password,
			website: website,
			category_id: category_id,
			owner_id: owner_id,
			date: date
		});
	}

	async function deleteCredential(id){
		let res = await fetch("https://cyberly.vercel.app/api/credentials/delete?id="+id, {
			method: "DELETE"
		});
		res = await res.json();
		
		document.querySelector("section .credential-content").style.display = "none";

		setSelectedCredential({
			id: "",
			title: "",
			username: "",
			password: "",
			website: "",
			category_id: "",
			owner_id: "",
			date: ""
		});

		getCredentials(selectedCategory.id);

		console.log(res);
	}

	return (
		<div className="container">
			<aside>
				<Link href="/">
					<Image src="/logo_white.png" width={150} height={50} alt="Logo" />
				</Link>

				<ul>
					{categoryList}
				</ul>

				<button onClick={showCategoryPopup}>New category <FontAwesomeIcon icon={faPlus} /></button>
			</aside>

			<main>
				<div>
					<h1>{selectedCategory.name}</h1>
					<button onClick={showCredentialsPopup}>New Credential <FontAwesomeIcon icon={faPlus} /></button>
				</div>


				<ul>
					{credentialsList}
				</ul>
			</main>

			<section>
				<div className="credential-content">
					<header>
						<h2>
							<FontAwesomeIcon icon={faKey} />
							{selectedCredential.title}
						</h2>

						<FontAwesomeIcon icon={faTrash} onClick={()=> deleteCredential(selectedCredential.id)} />
					</header>

					<ul>
						<li>
							<span>User</span>
							<strong>{selectedCredential.username}</strong>
						</li>

						<li>
							<span>Password</span>
							<strong>{selectedCredential.password}</strong>
						</li>

						<li>
							<span>Website</span>
							<strong>{selectedCredential.website}</strong>
						</li>
					</ul>
				</div>
			</section>

			<div className="popup">
				<div className="hide" onClick={hidePopup}></div>
				<div className="popup-container">
					<div className="category">
						<h3>Create a new category:</h3>

						<input type="text" id="new-category-name" placeholder="Name" />

						<button onClick={createCategory}>Create</button>
					</div>

					<div className="credential">
						<h3>Create a new credential:</h3>

						<input type="text" id="new-credential-title" placeholder="Title" />
						<input type="text" id="new-credential-username" placeholder="Username" />
						<input type="password" id="new-credential-password" placeholder="Password" />
						<input type="text" id="new-credential-website" placeholder="Website" />

						<button onClick={createCredential}>Create</button>
					</div>
				</div>
			</div>
		</div>
	)
}
