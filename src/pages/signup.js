import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import axios from 'axios'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress';

import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions';

const styles = {
    form: {
        textAlign: 'center'
    },
    textField: {
        margin: '20px auto'
    },
    Button: {
        margin: '20px auto',
        position: 'relative'
    },
    customError: {
        color: 'red',
        fontSize: '0.8rem'
    },
    progress: {
        position: 'absolute'
    },
    introImg: {
        maxWidth: 500
    }
}

export class signup extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            user: '',
            errors: {}
        };
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.UI.errors) {
            this.setState({ errors: nextProps.UI.errors });
        }
    }

    userSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            user: this.state.user
        };
        this.props.signupUser(newUserData, this.props.history);
    }

    userChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const { classes, UI: { loading } } = this.props;
        const { errors } = this.state;
        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <img src={require('../images/baseline.jpg')} className={classes.introImg}/>
                    <form noValidate onSubmit={this.userSubmit}>
                        <TextField id="email" name="email" type="email" label="Email" className={classes.textField} value={this.state.email} onChange={this.userChange} helperText={errors.email} error={errors.email ? true : false} fullWidth />
                        <TextField id="password" name="password" type="password" label="Password" className={classes.textField} value={this.state.password} onChange={this.userChange} helperText={errors.password} error={errors.password ? true : false} fullWidth />
                        <TextField id="confirmPassword" name="confirmPassword" type="password" label="Confirm Password" className={classes.textField} value={this.state.confirmPassword} onChange={this.userChange} helperText={errors.confirmPassword} error={errors.confirmPassword ? true : false} fullWidth />
                        <TextField id="user" name="user" type="text" label="Username" className={classes.textField} value={this.state.user} onChange={this.userChange} helperText={errors.user} error={errors.user ? true : false} fullWidth />
                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>{errors.general}</Typography>
                        )}
                        <Button disabled={loading} type="submit" variant="contained" color="primary" className={classes.Button}>SIGN UP{loading && (<CircularProgress size={30} color="secondary"  className={classes.progress}/>)}</Button>
                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        )
    }
}

signup.prototypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})

export default connect(mapStateToProps, { signupUser })(withStyles(styles)(signup));
