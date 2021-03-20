import React from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetail from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import ListItemText from '@material-ui/core/ListItemText';

import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

export const Review = ({ formData, navigation }) => {
	const { go } = navigation;
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

	return (
		<Container maxWidth='sm'>
			<h3>Review</h3>
			<RenderAccordion
				summary='Names'
				go={go}
				details={[{ 'Plant name': plantName }, { Caption: caption }]}
			/>
			<RenderAccordion
				summary='Details'
				go={go}
				details={[
					{ Phylum: phylum },
					{ Class: klass },
					{ Order: urder },
					{ Family: family },
					{ Genus: genus },
					{ Species: species },
				]}
			/>

			<Button
				color='primary'
				variant='contained'
				style={{ marginTop: '1.5rem' }}
				onClick={() => go('submit')}
			>
				Submit
			</Button>
		</Container>
	);
};

export const RenderAccordion = ({ summary, details, go }) => (
	<Accordion>
		<AccordionSummary expandIcon={<ExpandMoreIcon />}>
			{summary}
		</AccordionSummary>
		<AccordionDetail>
			<div>
				{details.map((data, index) => {
					const objKey = Object.keys(data)[0];
					const objValue = data[Object.keys(data)[0]];

					return (
						<ListItemText key={index}>{`${objKey}: ${objValue}`}</ListItemText>
					);
				})}
				<IconButton
					component='span'
					style={{ background: '#0E6B0E', color: 'white' }}
					onClick={() => go(`${summary.toLowerCase()}`)}
				>
					<EditIcon />
				</IconButton>
			</div>
		</AccordionDetail>
	</Accordion>
);