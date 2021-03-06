import React, { Fragment } from 'react';
import NoImg from '../images/no-img.png';
import NoPlantImg from '../images/no-plant-img.png';
import PropTypes from 'prop-types';
// MUI
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';

import withStyles from '@material-ui/core/styles/withStyles';


const styles = (theme) => ({
    ...theme.spreadThis,
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
        backgroundColor: 'rgba(0,0,0, 0.3)',
    },
    cardContent: {
        width: '100%',
        flexDirection: 'column',
        padding: 25
    },
    handle: {
        width: 60,
        height: 18,
        backgroundColor: theme.palette.primary.main,
        marginBottom: 7
    },
    date: {
        height: 14,
        width: 100,
        backgroundColor: 'rgba(0,0,0, 0.3)',
        marginBottom: 10
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
        backgroundColor: 'rgba(0,0,0, 0.3)',
        marginBottom: 10
    }
});

const PlantSkeleton = (props) => {
    const { classes } = props;

    const content = Array.from({ length: 5}).map((item, index) => (
        <Card className={classes.card} key={index}>
            <CardContent className={classes.content}>
                <Avatar alt="user" src={NoImg} />
                <div className={classes.handle}/>
                <div className={classes.date}/>
            </CardContent>
            <CardMedia className={classes.media} image={NoPlantImg} title="Plant" />

            <CardContent className={classes.cardContent}>
                
                <div className={classes.fullLine}/>
                <div className={classes.fullLine}/>
                <div className={classes.halfLine}/>

            </CardContent>
        </Card>
    ))

    return <Fragment>{content}</Fragment>
};

PlantSkeleton.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PlantSkeleton);