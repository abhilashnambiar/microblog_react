import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED, LOADING_USER } from '../types';
import axios from 'axios';

const setAuthorizationHeader = (token) => {
    const vaSToken = `Bearer ${token}`;
    localStorage.setItem('vaSToken', vaSToken);
    axios.defaults.headers.common['Authorization'] = vaSToken;
};

export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post('/login', userData).then(res => {
        setAuthorizationHeader(res.data.token);
        dispatch(getUserData());
        dispatch({ type: CLEAR_ERRORS });
        history.push('/');
    }).catch((err) => {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        });
    });
};

export const signupUser = (newUserData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post('/signup', newUserData).then(res => {
        setAuthorizationHeader(res.data.token);
        dispatch(getUserData());
        dispatch({ type: CLEAR_ERRORS });
        history.push('/');
    }).catch((err) => {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        });
    });
};

export const editUserDetails = (userDetails) => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios.post('/user', userDetails).then(() => {
        dispatch(getUserData());
    })
}


export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('vaSToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: SET_UNAUTHENTICATED });
}

export const getUserData = () => (dispatch) => {
    dispatch({ type: LOADING_USER })
    axios.get('/user').then(res => {
        dispatch({
            type: SET_USER,
            payload: res.data
        });
    })
}

export const uploadImage = (formData) => (dispatch) => {
    dispatch({ type: LOADING_USER})
    axios.post('/user/image', formData).then(() => {
        dispatch(getUserData());
    })
}