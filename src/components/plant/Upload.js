// import React, { useRef, useEffect, useState, useContext } from 'react';
import React, { useRef, useState, useContext } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
// import Alert from '@material-ui/lab/Alert';
import { Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ProgressBar from './ProgressBarLabel';
import { UrlContext } from '../../Context';
import { v4 as uuidv4 } from 'uuid';
import { useDropzone } from 'react-dropzone';
import {
	projectStorage,
	projectFirestore,
	// timestamp,
} from '../firebase/config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const useStyles = makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
}));

const UploadForm = ({ navigation }) => {
	const imgRef = useRef();

	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const [file, setFile] = useState(null);
	const [progress, setProgress] = useState(0);
	const [isImage, setIsImage] = useState(null);
	const { setDetail } = useContext(UrlContext);
	// const [opent, setOpent] = React.useState(false);
	const [setOpent] = React.useState(false);
	const notify = () => toast('Image does not contain any plant');

	// const handleCloset = (event, reason) => {
	// 	if (reason === 'clickaway') {
	// 		return;
	// 	}
	// 	setOpent(false);
	// };

	const { getRootProps, getInputProps } = useDropzone({
		accept: 'image/*',
		onDrop: (acceptedFiles) => {
			setIsImage(null);
			setFile(
				acceptedFiles.map((file) =>
					Object.assign(file, {
						preview: URL.createObjectURL(file),
					})
				)
			);
		},
	});

	const handleClose = () => {
		setOpen(false);
	};
	const handleToggle = () => {
		setOpen(!open);
	};

	const images = () => {
		if (file !== null) {
			return file.map((e) => (
				<div key={e.name}>
					<img
						src={e.preview}
						ref={imgRef}
						style={{ height: '160px', width: 'auto' }}
						alt='preview'
					/>
				</div>
			));
		}
	};
	const fileRejectionItems = () => console.log('hello');
	const onClickHandler = () => {
		if (file !== null && file[0] !== undefined) {
			const storageRef = projectStorage.ref(`${uuidv4()}-${file[0].name}`);
			const collectionRef = projectFirestore.collection('plants');

			storageRef.put(file[0]).on(
				'state_changed',
				(snap) => {
					let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
					setProgress(percentage);
				},
				(err) => {},
				async () => {
					handleToggle();
					const plantImg = await storageRef.getDownloadURL(); // url changed to plantImg
					const createDate = new Date().toISOString();
					const doc = await collectionRef.add({ plantImg, createDate }); // url changed to plantImg
					const data = { imgUrl: plantImg }; // url changed to plantImg
					setProgress(0);

					fetch(
						'https://us-central1-plantrs-ph.cloudfunctions.net/api/callVision',
						{
							method: 'POST', // or 'PUT'
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify(data),
						}
					)
						.then((res) => {
							return res.json();
						})
						.then((data) => {
							// console.log(data);
							if (data.msg === 'success') {
								setIsImage(true);
								setDetail({ plantImg: doc.id, fileImg: file[0] });
								return navigation.next();
							} else if (data.msg === 'not found') {
								notify();
								let image = projectStorage.refFromURL(plantImg); // url changed to plantImg
								image.delete().then((e) => {
									projectFirestore
										.collection('plants')
										.doc(doc.id)
										.delete()
										.then(() => {
											// console.log('doc deleted');
										});

									console.log('deleted');
								});
								setIsImage(false);
								setFile(null);
								setOpent(true);
							}
							handleClose();
						})
						.catch((e) => console.error(e));
				}
			);
		}
	};

	const wrongImage = () => {
		if (isImage === false) {
			return <h4>Please upload a plant Image.</h4>;
		}
	};

	return (
		<>
			{progress !== 0 && <ProgressBar value={progress} />}

			<ToastContainer />
			<>
				<Typography variant='body1' style={{ marginBottom: '1rem' }}>
					Upload a plant image...
				</Typography>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						flexDirection: 'column',
					}}
				>
					<div
						{...getRootProps()}
						style={{
							display: 'flex',
							height: '240px',
							width: '360px',
							border: 'solid',
							flexDirection: 'column',
							justifyContent: 'flex-end',
							alignItems: 'center',
						}}
					>
						<input
							type='file'
							accept='image/*'
							name='file'
							{...getInputProps()}
						/>
						<div>{images()}</div>
						{wrongImage()}

						<p style={{}}>Drop files here</p>
					</div>

					<div>
						<Button
							style={{ margin: '1rem', background: '#0E6B0E', color: 'white' }}
							onClick={() => onClickHandler()}
							disabled={file === null}
						>
							Upload
						</Button>
						<Button
							style={{ margin: '1rem', background: '#C49000', color: 'white' }}
							variant='contained'
							onClick={() => navigation.next()}
							disabled={isImage !== true}
						>
							Next
						</Button>
					</div>
					<Backdrop
						className={classes.backdrop}
						open={open}
						onClick={handleClose}
					>
						<CircularProgress color='inherit' />
					</Backdrop>
				</div>
			</>
			{/* )} */}
		</>
	);
};

export default UploadForm;
