

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import NoImg from '../images/no-img.png';
// MUI
import Paper from '@material-ui/core/Paper';

// Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';

const styles = theme => ({
    ...theme.spreadThis,
    handle: {
        height: 20,
        backgroundColor: theme.palette.primary.main,
        marginBottom: 7
    },
    fullLine: {
        height: 15,
        width: '90%',
        backgroundColor: 'rgba(0,0,0, 0.4)',
        marginBottom: 10
    },
    halfLine: {
        height: 15,
        width: '50%',
        backgroundColor: 'rgba(0,0,0, 0.4)',
        marginBottom: 10
    },
})


const ProfileSkeleton = (props) => {
    const { classes } = props;
    return (
        <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img src={NoImg} alt="profile" className="profile-image" />
                    </div>
                    <hr/>
                    <div className="profile-details">
                        <div className={classes.handle}/>
                        <hr/>
                        <div className={classes.fullLine}/>
                        <div className={classes.halfLine}/>
                        <hr/>
                        <LocationOn color="primary"/> <span>Location</span>
                        <hr/>
                        <LinkIcon color="primary"/> https://www.plantrs.tech
                        <hr/>
                        <CalendarToday color="primary"/> Date joined
                    </div>
                    
                </div>
            </Paper>
    )
};

ProfileSkeleton.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ProfileSkeleton);
