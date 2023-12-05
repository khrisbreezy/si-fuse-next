import Head from 'next/head'
import Layout from "../components/layout";
import React, {useEffect, useState} from "react";
import HeaderContent from "../components/header/HeaderContent";
import Link from "next/link";
import axiosInstance from "../config/axios";
import {resetCurrentState} from "../store/actions/profile";
import {useDispatch} from "react-redux";
import Token from "../utils/Token";
import Slider from "react-slick";
import Router from 'next/router';

const Home = ({events, blogs}) => {
    const dispatch = useDispatch();

    const isLoggedIn = !!Token();

    const settingsEvent = {
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 1071,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: true,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: true,
                }
            },
        ]
    };

    const settingsBlog = {
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        autoplay: true,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 1071,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
        ]
    }

    const [showScroller, setShowScroller] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', (event) => {
            if (window.pageYOffset >= 300) {
                setShowScroller(true);
            } else {
                setShowScroller(false);
            }
        });
    }, [])

    useEffect(() => {
        dispatch(resetCurrentState());

        setTimeout(() => {
            $('a[href*="#"]:not([href="#"])').click(function () {
                if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
                    let target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                    if (target.length) {
                        $('html, body').animate({
                            scrollTop: target.offset().top
                        }, 1000);
                        return false;
                    }
                }
            });
        }, 2000);

    }, [])

    const scrollToTop = () => {
        if (document.body.scrollTop !== 0 || document.documentElement.scrollTop !== 0) {
            window.scrollBy(0, -50);
            requestAnimationFrame(scrollToTop);
        }
    }

    const investorsSignupHandler = () => {
        Router.push(isLoggedIn ? '/profile' : '/signup?for=investors');
    }

    const startupSignupHandler = () => {
        Router.push(isLoggedIn ? '/profile' : '/signup?for=startups');
    }

    return <Layout
        page="Home"
        headerContent={<HeaderContent/>}
        headerClass="homepage"
        whiteAccount
    >
        <Head>
            <title>SI Fuse</title>
        </Head>

        <section id="second-section" className="image-text">
            <div className="container">
                <div className="row mb-md-5 pb-5 pb-md-0">
                    <div className="col-lg-9 col-12 mx-auto">
                        <div onClick={investorsSignupHandler} className="row cursor-pointer">
                            <div
                                className="col-lg-6 col-sm-7 col-12 mx-auto d-flex align-items-center justify-content-end">
                                <div className="investors">
                                    <img className="img-01" src="images/icon/01.png" alt=""/>
                                    <h2>For investors</h2>
                                    <p>
                                        Seeking investment opportunities? <br className="d-none d-md-block"/>
                                        Find the right startups that match your <br className="d-none d-md-block"/>
                                        investment criteria within minutes.

                                    </p>
                                    {
                                        !isLoggedIn &&
                                        <Link href={isLoggedIn ? '/profile' : '/signup?for=investors'}>
                                            <a className="link">Get started <img src="images/icon/arrow-right.png" /></a>
                                        </Link>
                                    }
                                </div>
                            </div>

                            <div className="col-lg-6 d-none d-lg-block">
                                <img className="img-fluid" src="images/home-investor.png" alt=""/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-9 mx-auto">
                        <div onClick={startupSignupHandler} className="row cursor-pointer">
                            <div className="col-lg-6 d-none d-lg-block">
                                <img className="img-fluid" src="images/home-startup.png" alt=""/>
                            </div>

                            <div className="col-lg-6 col-sm-7 col-12 mx-auto d-flex align-items-center">
                                <div className="investors startups">
                                    <img className="img-01 img-02" src="images/icon/02.png" alt=""/>

                                    <h2>For startups</h2>
                                    <p>
                                        Do you need funding for your startup? <br className="d-none d-md-block"/>
                                        Get discovered by interested investors <br
                                        className="d-none d-md-block"/> within
                                        minutes.
                                    </p>
                                    {
                                        !isLoggedIn && <Link href={isLoggedIn ? '/profile' : '/signup?for=startups'}>
                                            <a className="link">Get started <img src="images/icon/arrow-right.png" /></a>
                                        </Link>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="events">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2>Events</h2>
                    </div>
                </div>

                <div className="row event-slider">
                    <div className="col-md-12 px-0">
                        <Slider {...settingsEvent}>
                            {events.map(({id, date_formatted, image_thumbnail, country, title, slug}) => <div className="col-md-4"
                                                                                                    key={id}>
                                    <Link href="events/[slug]" as={`events/${slug}`}>
                                        <a>
                                            <div className="card">
                                                <div className="position-relative">
                                                    <img className="card-img-top img-fluid" src={image_thumbnail}/>
                                                    <a className="view" href="#">view <img src="images/icon/right.png"
                                                                                           alt=""/></a>
                                                </div>

                                                <div className="background-text">
                                                    <h5>{title}</h5>
                                                </div>

                                                <div className="meta">
                                                    <p>{date_formatted}</p>
                                                    <p>{country}</p>
                                                </div>
                                            </div>
                                        </a>
                                    </Link>
                                </div>
                            )}
                        </Slider>
                    </div>
                </div>

                <div className="text-center button mt-5 pt-4 pt-md-0">
                    <Link href="events">
                        <a className="btn">All events</a>
                    </Link>
                </div>

            </div>
        </section>

        <section className="posts">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2>Blog</h2>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row posts-slider">
                    <div className="col-md-12">
                        <Slider {...settingsBlog}>
                            {
                                blogs.map(({slug, id, title, image}) => <div className="col-md-4 px-0" key={id}>
                                        <Link href="blog/[slug]" as={`blog/${slug}`}>
                                            <a className="post"
                                               style={{backgroundImage: `url(${image})`}}>
                                                <h5>
                                                    {title}

                                                    <span className="view">
                                                view <img src="images/icon/right.png"/>
                                            </span>
                                                </h5>
                                            </a>
                                        </Link>
                                    </div>
                                )

                            }
                        </Slider>
                    </div>
                </div>
            </div>

            <div className="text-center button mt-5 pt-5">
                <Link href="blog">
                    <a className="btn">The Blog</a>
                </Link>
            </div>
        </section>

        {
            showScroller && <div className="scroll-to-top" onClick={scrollToTop}>
                <button type="button" data-role="none" className="">
                </button>
            </div>
        }

    </Layout>
}

Home.getInitialProps = async ctx => {
    const {data: {blogs, events}} = await axiosInstance.get('home-page');

    return {
        events,
        blogs
    }
}

export default Home;