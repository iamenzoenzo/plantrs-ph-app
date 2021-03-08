import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import DeletePlant from './DeletePlant';
import PlantDialog from './PlantDialog';
import LikeButton from './LikeButton';
// Material UIs
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { lightGreen } from '@material-ui/core/colors';

// Icons
import ChatIcon from '@material-ui/icons/Chat';


// Redux stuff
import { connect } from 'react-redux';



const styles = {
    card: {
        position: 'relative',
        marginBottom: 20,
    },
    content: {
        padding: 20,
        objectFit: 'cover',
        minWidth: 400,
    },
    media: {
        maxWidth: '100%',
        height: 300,
        paddingTop: '0%', // 16:9
    },
    avatar: {
        backgroundColor: lightGreen[500],
    },
    collab: {
        fontSize: 13
    }
}

class Plant extends Component {
    
    render() {
        dayjs.extend(relativeTime)
        const { 
                classes, 
                plant : { 
                    caption, 
                    createDate, 
                    userImage, 
                    userHandle, 
                    plantId, 
                    plantName, 
                    plantImg, 
                    likeCount, 
                    commentCount 
                },
                user: {
                    authenticated, credentials: { handle } // TO DO replace with { handle, role }
                } 
            } = this.props;
        
        const deleteButton = 
        authenticated && userHandle === handle ? ( // TODO include OR for role = moderator
            <DeletePlant plantId={plantId} />
        ) : null;
        return (
            <Card className={classes.card}>
                <CardContent className={classes.content}>
                    <Avatar alt={userHandle} src={userImage} />
                    {deleteButton}
                    <Typography
                         variant="body2" 
                         component={Link} 
                         to={`/users/${userHandle}`} 
                         color="primary">{userHandle}
                    </Typography>
                    
                    <Typography variant="body2" color="textSecondary" component="p">{dayjs(createDate).fromNow()}</Typography>
                </CardContent>
                <CardMedia className={classes.media} image={plantImg} title={plantName} />
                
                <CardContent className={classes.content}>
                    
                    <Typography variant="h5">{plantName}</Typography>
                    
                    <Typography variant="body2" color="textSecondary" component="p">{caption}</Typography>

                    <LikeButton plantId={plantId}/>
                    <span className={classes.collab}>{likeCount} Likes</span>
                    <MyButton tip="Comments">
                        <ChatIcon color="primary"/>
                    </MyButton>
                    <span className={classes.collab}>{commentCount} Comments</span>
                    <PlantDialog plantId={plantId} userHandle={userHandle} openDialog={this.props.openDialog}/>
                </CardContent>

            </Card>
        );
    }
}

Plant.propTypes = {
    user: PropTypes.object.isRequired,
    plant: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    openDialog: PropTypes.bool
}

const mapStateToProps = state => ({
    user: state.user
})


export default connect(
    mapStateToProps
    )(withStyles(styles)(Plant));
