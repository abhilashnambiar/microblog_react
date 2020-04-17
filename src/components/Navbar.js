import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'

import { logoutUser } from '../redux/actions/userActions';
import PostPost from './PostPost';


const styles = {
    logo: {
        marginTop: '10px',
        width: 146,
        height: 63,
        margin: 'auto'
    }
}

export class Navbar extends Component {
    userLogout = () => {
        this.props.logoutUser();
    }



    render() {
        const { classes, authenticated } = this.props
        return (
            <AppBar>
                <img src={require('../images/logo.png')} className={classes.logo}/>
                <Toolbar className="nav-container">
                    {authenticated ? (
                        <Fragment>
                            <PostPost />
                            <Button color="inherit" onClick={this.userLogout}>LOGOUT</Button>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <Button color="inherit" component={Link} to='/login'>Login</Button>
                            <Button color="inherit" component={Link} to='/'>Home</Button>
                            <Button color="inherit" component={Link} to='/signup'>Signup</Button>
                        </Fragment>
                    )}
                    
                </Toolbar>
                
            </AppBar>
        )
    }
}

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired
}

const mapActionsToProps = { logoutUser };

const mapStateToProps = state => ({
    authenticated: state.user.authenticated 
});

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Navbar))
