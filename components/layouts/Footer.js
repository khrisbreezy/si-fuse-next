import Link from "next/link";
import React from "react";
import {User} from "../../utils/User";

export default function Footer() {
    return <footer>
        <div className="footer-content">
            <div className="container">
                <div className="row">
                    <div className="col-md-3 col-6">
                        <h5>About</h5>

                        <ul>
                            <li>
                                <Link href="/about-us">
                                    <a> About us </a>
                                </Link>
                            </li>

                            <li>
                                <Link href="/disclaimer">
                                    <a>Disclaimer </a>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="col-md-3 col-6">
                        <h5>Support</h5>

                        <ul>
                            <li>
                                <Link href="/contact-us">
                                    <a>Contact us</a>
                                </Link>
                            </li>

                            <li>
                                <Link href="/faqs">
                                    <a> FAQs </a>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="col-md-3 col-6">
                        <h5>Resources</h5>

                        <ul>
                            <li>
                                <Link href="/blog">
                                    <a> Blog </a>
                                </Link>
                            </li>

                            <li>
                                <Link href="/events">
                                    <a> Events </a>
                                </Link>
                            </li>

                            {
                                User() && User().user_type === 'Investor'
                                    ? <li>
                                        <Link href="/discover">
                                            <a> Discover</a>
                                        </Link>
                                    </li>
                                    : null
                            }
                        </ul>
                    </div>

                    <div className="col-md-3 col-6 logo-column">
                        <Link href="/">
                            <a className="logo d-block">
                                <img className="logo img-fluid" src="/images/logo.png" alt=""/>
                            </a>
                        </Link>

                        <div className="social-icons">
                            <Link href="//www.facebook.com/SI-Fuse-105249634372571/">
                                <a target="_blank">
                                    <img src="/images/icon/facebook.svg" alt=""/>
                                </a>
                            </Link>

                            <Link href="//twitter.com/sifuse1">
                                <a target="_blank">
                                    <img src="/images/icon/twitter.svg" alt=""/>
                                </a>
                            </Link>

                            <Link href="//www.instagram.com/sifuse_africa/">
                                <a target="_blank">
                                    <img src="/images/icon/instagram.svg" alt=""/>
                                </a>
                            </Link>

                            <Link href="//www.linkedin.com/company/sifuse/about/">
                                <a target="_blank">
                                    <img src="/images/icon/linkedIn.svg" alt=""/>
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="copy-wrapper">
            <p>&copy; 2020. SI Fuse Africa.</p>
        </div>
    </footer>
}