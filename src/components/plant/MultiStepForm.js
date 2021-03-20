import React from 'react';
import { useForm, useStep } from 'react-hooks-helper';
import { Names } from './stepForm/Names';
import { Address } from './stepForm/Address';
import { Review } from './stepForm/Review';
import { Submit } from './stepForm/Submit';
import Upload from './Upload';
const defaultData = {
	url2: '',
	plantName: '',
	caption: '',
	phylum: '',
	klass: '',
	urder: '',
	family: '',
	genus: '',
	species: '',
};

const steps = [
	{ id: 'upload' },
	{ id: 'names' },
	{ id: 'address' },
	{ id: 'review' },
	{ id: 'submit' },
];

export const MultiStepForm = ({ url }) => {
	const [formData, setForm] = useForm(defaultData);
	const { step, navigation } = useStep({
		steps,
		initialStep: 0,
	});
	// React.useEffect()

	const props = { formData, setForm, navigation };

	switch (step.id) {
		case 'upload':
			return <Upload {...props} />;
		case 'names':
			return <Names {...props} />;
		case 'address':
			return <Address {...props} />;
		case 'review':
			return <Review {...props} />;
		case 'submit':
			return <Submit url={url} {...props} />;
        default:
            // do nothing
	}

	return (
		<div>
			<h1>Multi step form</h1>
		</div>
	);
};