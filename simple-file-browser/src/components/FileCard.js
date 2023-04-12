import '../styles/FileCard.css';

export const parseDate = (date) => new Date(date * 1000).toLocaleString();
export const toTitleCase = (s) => s?.split(' ').map((t) => t.charAt(0).toUpperCase() + t.slice(1)).join(' ');
export const normalizeByte = (size) => {
	if (size >= 1000000000)
		return `${(size / 1000000000).toPrecision(2)} GB`;
	if (size >= 1000000)
		return `${(size / 1000000).toPrecision(2)} MB`;
	if (size >= 1000)
		return `${(size / 1000).toPrecision(2)} KB`;
	return `${size} B`
};

const FileCard = ({ file, setFile }) => {
	return (
		<div className="file-card" onClick={() => { setFile(file); }}>
			<h4>{file.name}</h4>
			<div className="file-card-info">
				<pre>{toTitleCase(file.author)}</pre>
				<pre>
					{normalizeByte(file.size)}<b> - </b>
					{parseDate(file.changed)}
				</pre>
			</div>
		</div>
	);
};

export default FileCard;