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

// Redux stuffs
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';


const styles = (theme) => ({
    ...theme.spreadThis
});

class login extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        };
    }
    static getDerivedStateFromProps(props) {
        if (props.UI.errors) {
          return {
            errors: props.UI.errors
          }
        }
        return null;
      }
      /* componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
          this.setState({ errors: nextProps.UI.errors });
        }
      } */
      handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(userData, this.props.history);
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
                    Login
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
                        fullWidth
                    />
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
                        fullWidth
                    />
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
                        Login
                        {loading && (
                            <CircularProgress size={30} className={classes.progress}/>
                        )}
                    </Button>
                    <br/>
                    <small>Don't have an account yet? <br/> Ceate an account <Link to="/signup">here</Link></small>
                </form>
                </Card>
                </Grid>
                <Grid item sm/>
            </Grid>
        )
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});

const mapActionsToProps = {
    loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login));
