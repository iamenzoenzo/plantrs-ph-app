import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import AppLogo from '../../images/plantrsleaflogo.png';
import AppIcon from '../../images/plantrsicon.png';
import PostPlant from '../plant/PostPlant';
import Notifications from './Notifications';
import Upload from '../plant/PupupWrapper';

// Material UIs
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

class Navbar extends Component {
	render() {
		const { authenticated } = this.props;
		return (
			<AppBar>
				<Toolbar className='nav-container'>
					{authenticated ? (
						<Fragment>
							<Link to='/'>
								<MyButton tip='Home'>
									<picture>
										<source
											media='(max-width: 400px)'
											srcSet={AppIcon}
											alt='plantrslogo'
										/>
										<img src={AppLogo} alt='plantrslogo' />
									</picture>
								</MyButton>
							</Link>
							{/* <PostPlant /> */}
							<Upload />
							<Notifications />
						</Fragment>
					) : (
						<Fragment>
							<Button color='inherit' component={Link} to='/'>
								<picture>
									<source
										media='(max-width: 400px)'
										srcSet={AppIcon}
										alt='plantrslogo'
									/>
									<img src={AppLogo} alt='plantrslogo' />
								</picture>
							</Button>
							<Button color='inherit' component={Link} to='/login'>
								Login
							</Button>
						</Fragment>
					)}
				</Toolbar>
			</AppBar>
		);
	}
}

Navbar.propTypes = {
	authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
	authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(Navbar);
