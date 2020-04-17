import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

import DialogActions from '@material-ui/core/DialogActions';

import { connect } from 'react-redux'
import { editUserDetails } from '../redux/actions/userActions'
import {uploadImage} from '../redux/actions/userActions'

const styles = ({
    margin: {
        margin: '10px'
    }

})

export class EditDetails extends Component {
    state = {
        bio: '',
        website: '',
        location: '',
        open: false
    };

    mapUserDetailsToState = (credentials) => {
        this.setState({
            bio: credentials.bio ? credentials.bio: '',
            website: credentials.website ? credentials.website: '',
            location: credentials.location ? credentials.location: ''
        });
    }

    handleOpen = () => {
        this.setState({ open: true })
        mapStateToProps(this.props.credentials);
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    componentDidMount() {
        const { credentials } = this.props;
        this.mapUserDetailsToState(credentials);
    }

    userChange = (event) => {
        this.setState({ [event.target.name]: event.target.value})
    }

    handleSubmit = () => {
        const userDetails = {
            bio: this.state.bio,
            website: this.state.website,
            location: this.state.location
        };
        this.props.editUserDetails(userDetails);
        this.handleClose();
    }

    userImage = (event) => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image', image, image.name);
        this.props.uploadImage(formData);
    }

    userEditPic = () => {
        const fileInput = document.getElementById('imageUpload');
        fileInput.click();
    }

    render() {
        const {classes} = this.props;
        return (
            <Fragment>
                <Button onClick={this.handleOpen} variant="contained" color="primary" className={classes.margin}>EDIT DETAILS</Button>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <DialogTitle>Edit Details</DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField className={classes.margin} name="bio" type="text" label="Bio" multiline rows="3" value={this.state.bio} onChange={this.userChange} fullWidth></TextField>
                            <TextField className={classes.margin} name="website" type="text" label="Webiste" value={this.state.website} onChange={this.userChange} fullWidth></TextField>
                            <TextField className={classes.margin} name="location" type="text" label="Location" value={this.state.location} onChange={this.userChange} fullWidth></TextField>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button className={classes.margin} onClick={this.handleClose} variant="contained" color="primary">CANCEL</Button>
                        <Button className={classes.margin} onClick={this.handleSubmit} variant="contained" color="primary">SAVE</Button>
                        <input type="file" id="imageUpload" onChange={this.userImage} hidden="hidden"/>
                        <Button className={classes.margin} onClick={this.userEditPic} variant="contained" color="primary">CHANGE DISPLAY PIC</Button>
                     </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

EditDetails.propTypes = {
    uploadImage: PropTypes.func.isRequired,
    editUserDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    credentials: state.user.credentials
})


export default connect(mapStateToProps, { editUserDetails, uploadImage })(withStyles(styles)(EditDetails));
