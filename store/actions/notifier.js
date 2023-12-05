export const TOGGLE_NOTIFIER = 'TOGGLE_NOTIFIER';
export const SHOW_NOTIFIER = 'SHOW_NOTIFIER';

export const toggleNotifier = () => {
    return {
        type: TOGGLE_NOTIFIER
    }
}

export const showNotifier = (message, type = 'success') => {
    return async dispatch => {
        setTimeout(() => dispatch(toggleNotifier()), 6000);
        dispatch(dispatchNotifier(message, type));
    }
}

export const dispatchNotifier = (message, type) => ({type: SHOW_NOTIFIER, data: {message, type}});