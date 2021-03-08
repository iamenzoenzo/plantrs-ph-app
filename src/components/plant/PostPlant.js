import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../util/MyButton';

// MUI stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

// Redux stuff
import { connect } from 'react-redux';
import { postPlant, clearErrors } from '../../redux/actions/dataActions';

// Icons
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

const styles = (theme) => ({
    ...theme.spreadThis,
    submitButton:{
        position: 'relative',
        float: 'right',
        marginTop: 10
    },
    progressSpinner:{
        position: 'absolute'
    },
    closeButton:{
        position: 'absolute',
        left: '88%',
        top: '0%'
    }
})

class PostPlant extends Component{
    state = {
        open: false,
        plantName: '',
        phylum: '',
        klass: '',
        urder: '',
        family: '',
        genus: '',
        species: '',
        caption: '',
        errors: {}
    };
    /* static getDerivedStateFromProps(props) {
        if (props.UI.errors) {
          return {
            errors: props.UI.errors
          }
        }
        return null;
    }; */
    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({
                errors: nextProps.UI.errors
            });
        }
        if (!nextProps.UI.errors && !nextProps.UI.loading) {
            this.setState({ plantName: '', open: false, errors: {} });
            this.setState({ caption: '', open: false, errors: {} });
        }
    }
    handleOpen = () => {
        this.setState({ open: true })
    };
    handleClose = () => {
        this.props.clearErrors();
        this.setState({ open: false, errors: {} });
    };
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value})
    };
    /* handleSubmit =(event) => {
        event.preventDefault();
        this.props.postPlant({ plantName: this.state.plantName });

    }; */
    handleSubmit = () => {
        const plantDetails = {
            plantName: this.state.plantName,
            phylum: this.state.phylum,
            klass: this.state.klass,
            urder: this.state.urder,
            family: this.state.family,
            genus: this.state.genus,
            species: this.state.species,
            plantImg: 'https://firebasestorage.googleapis.com/v0/b/plantrs-ph.appspot.com/o/no-plant-img.png?alt=media',
            caption: this.state.caption
        };
        this.props.postPlant(plantDetails);
        this.handleClose();
    };
    render(){
        const { errors } = this.state;
        const { classes, UI: { loading }} = this.props;
        return (
            <Fragment>
                <MyButton onClick={this.handleOpen} tip="Post a Plant!">
                    <AddIcon/>
                </MyButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <MyButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon/>
                    </MyButton>
                    <DialogTitle>Post a new plant</DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <TextField
                                name="plantName"
                                type="text"
                                label="PLANT"
                                placeholder="Name of your plant"
                                error={errors.plantName ? true : false}
                                helperText={errors.plantName}
                                className={classes.textField}
                                onChange={this.handleChange}
                                fullWidth
                                />
                            <TextField
                                name="phylum"
                                type="text"
                                label="PHYLUM"
                                placeholder="Name of your plant"
                                error={errors.phylum ? true : false}
                                helperText={errors.phylum}
                                className={classes.textField}
                                onChange={this.handleChange}
                                fullWidth
                                />
                            <TextField
                                name="klass"
                                type="text"
                                label="CLASS"
                                placeholder="Name of your plant"
                                error={errors.klass ? true : false}
                                helperText={errors.klass}
                                className={classes.textField}
                                onChange={this.handleChange}
                                fullWidth
                                />
                            <TextField
                                name="urder"
                                type="text"
                                label="ORDER"
                                placeholder="Name of your plant"
                                error={errors.urder ? true : false}
                                helperText={errors.urder}
                                className={classes.textField}
                                onChange={this.handleChange}
                                fullWidth
                                />
                            <TextField
                                name="family"
                                type="text"
                                label="FAMILY"
                                placeholder="Name of your plant"
                                error={errors.family ? true : false}
                                helperText={errors.family}
                                className={classes.textField}
                                onChange={this.handleChange}
                                fullWidth
                                />
                            <TextField
                                name="genus"
                                type="text"
                                label="GENUS"
                                placeholder="Name of your plant"
                                error={errors.genus ? true : false}
                                helperText={errors.genus}
                                className={classes.textField}
                                onChange={this.handleChange}
                                fullWidth
                                />
                            <TextField
                                name="species"
                                type="text"
                                label="SPECIES"
                                placeholder="Name of your plant"
                                error={errors.species ? true : false}
                                helperText={errors.species}
                                className={classes.textField}
                                onChange={this.handleChange}
                                fullWidth
                                />
                            
                            <TextField
                                name="caption"
                                type="text"
                                label="DESCRIPTION"
                                multiline
                                rows="3"
                                placeholder="Describe your plant"
                                error={errors.caption ? true : false}
                                helperText={errors.caption}
                                className={classes.textField}
                                onChange={this.handleChange}
                                fullWidth
                                />
                                <Button onClick={this.handleSubmit}  type="submit" variant="contained" color="primary"
                                    className={classes.submitButton} disabled={loading}>
                                        Submit
                                        {loading && (
                                            <CircularProgress size={20} className={classes.progressSpinner}/>
                                        )}
                                    </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

PostPlant.propTypes = {
    postPlant: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    UI: state.UI
})

export default connect(
    mapStateToProps, 
    { postPlant, clearErrors }
)(withStyles(styles)(PostPlant));