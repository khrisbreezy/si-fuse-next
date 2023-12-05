export const INCREMENT_CURRENT_STATE = 'INCREMENT_CURRENT_STATE';
export const INCREMENT_CURRENT_LEVEL_STATE = 'INCREMENT_CURRENT_LEVEL_STATE';
export const DECREMENT_CURRENT_STATE = 'DECREMENT_CURRENT_STATE';
export const DECREMENT_CURRENT_LEVEL_STATE = 'DECREMENT_CURRENT_LEVEL_STATE';
export const RESET_CURRENT_STATE = 'RESET_CURRENT_STATE';
export const SET_CURRENT_STATE = 'SET_CURRENT_STATE';
export const SET_CURRENT_LEVEL_STATE = 'SET_CURRENT_LEVEL_STATE';
export const SET_COMPANY_PROFILE_IMAGE = 'SET_COMPANY_PROFILE_IMAGE';
export const SET_INVESTOR_IMAGE = 'SET_INVESTOR_IMAGE';
export const SET_EDIT_LEVELS = 'SET_EDIT_LEVELS';

export const incrementCurrentState = () => ({
    type: INCREMENT_CURRENT_STATE
});
export const incrementCurrentLevelState = () => ({
    type: INCREMENT_CURRENT_LEVEL_STATE
});

export const decrementCurrentState = () => ({
    type: DECREMENT_CURRENT_STATE
});

export const decrementCurrentLevelState = () => ({
    type: DECREMENT_CURRENT_LEVEL_STATE
});

export const resetCurrentState = () => ({
    type: RESET_CURRENT_STATE
})

export const setCurrentState = currentState => ({
    type: SET_CURRENT_STATE,
    currentState
})

export const setCurrentLevelState = currentLevelState => ({
    type: SET_CURRENT_LEVEL_STATE,
    currentLevelState
})

export const setCompanyProfileImage = props => ({
    type: SET_COMPANY_PROFILE_IMAGE,
    props
})

export const setInvestorProfileImage = props => ({
    type: SET_INVESTOR_IMAGE,
    props
})

export const setIsEditingLevels = isEditing => ({
    type: SET_EDIT_LEVELS,
    isEditing
})