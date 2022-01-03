import { useState } from 'react';
import Card from './shared/Card';
import Button from './shared/Button';

function FeedbackForm() {
	const [text, setText] = useState('');

	const handleTextChange = (event) => {
		setText(event.target.value);
	};

	return (
		<Card reverse={false}>
			<form>
				<h2>How would you rate your service with us?</h2>
				<h2>{text}</h2>
				{/* @todo rating select component */}
				<div className='input-group'>
					<input
						onChange={handleTextChange}
						type='text'
						placeholder='Write a review'
					/>
					<Button type='submit' version='primary'>
						Send
					</Button>
				</div>
			</form>
		</Card>
	);
}

export default FeedbackForm;
