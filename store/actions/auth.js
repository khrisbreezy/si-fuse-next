import axiosInstance from "../../config/axios";
import {loader} from "./loader";
import Cookies from 'js-cookie';
import {showNotifier} from "./notifier";

export const LOGIN = 'LOGIN';
export const STORE_AUTH = 'STORE_AUTH';
export const STORE_USER = 'STORE_USER';
export const LOGOUT = 'LOGOUT';

export const loginAsync = data => {

    return async dispatch => {
        dispatch(loader());
        try {
            const {data: {status_code, token, user}} = await axiosInstance.post('login', data);
            dispatch(loader());

            if (status_code === 200) {
                dispatch(storeAuth({token, user}));
            }
        } catch (e) {
            dispatch(showNotifier(e.response.data.message, 'danger'));
            dispatch(loader());
            throw new Error(e.response.data.message);
        }
    }
}

export const logout = () => {
    Cookies.remove('token');
    Cookies.remove('user');
    return {
        type: LOGOUT
    }
}

export const storeAuth = data => {
    Cookies.set('token', data.token);
    Cookies.set('user', JSON.stringify(data.user));

    return {
        type: LOGIN,
        data
    }
};

export const storeUser = user => {
    Cookies.set('user', JSON.stringify(user));

    return {
        type: STORE_USER,
        user
    }
}