import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Plant from '../components/plant/Plant';
import StaticProfile from '../components/profile/StaticProfile';
import Grid from '@material-ui/core/Grid';
import PlantSkeleton from '../util/PlantSkeleton';
import ProfileSkeleton from '../util/ProfileSkeleton';
// Redux
import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';

class user extends Component {
    state = {
        profile: null,
        plantIdParam: null
    };

    componentDidMount(){
        const handle = this.props.match.params.handle;
        const plantId = this.props.match.params.plantId;

        if(plantId) this.setState({ plantIdParam: plantId });

        this.props.getUserData(handle);
        axios.get(`/user/${handle}`)
            .then(res => {
                this.setState({
                    profile: res.data.user
                })
            })
            .catch(err => console.log(err));
    }
    render() {
        const { plants, loading } = this.props.data;
        const { plantIdParam } = this.state;

        const plantsMarkup = loading ? (
            <PlantSkeleton/>
        ) : plants === null ? (
            <p>No plants for this user...</p>
        ) : !plantIdParam ? (
            plants.map(plant => <Plant key={plant.plantId} plant={plant}/>)
        ) : (
            plants.map(plant => {
                if(plant.plantId !== plantIdParam)
                    return <Plant key={plant.plantId} plant={plant}/>
                else return <Plant key={plant.plantId} plant={plant} openDialog/> 
            })
        )

        return (
            <Grid container spacing={2}>
                <Grid item sm={4} xs={12}>
                    {this.state.profile === null ? (
                        <ProfileSkeleton/>
                    ) : (<StaticProfile profile={this.state.profile} />)}
                </Grid>
                <Grid item sm={8} xs={12}>
                    {plantsMarkup}
                </Grid>
            </Grid>
        )
    }
}

user.propTypes = {
    getUserData: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    data: state.data
})

export default connect(mapStateToProps, {getUserData})(user);
