import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import AppLogo from '../images/plantrslogo.png';
import { Link } from 'react-router-dom';

// Material UIs
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

// Redux stuff
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions';

const styles = (theme) => ({
    ...theme.spreadThis
});

class signup extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            handle: '',
            errors: {}
        }
    }
    static getDerivedStateFromProps(props) {
        if (props.UI.errors) {
          return {
            errors: props.UI.errors
          }
        }
        return null;
      }
    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        };
        this.props.signupUser(newUserData, this.props.history);
    };
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        const { classes, UI: { loading } } = this.props;
        const { errors } = this.state;
        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                <Card className={classes.card}>
                <img src={AppLogo} alt="plantrses/p" claslogoplantrslogoe={classes.logo} />
                <Typography variant="h3" className={classes.pageTitle}>
                    Signup
                </Typography>
                <form noValidate onSubmit={this.handleSubmit}>
                    <TextField 
                        id="email" 
                        name="email" 
                        type="email" 
                        label="Email" 
                        className={classes.textField} 
                        helperText={errors.email} // displays the error below the email field
                        error={errors.email ? true : false} // checks whether there's error or not
                        value={this.state.email} 
                        onChange={this.handleChange} 
                        fullWidth/>
                    <TextField 
                        id="password" 
                        name="password" 
                        type="password" 
                        label="Password" 
                        className={classes.textField} 
                        helperText={errors.password} // displays the error below the password field
                        error={errors.password ? true : false} // checks whether there's error or not
                        value={this.state.password} 
                        onChange={this.handleChange} 
                        fullWidth/>
                    <TextField 
                        id="confirmPassword" 
                        name="confirmPassword" 
                        type="password" 
                        label="Confirm Password" 
                        className={classes.textField} 
                        helperText={errors.confirmPassword} // displays the error below the confirmPassword field
                        error={errors.confirmPassword ? true : false} // checks whether there's error or not
                        value={this.state.confirmPassword} 
                        onChange={this.handleChange} 
                        fullWidth/>
                    <TextField 
                        id="handle" 
                        name="handle" 
                        type="text" 
                        label="Handle" 
                        className={classes.textField} 
                        helperText={errors.handle} // displays the error below the handle field
                        error={errors.handle ? true : false} // checks whether there's error or not
                        value={this.state.handle} 
                        onChange={this.handleChange} 
                        fullWidth/>
                    {errors.general && (
                        <Typography variant="body2" className={classes.customError}>
                            {errors.general}
                        </Typography>
                    )}
                    <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary" 
                        className={classes.button}
                        disabled={loading}
                    >
                        Signup
                        {loading && (
                            <CircularProgress size={30} className={classes.progress}/>
                        )}
                    </Button>
                    <br/>
                    <small>Already have an account? <br/> Login <Link to="/login">here</Link></small>
                </form>
                </Card>
                </Grid>
                <Grid item sm/>
            </Grid>
        );
    }
}

signup.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})

export default connect(
    mapStateToProps, 
    { signupUser }
)(withStyles(styles)(signup));
