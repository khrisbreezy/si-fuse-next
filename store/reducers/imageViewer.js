import {SHOW_IMAGE_VIEWER, TOGGLE_IMAGE_VIEWER} from "../actions/imageViewer";

const initialState = {
    showImage: false,
    isVideo: false,
    url: ''
};

const imageViewer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_IMAGE_VIEWER:
            return {...state, showImage: !state.showImage};
        case SHOW_IMAGE_VIEWER:
            return {...state, url: action.imageUrl, showImage: true, isVideo: action.isVideo};
        default:
            return state;
    }
}

export default imageViewer;