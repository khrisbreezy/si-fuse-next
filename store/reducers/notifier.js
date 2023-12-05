import {SHOW_NOTIFIER, showNotifier, TOGGLE_NOTIFIER} from "../actions/notifier";

const initialState = {
    showNotifier: false,
    message: 'Success',
    type: 'success'
}

const notifier = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_NOTIFIER:
            return {...state, showNotifier: !state.showNotifier}
        case SHOW_NOTIFIER:
            return {...state, showNotifier: !state.showNotifier, message: action.data.message, type: action.data.type}
        default:
            return state;
    }
}

export default notifier;