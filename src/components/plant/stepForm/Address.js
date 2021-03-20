import React from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export const Address = ({ formData, setForm, navigation }) => {
	const { phylum, klass, urder, family, genus, species } = formData;
	return (
		<Container maxWidth='xs'>
			<h3>Scientific Classification</h3>
			<TextField
				label='Phylum'
				name='phylum'
				value={phylum}
				onChange={setForm}
				margin='normal'
				variant='outlined'
				autoComplete='off'
				fullWidth
			/>
			<TextField
				label='Class'
				name='klass'
				value={klass}
				onChange={setForm}
				margin='normal'
				variant='outlined'
				autoComplete='off'
				fullWidth
			/>
            <TextField
				label='Order'
				name='urder'
				value={urder}
				onChange={setForm}
				margin='normal'
				variant='outlined'
				autoComplete='off'
				fullWidth
			/>
			<TextField
				label='Family'
				name='family'
				value={family}
				onChange={setForm}
				margin='normal'
				variant='outlined'
				autoComplete='off'
				fullWidth
			/>
			<TextField
				label='Genus'
				name='genus'
				value={genus}
				onChange={setForm}
				margin='normal'
				variant='outlined'
				autoComplete='off'
				fullWidth
			/>
			<TextField
				label='Species'
				name='species'
				value={species}
				onChange={setForm}
				margin='normal'
				variant='outlined'
				autoComplete='off'
				fullWidth
			/>
			<div style={{ marginTop: '1rem' }}>
				<Button
					variant='contained'
					style={{ marginRight: '1rem', background: '#C49000', color: 'white' }}
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