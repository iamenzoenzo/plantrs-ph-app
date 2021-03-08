import React, { Component } from 'react';
import MyButton from '../../util/MyButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import { connect } from 'react-redux';

// Redux
import { likePlant, unlikePlant } from '../../redux/actions/dataActions';

export class LikeButton extends Component {
    likedPlant = () => {
        if(this.props.user.likes && 
            this.props.user.likes.find(
                (like) => like.plantId === this.props.plantId
            )
        )
            return true;
        else return false;
    };
    likePlant = () => {
        this.props.likePlant(this.props.plantId);
    };
    unlikePlant = () => {
        this.props.unlikePlant(this.props.plantId);
    };
    render() {
        const { authenticated } = this.props.user;

        const likeButton = !authenticated ? (
            <Link to="/login">
                <MyButton tip="Like">
                    <FavoriteBorder color="primary"/>
                </MyButton>
            </Link>
        ) : (
            this.likedPlant() ? (
                <MyButton tip="Unlike" onClick={this.unlikePlant}>
                    <FavoriteIcon color="primary"/>
                </MyButton>
            ) : (
                <MyButton tip="Like" onClick={this.likePlant}>
                    <FavoriteBorder color="primary"/>
                </MyButton>
            )
        );
        return likeButton;
    }
}

LikeButton.propTypes = {
    user: PropTypes.object.isRequired,
    // planId: PropTypes.string.isRequired,
    likePlant: PropTypes.func.isRequired,
    unlikePlant: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user
});

const mapActionsToProps = {
    likePlant,
    unlikePlant
};

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
