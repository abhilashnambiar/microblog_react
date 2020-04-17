import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import axios from 'axios'
import PropTypes from 'prop-types'

import Post from '../components/Post'
import Profile from '../components/Profile'

import { connect } from 'react-redux';
import { getPosts } from '../redux/actions/dataActions'

export class home extends Component {
    componentDidMount() {
        this.props.getPosts();
    }
    render() {
        const { posts, loading } = this.props.data;
        let allPosts = !loading ? (
            posts.map(post => <Post key={post.ID} post={post} />)
        ) : (<p>loading...</p>);
        return (
            <Grid container spacing={10}>
                <Grid item sm={8} xs={12}>
                    {allPosts}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile />
                </Grid>
            </Grid>
        )
    }
}

home.propTypes = {
    getPosts: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    data: state.data
})

export default connect(mapStateToProps, {getPosts})(home)
