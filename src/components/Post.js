import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import {Link} from 'react-router-dom'

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

import dayjs from 'dayjs';
import { connect } from 'react-redux';
import { likePost, unlikePost} from '../redux/actions/dataActions';
import { Button } from '@material-ui/core';
import DeletePost from './DeletePost';

var relativeTime = require('dayjs/plugin/relativeTime')

const styles = {

    margin: {
        margin: '10px'
    },
    card: {
        display: 'flex',
        marginBottom: 20,
        boxShadow: 'none'
    },
    image: {
        marginTop: '28px',
        minWidth: 100,
        height: 100,
        borderRadius: '50%'
    },
    content: {
        padding: 25
    },
    postImage: {
        minwidth: 400,
        height: 400,
        objectFit: 'cover',
        margin: 'auto',
        marginTop: '10px'
    }
    
}

export class Post extends Component {
    likedPost = () => {
        if(this.props.user.likes && this.props.user.likes.find(likes => likes.postID === this.props.post.postID))
            return true;
        else return false;
    }

    likePost = () => {
        this.props.likePost(this.props.post.postID);
    }

    unlikePost = () => {
        this.props.unlikePost(this.props.post.postID);
    }

    render() {
        dayjs.extend(relativeTime)
        const {classes, post : {title, body, time, userImage, user, postID, likeCount, commentCount, imageUrl}, user: {authenticated, credentials}} = this.props
        const likeButton = authenticated && (this.likedPost() ? (
            <Button onClick={this.unlikePost} variant="conatined" color="primary" variant="contained" className={classes.margin}>UNLIKE</Button>
        ) : (
            <Button onClick={this.likePost} variant="conatined" color="primary" variant="contained" className={classes.margin}>LIKE</Button>
        ))

        const deleteButton = authenticated && user === credentials.user ? (
            <DeletePost postID={postID}/>
        ) : null
        return (
            <Card className={classes.card}>
                <CardMedia image={userImage} title="Profile Pic" className={classes.image}/>
                <CardContent className={classes.content}>
                    <Typography variant="h4">{title}</Typography>
                    <Typography variant="h5" color="secondary">@{user}</Typography>
                    <Typography variant="body2" color="textSecondary">{dayjs(time).fromNow()}</Typography>
                    <Typography variant="body1">{body}</Typography>
                    {imageUrl && <img src={imageUrl} className={classes.postImage}/>}
                    <br />{likeButton}
                    {deleteButton}
                    <Typography className={classes.margin} color="secondary">{likeCount} likes</Typography>
                </CardContent>
            </Card>
        )
    }
}

Post.propTypes = {
    likePost: PropTypes.func.isRequired,
    unlikePost: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired

}

const mapStateToProps = state => ({
    user: state.user
})

const mapActionToProps = {
    likePost,
    unlikePost
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Post))
