import { useState } from 'react';
import RatingSelect from './RatingSelect';
import Card from './shared/Card';
import Button from './shared/Button';

function FeedbackForm({ handleAdd }) {
	const [text, setText] = useState('');
	const [rating, setRating] = useState(10);
	const [message, setMessage] = useState('Hello');
	const [disabled, setDisabled] = useState(true);

	const handleTextChange = (event) => {
		if (text === '') {
			setDisabled(true);
			setMessage(null);
		} else if (text !== '' && text.trim().length <= 10) {
			setMessage('Text must be at least 10 characters long');
			setDisabled(true);
		} else {
			setMessage(null);
			setDisabled(false);
		}

		setText(event.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (text.trim().length > 10) {
			const newFeedback = {
				text,
				rating,
			};

			handleAdd(newFeedback);
			setText('');
		}
	};

	return (
		<Card reverse={false}>
			<form onSubmit={handleSubmit}>
				<h2>How would you rate your service with us?</h2>
				<RatingSelect select={(rating) => setRating(rating)} />
				<div className='input-group'>
					<input
						onChange={handleTextChange}
						type='text'
						placeholder='Write a review'
					/>
					<Button
						type='submit'
						isDisabled={disabled}
						version='primary'
					>
						Send
					</Button>
				</div>
				{message && <div className='message'>{message}</div>}
			</form>
		</Card>
	);
}

export default FeedbackForm;
