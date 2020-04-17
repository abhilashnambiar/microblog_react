import { SET_AUTHENTICATED, SET_USER, SET_UNAUTHENTICATED, LOADING_USER, LIKE, UNLIKE } from '../types';

const initialState = {
    authenticated: false,
    loading: false,
    credentials: {},
    likes: [],
    notifications: []
};

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            };
        case SET_UNAUTHENTICATED:
            return initialState;
        case SET_USER:
            return {
                authenticated: true,
                loading: false,
                ...action.payload
            };
        case LOADING_USER:
            return {
                ...state,
                loading: true
            }
        case LIKE:
            return {
                ...state,
                likes: [
                    ...state.likes,
                    {
                        user: state.credentials.user,
                        postID: action.payload.postID
                    }
                ]
            }
        case UNLIKE:
            return {
                ...state,
                likes: state.likes.filter((like) => like.postID !== action.payload.postID)
            }
        default:
            return state;
    }
}