import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';

// MUI stuff
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

// Icons
import DeleteOutline from '@material-ui/icons/DeleteOutline';

// Redux stuff
import { connect } from 'react-redux';
import { deletePlant } from '../../redux/actions/dataActions';

const styles = {
    deleteButton: {
        position: 'absolute',
        left: '90%',
        top: '2%'
    }
}

class DeletePlant extends Component {
    state = {
        open: false
    };
    handleOpen = () => {
        this.setState({ open: true });
    }
    handleClose = () => {
        this.setState({ open: false });
    }
    deletePlant = () => {
        this.props.deletePlant(this.props.plantId)
        this.setState({ open: false });
    }
    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <MyButton tip="Delete Plant"
                onClick={this.handleOpen}
                btnClassName={classes.deleteButton}
                >
                    <DeleteOutline color="secondary"/>
                </MyButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm"
                    >
                        <DialogTitle>Are you sure you want to delete this plant?</DialogTitle>
                        <DialogContent>Note that this action is irreversible.</DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={this.deletePlant} color="secondary">
                                Delete
                            </Button>
                        </DialogActions>

                    </Dialog>
            </Fragment>
        )
    }
}

DeletePlant.propTypes = {
    deletePlant: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    plantId: PropTypes.string.isRequired
}

export default connect(null, { deletePlant })(withStyles(styles)(DeletePlant));
