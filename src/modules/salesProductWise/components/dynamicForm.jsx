import React, { useState, useCallback } from 'react';

const DynamicForm = ({ schema = [] }) => {
	// Initialize state with an empty object if schema is undefined or empty
	const [formData, setFormData] = useState(
		schema.reduce((acc, field) => {
			acc[field.name] = '';
			return acc;
		}, {})
	);

	const handleChange = useCallback((event) => {
		const { name, value } = event.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	}, []);

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log('Form product data:', formData);
	};

	return (
		<form onSubmit={handleSubmit}>
			{schema.map((field) => (
				<div key={field.name}>
					<label>
						{field.label}:
						<input
							type={field.type}
							name={field.name}
							value={formData[field.name]}
							onChange={handleChange}
						/>
					</label>
				</div>
			))}
			<button type='submit'>Submit</button>
		</form>
	);
};

const App = () => {
	// Ensure the schema is correctly defined and passed to the DynamicForm component
	const formSchema = [
		{ name: 'firstName', label: 'First Name', type: 'text' },
		{ name: 'lastName', label: 'Last Name', type: 'text' },
		{ name: 'email', label: 'Email', type: 'email' },
		{ name: 'password', label: 'Password', type: 'password' },
		{ name: 'age', label: 'Age', type: 'number' },
		{ name: 'firstName', label: 'First Name', type: 'text' },
		{ name: 'lastName', label: 'Last Name', type: 'text' },
		{ name: 'email', label: 'Email', type: 'email' },
		{ name: 'password', label: 'Password', type: 'password' },
		{ name: 'age', label: 'Age', type: 'number' },
		{ name: 'firstName', label: 'First Name', type: 'text' },
		{ name: 'lastName', label: 'Last Name', type: 'text' },
		{ name: 'email', label: 'Email', type: 'email' },
		{ name: 'password', label: 'Password', type: 'password' },
		{ name: 'age', label: 'Age', type: 'number' },
		{ name: 'firstName', label: 'First Name', type: 'text' },
		{ name: 'lastName', label: 'Last Name', type: 'text' },
		{ name: 'email', label: 'Email', type: 'email' },
		{ name: 'password', label: 'Password', type: 'password' },
		{ name: 'age', label: 'Age', type: 'number' },
		{ name: 'firstName', label: 'First Name', type: 'text' },
		{ name: 'lastName', label: 'Last Name', type: 'text' },
		{ name: 'email', label: 'Email', type: 'email' },
		{ name: 'password', label: 'Password', type: 'password' },
		{ name: 'age', label: 'Age', type: 'number' },
		{ name: 'firstName', label: 'First Name', type: 'text' },
		{ name: 'lastName', label: 'Last Name', type: 'text' },
		{ name: 'email', label: 'Email', type: 'email' },
		{ name: 'password', label: 'Password', type: 'password' },
		{ name: 'age', label: 'Age', type: 'number' },
		{ name: 'firstName', label: 'First Name', type: 'text' },
		{ name: 'lastName', label: 'Last Name', type: 'text' },
		{ name: 'email', label: 'Email', type: 'email' },
		{ name: 'password', label: 'Password', type: 'password' },
		{ name: 'age', label: 'Age', type: 'number' },
		{ name: 'firstName', label: 'First Name', type: 'text' },
		{ name: 'lastName', label: 'Last Name', type: 'text' },
		{ name: 'email', label: 'Email', type: 'email' },
		{ name: 'password', label: 'Password', type: 'password' },
		{ name: 'age', label: 'Age', type: 'number' },
	];

	return (
		<div>
			<h1>Dynamic Form</h1>
			<DynamicForm schema={formSchema} />
		</div>
	);
};

export default App;
