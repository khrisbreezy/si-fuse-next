import React, {useCallback, useEffect, useState} from "react";
import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../store/actions/auth";
import ToggleSideBar from "../../utils/ToggleSideBar";
import Router from 'next/router';
import {User} from "../../utils/User";
import {showNotifier} from "../../store/actions/notifier";
import SingleNotification from "../notifications/single-notification";
import {setIsEditingLevels} from "../../store/actions/profile";

export default function SideBar({isLoggedIn = false}) {
    const dispatch = useDispatch();

    const notifications = useSelector(state => state.notifications).notifications;
    const [activeLink, setActiveLink] = useState('home');
    const closeSideBarHandler = () => {
        ToggleSideBar();
    }

    useEffect(() => {
        if (process.browser) {
            let activePage = 'home';
            switch (true) {
                case window.location.pathname === '/':
                    activePage = 'home';
                    break;
                case window.location.pathname === '/discover':
                    activePage = 'discover';
                    break;
                case window.location.pathname === '/about-us':
                    activePage = 'about-us';
                    break;
                case window.location.pathname.includes('blog'):
                    activePage = 'blog';
                    break;
                case window.location.pathname.includes('events'):
                    activePage = 'events';
                    break;
                case window.location.pathname === '/contact-us':
                    activePage = 'contact-us';
                    break;
                case window.location.pathname === '/login':
                    activePage = 'login';
                    break;
                case window.location.pathname === '/signup':
                    activePage = 'signup';
                    break;
            }
            setActiveLink(activePage);
        }
    }, []);

    const logoutHandler = () => {
        dispatch(logout());
        dispatch(setIsEditingLevels(false));
        dispatch(showNotifier('Logged Out'));
        Router.push('/');
    }

    const loggedInUser = User();

    return <>
        <div className="sidebar">
            <button onClick={closeSideBarHandler}>
                <img src="/images/icon/cancel.svg" alt=""/>
            </button>
            <ul>
                <li>
                    <Link href="/">
                        <a className={activeLink === 'home' ? 'active' : ''}>Home</a>
                    </Link>
                </li>
                {   
                    loggedInUser && loggedInUser.user_type.user_type === 'Investor'
                        ? <li>
                            <Link href="/discover">
                                <a className={activeLink === 'discover' ? 'active' : ''}>Discover</a>
                            </Link>
                        </li>
                        : null
                }

                <li>
                    <Link href="/about-us">
                        <a className={activeLink === 'about-us' ? 'active' : ''}>About Us</a>
                    </Link>
                </li>

                <li>
                    <Link href="/blog">
                        <a className={activeLink === 'blog' ? 'active' : ''}>Blog</a>
                    </Link>
                </li>

                <li>
                    <Link href="/events">
                        <a className={activeLink === 'events' ? 'active' : ''}>Events</a>
                    </Link>
                </li>

                <li>
                    <Link href="/contact-us">
                        <a className={activeLink === 'contact-us' ? 'active' : ''}>Contact Us</a>
                    </Link>
                </li>

                {
                    !isLoggedIn
                        ? <>
                            <li>
                                <Link href="/login">
                                    <a className={activeLink === 'login' ? 'active' : ''}>Login</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/signup">
                                    <a className={activeLink === 'signup' ? 'active' : ''}>Signup</a>
                                </Link>
                            </li>
                        </>
                        : <li>
                            <a onClick={logoutHandler}>Logout</a>
                        </li>
                }
            </ul>
        </div>
        {
            isLoggedIn
                ? <>
                    <div className="account-container">
                        <ul>
                            <li>
                                <Link href="/profile">
                                    <a><img src="/images/icon/profile-icon.svg" alt=""
                                            className="img-fluid"/> Profile</a>
                                </Link>
                            </li>
                            {
                                loggedInUser && loggedInUser.user_type.user_type === 'Investor'
                                    ? <>
                                        <li>
                                            <Link href="/timeline">
                                                <a><img src="/images/timeline.svg" alt=""
                                                        className="img-fluid"/> My Timeline</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/connections">
                                                <a><img src="/images/icon/connection-icon.svg" alt=""
                                                        className="img-fluid"/> Connections</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/discover">
                                                <a><img src="/images/icon/discover-icon.svg" alt=""
                                                        className="img-fluid"/> Discover</a>
                                            </Link>
                                        </li>
                                    </>
                                    : null
                            }
                            <li>
                                <Link href="/my-events">
                                    <a><img src="/images/icon/calendar-icon.svg" alt=""
                                            className="img-fluid"/> My Events</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/settings">
                                    <a><img src="/images/icon/setting.svg" alt="" className="img-fluid"/> Settings</a>
                                </Link>
                            </li>
                            <li>
                                <a href="#" onClick={logoutHandler}><img src="/images/icon/logout-icon.svg" alt=""
                                                                         className="img-fluid"/> Logout</a>
                            </li>
                        </ul>
                    </div>

                    <div className="notification-container">
                        <h6>Notifications</h6>
                        <ul>
                            {
                                notifications.map((notification, index) => <SingleNotification key={index}
                                                                                               notification={notification}/>)
                            }
                            {
                                notifications.length === 0 && <li>
                                    <p className="head-text"><img src="/images/icon/empty.svg" alt="" /> No Notifications Yet</p>
                                    <p className="msg-text">Your notifications will appear here.</p>
                                </li>
                            }
                        </ul>
                    </div>
                </>
                : null
        }

    </>
}