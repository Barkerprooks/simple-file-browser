import '../styles/FileView.css';
import { parseDate, toTitleCase, normalizeByte } from './FileCard';

const FileView = ({ heading, file, setUploadOpts }) => {

	const toggleUpdate = () => {

		heading.current.classList.add("heading-open-update");

		setUploadOpts({
			name: file.author,
			path: file.name,
			open: true,
			update: true
		})
	};

	return (
		<div className="file-view">
			<pre className="file-text">{file.text || <center style={{paddingTop: 100}}>no preview available</center>}</pre>
			<div className="file-info">
				<div className="file-title">
					<h2>{file.name || "-"}</h2>
					<pre>Uploaded by: <b>{toTitleCase(file.author || "-")}</b></pre>
					<pre>size: {normalizeByte(file.size || 0)}</pre>
					<pre>created: {parseDate(file.created || 0)}</pre>
					<pre>changed: {parseDate(file.changed || 0)}</pre>
				</div>
				<div className="view-buttons">
					<button className="update-button" onClick={toggleUpdate}>UPDATE</button>
					<a className="download-button" href={file.path}>DOWNLOAD</a>
				</div>
			</div>
		</div>
	);
};

export default FileView;