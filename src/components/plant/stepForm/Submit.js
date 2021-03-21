import React, { useContext } from 'react';
import Container from '@material-ui/core/Container';
import { UrlContext } from '../../../Context';

import { projectFirestore } from '../../firebase/config';

//Redux
import { connect } from 'react-redux';

const Submit = ({ url, formData, user }) => {
	const {
		plantName,
		caption,
		phylum,
		klass,
		urder,
		family,
		genus,
		species,
	} = formData;
	const { detail } = useContext(UrlContext);

	React.useEffect(() => {
		projectFirestore.collection('plants').doc(`${detail.plantImg}`).update({
			createDate: new Date().toISOString(),
			kingdom: 'Plantae',
			userHandle: user.credentials.handle,
			userImage: user.credentials.userImage,
			plantName,
			caption,
			phylum,
			klass,
			urder,
			family,
			genus,
			species,
			likeCount: 0,
			commentCount: 0,
		});
	}, 
	// eslint-disable-next-line
	[]); 
	return (
		<Container maxWidth='sm' style={{ marginTop: '4rem' }}>
			<h3>Thank you for posting a new plant!</h3>
		</Container>
	);
};

const mapStateToProps = (state) => ({
	user: state.user,
});

export default connect(mapStateToProps, null)(Submit);
