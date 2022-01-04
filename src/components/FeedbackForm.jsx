import { useState, useContext, useEffect } from 'react';
import RatingSelect from './RatingSelect';
import Card from './shared/Card';
import Button from './shared/Button';
import FeedbackContext from '../context/FeedbackContext';

function FeedbackForm() {
	const [text, setText] = useState('');
	const [rating, setRating] = useState(10);
	const [message, setMessage] = useState('');
	const [disabled, setDisabled] = useState(true);
	const { addFeedback, feedbackEdit, updateFeedback } =
		useContext(FeedbackContext);

	useEffect(() => {
		if (feedbackEdit.edit === true) {
			setDisabled(false);
			setText(feedbackEdit.item.text);
			setRating(feedbackEdit.item.rating);
		}
	}, [feedbackEdit]);

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

			if (feedbackEdit.edit === true) {
				updateFeedback(feedbackEdit.item.id, newFeedback);
			} else {
				addFeedback(newFeedback);
			}

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
						value={text}
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
