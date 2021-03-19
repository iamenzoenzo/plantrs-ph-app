import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import AddIcon from '@material-ui/icons/Add';
import { Typography } from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { MultiStepForm } from './MultiStepForm';
export default function FormDialog() {
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = (e, reason) => {
		console.log(reason);
		if (reason === 'clickaway' || reason === 'backdropClick') {
			return;
		}
		setOpen(false);
	};

	return (
		<ClickAwayListener onClickAway={(e) => handleClose(e, 'clickaway')}>
			<div>
				<Button
					variant='outlined'
					style={{ color: 'white' }}
					onClick={handleClickOpen}
				>
					<AddIcon />
					{/* Post a plant */}
				</Button>

				<Dialog
					open={open}
					onClose={handleClose}
					aria-labelledby='form-dialog-title'
				>
					<div
						style={{
							display: 'flex',
							margin: '1rem',
							justifyContent: 'space-between',
						}}
					>
						<Typography variant='h5' component='span'>
							Post a Plant
						</Typography>
						<Button
							onClick={handleClose}
							variant='contained'
							style={{ background: '#C49000', color: 'white' }}
						>
							Close
						</Button>
					</div>

					<DialogContent>
						<MultiStepForm url={'help'} />
					</DialogContent>
				</Dialog>
			</div>
		</ClickAwayListener>
	);
}
