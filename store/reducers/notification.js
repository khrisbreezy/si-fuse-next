import {FETCH_NOTIFICATIONS} from "../actions/notification";

const initialState = {
    notifications: []
}

const notifications = (store = initialState, action) => {
    switch (action.type) {
        case FETCH_NOTIFICATIONS:
            return {...store, notifications: action.notifications};
        default:
            return store;
    }
}

export default notifications;