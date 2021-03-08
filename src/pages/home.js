import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

import Plant from '../components/plant/Plant';
import Profile from '../components/profile/Profile';
import PlantSkeleton from '../util/PlantSkeleton';


import { connect } from 'react-redux';
import { getPlants } from '../redux/actions/dataActions';

class home extends Component {
    componentDidMount(){
        this.props.getPlants();
    }
    render() {
        const { plants, loading } = this.props.data;
        let recentPlantsMarkup = !loading ? (
            plants.map((plant) => <Plant key={plant.plantId} plant={plant} />)
        ) : (
            <PlantSkeleton/>
        );
        return (
            <Grid container spacing={2}>
                <Grid item sm={4} xs={12}>
                    <Profile />
                </Grid>
                <Grid item sm={8} xs={12}>
                    {recentPlantsMarkup}
                    
                </Grid>
            </Grid>
        )
    }
}

home.propTypes = {
    getPlants: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    data: state.data
})

export default connect(mapStateToProps, { getPlants })(home);
