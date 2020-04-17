import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

import { connect } from 'react-redux';
import { postPost, uploadImage } from '../redux/actions/dataActions';

const styles = {
    margin: {
        margin: '10px'
    },
    progress: {
        position: 'absolute'
    }
}

class PostPost extends Component{
    state = {
        open: false,
        body: '',
        errors: {}
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
          this.setState({
            errors: nextProps.UI.errors
          });
        }
        if (!nextProps.UI.errors && !nextProps.UI.loading) {
          this.setState({ body: '', title: '', open: false, errors: {} });
        }
    }

    userOpen = () => {
        this.setState({ open: true })
    }
    userClose = () => {
        this.setState({ open: false })
    }

    userChange = (event) => {
        this.setState({ [event.target.name]: event.target.value})
    }

    userSubmit = (event) => {
        event.preventDefault();
        this.props.postPost({ title: this.state.title, body: this.state.body })
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
        const { errors } = this.state;
        const { classes, UI: {loading}} = this.props;
        return (
            <Fragment>
                <Button color="inherit" onClick={this.userOpen}>POST</Button>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                <DialogTitle>New Post</DialogTitle>
                <DialogContent>
                    <form onSubmit={this.userSubmit}>
                        <TextField className={classes.margin} name="title" type="text" label="Post Title" errors={errors.body ? true : false} helperText={errors.title} onChange={this.userChange} fullWidth/>
                        <TextField className={classes.margin} name="body" type="text" multiline rows="3" label="Post Content" errors={errors.body ? true : false} helperText={errors.body} onChange={this.userChange} fullWidth/>
                        <Button className={classes.margin} type="submit" variant="contained" color="primary" disabled={loading}>POST
                            {loading && (<CircularProgress size={30} className={classes.progress} />)}
                        </Button>
                        <Button className={classes.margin} variant="contained" color="primary" onClick={this.userClose}>CANCEL</Button>
                        <input type="file" id="imageUpload" onChange={this.userImage} hidden="hidden"/>
                        <Button className={classes.margin} onClick={this.userEditPic} variant="contained" color="primary">POST IMAGE</Button>
                    </form> 
                    
                </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

PostPost.protoTypes = {
    postPost: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    uploadImage: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    UI: state.UI
})

export default connect(mapStateToProps, { postPost, uploadImage })(withStyles(styles)(PostPost))