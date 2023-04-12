import { useRef, useState } from 'react';
import '../styles/Heading.css';

const DEFAULT = "Save your file for next time. Don't forget your name!";
const ERROR_NO_NAME = "Error: You MUST remember your name!";
const ERROR_NO_NAME_2 = "Please... Just put your name in the text box";
const ERROR_NO_NAME_5 = "Are you reading this???";
const ERROR_NO_NAME_10 = "PUT. YOUR. NAME. IN. THE. TEXT. BOX.";
const ERROR_NO_NAME_20 = "It's clear at this point that you're just trying to see if I've programmed any more messages. well guess what, after this one I'm stopping, so keep clicking away and see what happens.";
const ERROR_NO_NAME_50 = "Okay you got me, just one more message, but please if you want to upload your file, you NEED to put your name in. Thanks.";
const INPUT = "Drag and drop a file, or click in the rectangle";

const Heading = ({ heading, setSearchText, uploadOpts, setUploadOpts }) => {

	const [uploadMessage, setUploadMessage] = useState(DEFAULT);
	const [inputMessage, setInputMessage] = useState(INPUT);
	const [noNameCount, setNoNameCount] = useState(0);
	const fileRef = useRef(null);

	const upload = (event) => {
		event.preventDefault();

		const form = new FormData(event.target);

		if (uploadOpts.update && form.get("file")?.name !== uploadOpts.path) {
			setUploadMessage(`Names do not match, try renaming the file to "${uploadOpts.path}"`);
			return;
		}

		if (form.get("name") === '') {
			let message;
			
			if (noNameCount >= 60)
				message = DEFAULT;
			else if (noNameCount >= 50)
				message = ERROR_NO_NAME_50;
			else if (noNameCount >= 20)
				message = ERROR_NO_NAME_20;
			else if (noNameCount >= 10)
				message = ERROR_NO_NAME_10;
			else if (noNameCount >= 5)
				message = ERROR_NO_NAME_5;
			else if (noNameCount >= 2)
				message = ERROR_NO_NAME_2;
			else
				message = ERROR_NO_NAME;

			setNoNameCount(noNameCount + 1);
			setUploadMessage(message);
			return;
		}

		fetch("/api/upload", { method: "POST", body: form })
			.then(res => res.json())
			.then(data => {
				if (data.error)
					setUploadMessage(data.error);
			})
			.finally(() => {
				toggleUpload();
				setTimeout(() => { window.location = '/'; }, 500);
			});
	};

	const updateSearchText = (event) => {
		setSearchText(event.target.value);
	};

	const handleChange = (event) => {
		event.target.files.length > 0
			? setInputMessage("uploading: " + event.target.files[0].name)
			: setInputMessage(INPUT);
	}

	const toggleUpload = () => {
		setUploadMessage(DEFAULT);
		setInputMessage(INPUT);
		if (uploadOpts.open) {
			heading.current.classList.remove("heading-open-upload");
			heading.current.classList.remove("heading-open-update");
		} else {
			heading.current.classList.add("heading-open-upload");
		} 
		setUploadOpts({
			name: '',
			path: '', // clear out each time we press button
			open: ! uploadOpts.open, 
			update: false
		});
	}

	return (
		<div ref={heading} className="heading">
			<div className="upload-view">
				<h3>{uploadMessage}</h3>
				<form method="POST" encType="multipart/form-data" onSubmit={upload}>
					<input name="name" type="text" placeholder="*REQUIRED* Your Name" style={{margin: "0 100px"}} defaultValue={uploadOpts.name} disabled={uploadOpts.update}/>
					<label className="upload-input" >
						{inputMessage}
						<input ref={fileRef} name="file" style={{opacity: 0, position: "absolute"}} type="file" onChange={handleChange}/>
					</label>
					<input className="upload-button" type="submit" value={uploadOpts.update ? "UPDATE" : "UPLOAD"} />
				</form>
			</div>

			<div className="title-bar">
				<input className="search-input" type="text" placeholder="full text search..." onChange={updateSearchText} />
				<button className="upload-toggle" onClick={toggleUpload} >{uploadOpts.open ? "CANCEL" : "UPLOAD"}</button>
			</div>
		</div>
	);
};

export default Heading;