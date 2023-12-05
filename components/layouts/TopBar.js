import React from "react";
import Link from "next/link";

export default function TopBar({redBar = false, isLoggedIn = false, whiteAccount = false}) {

    const openSideBarHandler = () => {
        $('.sidebar').toggleClass('active');
    }

    const accountMenuHandler = () => {
        if ($('.notification-container').css('display') === 'block') {
            toggleNotification();
        }
        $('.account-container').toggle();
    }

    const toggleNotification = () => {
        if ($('.account-container').css('display') === 'block') {
            accountMenuHandler();
        }
        $('.notification-container').toggle();
    }

    return <nav className="navbar navbar-expand-lg">
        {
            !isLoggedIn
                ? <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link href="/signup">
                            <a className="nav-link">Signup</a>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link href="/login">
                            <a className="nav-link">Login</a>
                        </Link>
                    </li>
                </ul>
                : (
                    !whiteAccount
                        ? <div className="account-btns">
                            <button onClick={accountMenuHandler} className="menu-btn ">
                                <img src="/images/icon/account.svg" alt="" className="img-fluid"/>
                            </button>
                            <button onClick={toggleNotification} id="notification-toggle" className="menu-btn">
                                <img src="/images/icon/notification-bell.svg" alt="" className="img-fluid"/>
                            </button>
                        </div>
                        : <div className="d-flex account-btns">
                            <button onClick={accountMenuHandler} className="menu-btn active-bar">
                                <img src="/images/icon/account-white.svg" alt="" className="img-fluid d-none d-md-block"/>
                                <img src="/images/icon/account-grey.svg" alt="" className="img-fluid d-block d-md-none"/>
                            </button>
                            <button onClick={toggleNotification} id="notification-toggle" className="menu-btn">
                                <img src="/images/icon/notification-bell-white.svg" alt=""
                                     className="img-fluid d-none d-md-block"/>
                                <img src="/images/icon/notification-bell.svg" alt="" className="img-fluid d-block d-md-none"/>
                            </button>
                        </div>
                )
        }
        <Link href="/">
            <a>
                <img src="/images/logo.png" alt="" className="logo-small-screen"/>
            </a>
        </Link>

        <div className="logo-container">
            <img className="clip" src="/images/clip.png" alt=""/>

            <Link href="/">
                <a className="navbar-brand">
                    <img src="/images/logo.png" alt=""/>
                </a>
            </Link>
        </div>

        <button onClick={openSideBarHandler} className="menu-btn d-block d-md-none">
            <img src="/images/icon/button-red.svg" alt=""/>
        </button>

        <button onClick={openSideBarHandler} className="menu-btn d-none d-md-block">
            {
                redBar
                    ? <img src="/images/icon/button-red.svg" alt=""/>
                    : <img src="/images/icon/button.svg" alt=""/>
            }
        </button>
    </nav>
}