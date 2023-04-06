import { useState, useRef } from 'react';

import Heading from './components/Heading';
import Content from './components/Content';

const App = () => {

	const [uploadOpts, setUploadOpts] = useState({
		name: '', 
		path: '',
		open: false, 
		update: false
	});
	
	const [searchText, setSearchText] = useState('');
	const heading = useRef(null);

	return (<>
		<Heading heading={heading} setSearchText={setSearchText} uploadOpts={uploadOpts} setUploadOpts={setUploadOpts} />
		<Content heading={heading} searchText={searchText} setUploadOpts={setUploadOpts} />
	</>);
}

export default App;
