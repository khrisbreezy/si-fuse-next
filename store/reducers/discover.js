import {ADD_STARTUPS} from "../actions/discover";

const initialState = {
    startups: null
}

export default addStartups = (state = initialState, actions) => {
    switch (actions.type) {
        case ADD_STARTUPS:
            return {...state, startups: actions.startups};
        default:
            return state;
    }
}