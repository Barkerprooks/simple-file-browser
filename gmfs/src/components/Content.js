import { useEffect, useState } from 'react';

import '../styles/Content.css';
import FileCard from './FileCard';
import FileView from './FileView';

const Content = ({ heading, searchText, setUploadOpts }) => {

	const [files, setFiles]  = useState([]);
	const [cells, setCells] = useState([]);
	const [file, setFile] = useState({});
	
	useEffect(() => {

		if (files.length === 0) {
			fetch("/api/")
				.then(res => res.json())
				.then(data => setFiles(data))
				.catch(error => console.log(error));
		} else {
			setFile(files[0]);
		}

		if (searchText !== '') {
			const search = searchText.toLowerCase();
			setCells(files.filter((file) => {
				const hasName = file.name.toLowerCase().includes(search);
				const hasAuthor = file.author.toLowerCase().includes(search);
				const hasText = file.text === null ? false : file.text.toLowerCase().includes(search);
				return hasName || hasAuthor || hasText;
			}));
		} else {
			setCells(files);
		}

	}, [files, searchText]);
	
	return (
		<div className="content">
			<div className="view-panel">
				<FileView file={file} heading={heading} setUploadOpts={setUploadOpts} />
			</div>
			<div className="file-list">
				{ cells.length === 0
					? <center>no files found, <a href="/">refresh</a>?</center> 
					: cells.map((file, key) => <FileCard key={key} file={file} setFile={setFile} />) }
			</div>
		</div>
	);
};

export default Content;