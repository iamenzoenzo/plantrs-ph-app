import React, { useContext } from 'react';
import Container from '@material-ui/core/Container';
import { UrlContext } from '../../../Context';

import { projectFirestore } from '../../firebase/config';

export const Submit = ({ url, formData }) => {
	const {
		firstName,
		description,
		phylum,
		pclass,
		order,
		family,
		genus,
		species,
	} = formData;
	const { detail } = useContext(UrlContext);

	React.useEffect(() => {
		projectFirestore.collection('images').doc(`${detail.urlImg}`).update({
			firstName,
			description,
			phylum,
			pclass,
			order,
			family,
			genus,
			species,
		});
	}, []);
	return (
		<Container maxWidth='sm' style={{ marginTop: '4rem' }}>
			<h3>Thank you for submitting, we will be in touch!</h3>
		</Container>
	);
};
