export const TOGGLE_IMAGE_VIEWER = 'TOGGLE_IMAGE_VIEWER';
export const SHOW_IMAGE_VIEWER = 'SHOW_IMAGE_VIEWER';

export const toggleImageViewer = () => ({type: TOGGLE_IMAGE_VIEWER});

export const showImageViewer = imageUrl => ({type: SHOW_IMAGE_VIEWER, imageUrl, isVideo: false});

export const showVideoViewer = videoUrl => ({type: SHOW_IMAGE_VIEWER, imageUrl: videoUrl, isVideo: true});