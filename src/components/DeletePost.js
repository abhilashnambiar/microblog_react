import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import { connect } from 'react-redux';
import { deletePost } from '../redux/actions/dataActions';

const styles = {

}

export class DeletePost extends Component {
    deletePost = () => {
        this.props.deletePost(this.props.postID);
    }
    render() {
        const { classes } = this.props;
        return (
            <Button onClick={this.deletePost} variant="contained" color="secondary">DELETE POST</Button>
        )
    }
}

DeletePost.propTypes = {
    deletePost: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    postID: PropTypes.string.isRequired
}

export default connect(null, { deletePost })(withStyles(styles)(DeletePost))
