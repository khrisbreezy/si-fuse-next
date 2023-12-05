import {STORE_INVESTOR_PROFILE} from "../actions/investorProfile";

const initialState = {
    investorProfile: null
}

const investorProfile = (state = initialState, action) => {
    switch (action.type) {
        case STORE_INVESTOR_PROFILE:
            return {...state, investorProfile: action.investorProfile}
        default:
            return state;
    }
}

export default investorProfile;