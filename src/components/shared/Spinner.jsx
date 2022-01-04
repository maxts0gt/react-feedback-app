import spinner from '../asset/spinner.gif';

function Spinner() {
	return (
		<img
			src={spinner}
			alt='loading...'
			style={{ width: '100px', margin: 'auto', display: 'block' }}
		></img>
	);
}

export default Spinner;
