import { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(true);

	const [feedback, setFeedback] = useState([]);

	const [feedbackEdit, setFeedbackEdit] = useState({
		item: {},
		edit: false,
	});

	useEffect(() => {
		fetchFeedback();
	}, []);

	// Fetch feedback
	const fetchFeedback = async () => {
		const response = await fetch(
			`http://localhost:5000/feedback?_sort=id&_order=desc`
		);
		const data = await response.json();

		setFeedback(data);
		setIsLoading(false);
	};

	// Delete feedback
	const deleteFeedback = (id) => {
		if (window.confirm('Are you sure you want to delete?')) {
			setFeedback(feedback.filter((item) => item.id !== id));
		}
	};

	// Add feedback
	const addFeedback = (newFeedback) => {
		newFeedback.id = uuidv4();
		setFeedback([newFeedback, ...feedback]);
	};

	const updateFeedback = (id, updateItem) => {
		setFeedback(
			feedback.map((item) =>
				item.id === id ? { ...item, ...updateItem } : item
			)
		);
	};

	// Set item to be updated
	const editFeedback = (item) => {
		setFeedbackEdit({
			item,
			edit: true,
		});
	};

	return (
		<FeedbackContext.Provider
			value={{
				isLoading,
				feedback,
				feedbackEdit,
				updateFeedback,
				deleteFeedback,
				addFeedback,
				editFeedback,
			}}
		>
			{children}
		</FeedbackContext.Provider>
	);
};

export default FeedbackContext;
