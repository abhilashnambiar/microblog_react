import { LOADING_UI, CLEAR_ERRORS, POST_POST, SET_ERRORS, LOADING_DATA, SET_POSTS, LIKE, UNLIKE, DELETE_POST } from "../types";
import axios from 'axios';

export const getPosts = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios
      .get('/posts')
      .then((res) => {
        dispatch({
          type: SET_POSTS,
          payload: res.data
        });
      })
      .catch((err) => {
        dispatch({
          type: SET_POSTS,
          payload: []
        });
      });
};

export const postPost = (newPost) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post('/post', newPost).then(res => {
        dispatch({
            type: POST_POST,
            payload: res.data
        });
        dispatch({ type: CLEAR_ERRORS });
    }).catch(err => {
        dispatch({
            type: SET_ERRORS
        });
    })
}

export const likePost = (postID) => (dispatch) => {
  axios.get(`/posts/${postID}/like`).then(res => {
    dispatch({
      type: LIKE,
      payload: res.data
    })
  })
}

export const unlikePost = (postID) => (dispatch) => {
  axios.get(`/posts/${postID}/unlike`).then(res => {
    dispatch({
      type: UNLIKE,
      payload: res.data
    })
  })
}

export const uploadImage = (formData) => (dispatch) => {
  dispatch({ type: LOADING_DATA})
  axios.post('/postimg', formData).then(() => {
      dispatch(getPosts());
  })
}

export const deletePost = (postID) => (dispatch) => {
  axios.delete(`/posts/${postID}/delete`).then(() => {
    dispatch({ type: DELETE_POST, payload: postID})
  })
}