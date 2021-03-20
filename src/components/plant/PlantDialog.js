import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../util/MyButton';
import dayjs from 'dayjs';
import LikeButton from './LikeButton';
import Comments from './Comments';
import CommentForm from './CommentForm';
import { Link } from 'react-router-dom';
// MUI 
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// Icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';
// Redux stuff
import { connect } from 'react-redux';
import { getPlant, clearErrors } from '../../redux/actions/dataActions';


const styles = (theme) => ({
    ...theme.spreadThis,
    profileImage: {
        maxWidth: 50,
        height: 50,
        borderRadius: '50%',
        objectFit: 'cover'
    },
    plantImage: {
        maxWidth: '100%',
        height: 300,
        borderRadius: '5%',
        objectFit: 'cover'
    },
    dialogContent: {
        padding: 20
    },
    closeButton: {
        position: 'absolute',
        right: '0%'
    },
    expandButton: {
        position: 'absolute',
        right: '0%'
    },
    spinnerDiv: {
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50
    },
    collab: {
        fontSize: 13
    }
})

class PlantDialog extends Component{
    state = {
        open: false,
        oldPath: '',
        newPath: ''
    };
    componentDidMount(){
        if(this.props.openDialog){
            this.handleOpen();
        }
    };
    handleOpen = () => {
        let oldPath = window.location.pathname;

        const { userHandle, plantId } = this.props;
        const newPath = `/users/${userHandle}/plant/${plantId}`;

        if (oldPath === newPath) oldPath = `/users/${userHandle}`;

        window.history.pushState(null, null, newPath);

        this.setState({ open: true, oldPath, newPath });
        this.props.getPlant(this.props.plantId);
    };
    handleClose = () => {
        window.history.pushState(null, null, this.state.oldPath);
        this.setState({ open: false });
        this.props.clearErrors();
    };
    render(){
        const { 
            classes, 
            plant: { 
                plantId, 
                plantName, 
                createDate,
                kingdom, 
                phylum, 
                klass, 
                family, 
                urder, 
                genus, 
                species, 
                plantImg, 
                caption, 
                userHandle, 
                userImage, 
                likeCount, 
                commentCount,
                comments 
            }, 
            UI: { loading } 
        } = this.props;

        const dialogMarkup = loading ? (
            <div className={classes.spinnerDiv} >
                <CircularProgress size={150} thickness={2} />
            </div>
        ) : (
            <Grid container spacing={2}>
                <Grid item sm={12}>
                    <img src={plantImg} alt={plantName} className={classes.plantImage}/>
                </Grid>
                <Grid item sm={12}>
                    <hr className={classes.invisibleSeparator}/>
                    <Typography variant="h5">
                        {plantName}
                    </Typography>
                    <Typography variant="body1">
                        {caption}
                    </Typography>
                    <hr className={classes.visibleSeparator}/>
                    <Typography variant="body2">
                        <strong>Scientific Classification</strong>
                    </Typography>
                    <Typography variant="body2">
                        Kingdom: {kingdom}
                    </Typography>
                    <Typography variant="body2">
                        Phylum: {phylum}
                    </Typography>
                    <Typography variant="body2">
                        Class: {klass}
                    </Typography>
                    <Typography variant="body2">
                        Family: {family}
                    </Typography>
                    <Typography variant="body2">
                        Order: {urder}
                    </Typography>
                    <Typography variant="body2">
                        Genus: {genus}
                    </Typography>
                    <Typography variant="body2">
                        Species: {species}
                    </Typography>
                    <hr className={classes.visibleSeparator}/>
                    <LikeButton plantId={plantId}/>
                    <span className={classes.collab}>{likeCount} Likes</span>
                    <MyButton tip="Comments">
                        <ChatIcon color="primary"/>
                    </MyButton>
                    <span className={classes.collab}>{commentCount} Comments</span>
                </Grid>
                <CommentForm plantId={plantId} />
                <Comments comments={comments}/>
            </Grid>
        )

        return (
            <Fragment>
                <MyButton onClick={this.handleOpen} tip="Expand plant" tipClassName={classes.expandButton}>
                    <UnfoldMore color="primary"/>
                </MyButton>
                <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                fullWidth
                maxWidth="sm"
                >
                    <MyButton
                        tip="Close"
                        onClick={this.handleClose}
                        tipClassName={classes.closeButton}
                    >
                        <CloseIcon/>
                    </MyButton>
                    <DialogTitle >
                    <img src={userImage} alt={userHandle} className={classes.profileImage}/>
                        <Typography
                            component={Link}
                            color="primary"
                            variant="h5"
                            to={`/users/${userHandle}`}
                        >
                            @{userHandle}
                        </Typography>
                        <hr className={classes.invisibleSeparator}/>
                        <Typography variant="body2" color="textSecondary">
                            {dayjs(createDate).fromNow()}
                        </Typography>
                    </DialogTitle>
                    
                    <DialogContent className={classes.dialogContent}>
                        {dialogMarkup}
                    </DialogContent>
                </Dialog>
            </Fragment>

        )
    }

};

PlantDialog.propTypes = {
    clearErrors: PropTypes.func.isRequired,
    getPlant: PropTypes.func.isRequired,
    plantId: PropTypes.string.isRequired,
    userHandle: PropTypes.string,
    plant: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    plant: state.data.plant,
    UI: state.UI
});

const mapActionsToProps = {
    getPlant,
    clearErrors
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(PlantDialog))