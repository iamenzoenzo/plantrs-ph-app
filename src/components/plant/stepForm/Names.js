import React from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export const Names = ({ formData, setForm, navigation }) => {
	const { firstName, description } = formData;

	return (
		<Container maxWidth='xs'>
			<TextField
				label='First Name'
				name='firstName'
				value={firstName}
				onChange={setForm}
				margin='normal'
				variant='outlined'
				autoComplete='off'
				fullWidth
			/>
			<TextField
				label='Decription'
				name='description'
				value={description}
				onChange={setForm}
				margin='normal'
				variant='outlined'
				autoComplete='off'
				fullWidth
			/>
			<div style={{ marginTop: '1rem' }}>
				<Button
					style={{ marginRight: '1rem', background: '#C49000', color: 'white' }}
					variant='contained'
					onClick={() => navigation.previous()}
				>
					Back
				</Button>
				<Button
					style={{ background: '#0E6B0E', color: 'white' }}
					variant='contained'
					onClick={() => navigation.next()}
				>
					Next
				</Button>
			</div>
		</Container>
	);
};
