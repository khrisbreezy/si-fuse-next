import React from "react";
import {useSelector} from "react-redux";

const Notifier = () => {
    const {showNotifier, type, message} = useSelector(state => state.notifier);

    return <div className={`notification ${showNotifier ? 'show' : ''} ${type}`}>
        <span>{message}</span>
    </div>
}

export default Notifier;