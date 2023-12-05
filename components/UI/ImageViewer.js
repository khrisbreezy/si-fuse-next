import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {toggleImageViewer} from "../../store/actions/imageViewer";

const ImageViewer = () => {
    const {url, showImage, isVideo} = useSelector(state => state.imageViewer);
    const dispatch = useDispatch();

    return <>
        {
            showImage && <div className={`image-viewer ${showImage && 'show'}`}>
                <div className="close" onClick={() => dispatch(toggleImageViewer())} />
                {isVideo ? <video className={showImage && 'show'} src={url} autoPlay loop controls/> : <img className={showImage && 'show'} src={url} alt=""/>}
            </div>
        }
    </>
}

export default ImageViewer;