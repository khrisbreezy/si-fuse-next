import {SET_STARTUP_DATA} from "../actions/startupProfile";

const initialState = {
    startup: null,
}

const startupProfile = (state = initialState, action) => {
    switch (action.type) {
        case SET_STARTUP_DATA:
            return {...state, startup: action.startup};
        default:
            return state;
    }
}

export default startupProfile;