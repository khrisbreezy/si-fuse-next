import React from "react";
import thunkMiddleware from "redux-thunk";
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import auth from "../store/reducers/auth";
import {Provider} from "react-redux";
import toggleLoading from "../store/reducers/loader";
import {composeWithDevTools} from "redux-devtools-extension";
import profile from "../store/reducers/profile";
import notifier from "../store/reducers/notifier";
import imageViewer from "../store/reducers/imageViewer";
import startupProfile from "../store/reducers/startupProfile";
import investorProfile from "../store/reducers/investorProfile";
import notifications from "../store/reducers/notification";
import {addStartups} from "../store/actions/discover";
// import "nprogress/nprogress.css";
import dynamic from "next/dynamic";

const TopProgressBar = dynamic(
    () => {
        return import("../components/TopProgressBar");
    },
    { ssr: false },
);

const reducers = combineReducers({
    auth: auth,
    loader: toggleLoading,
    profile: profile,
    notifier: notifier,
    imageViewer: imageViewer,
    startupProfile: startupProfile,
    investorProfile: investorProfile,
    notifications: notifications,
    addStartups: addStartups,
});

const store = process.env.environment === 'dev' ? createStore(reducers, composeWithDevTools(applyMiddleware(thunkMiddleware))) : createStore(reducers, applyMiddleware(thunkMiddleware));

export default function App({Component, pageProps}) {
    return <Provider store={store}><TopProgressBar /><Component {...pageProps} /></Provider>
}