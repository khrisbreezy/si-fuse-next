import {LOGIN, LOGOUT, STORE_USER} from "../actions/auth";
import Cookies from 'js-cookie';

const token = Cookies.get('token'), user = Cookies.get('user');

const initialState = {
    loggedIn: !!token && !!user,
    user: user || null,
    token: token || null
};

const auth = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            const {user, token} = action.data;

            return {
                ...state,
                user,
                token,
                loggedIn: true
            }
        case LOGOUT:
            return {
                ...state,
                user: null,
                token: null,
                loggedIn: false
            }
        case STORE_USER:
            return {
                ...state,
                user: action.user
            }
        default:
            return state;
    }
}

export default auth;