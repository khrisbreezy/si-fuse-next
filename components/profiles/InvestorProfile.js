import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import Router from "next/router";
import {showImageViewer} from "../../store/actions/imageViewer";
import StartupCard from "../startups/startupCard";
import StartupProfileLevels from "./StartupLevels";

const InvestorProfile = ({profile, interests, connections}) => {
    const dispatch = useDispatch();

    const goTo = url => window.open(url.includes('http') ? url : `http://${url}`, '_blank');

    useEffect(() => {
        const overviewBtn = $('#overview-btn');
        const connectionsBtn = $('#connections-btn');

        // if ($(window).width() > 768) {
        //     $(window).scroll(function (e) {
        //         const $el = $('#sidebar-scroller');
        //         const isPositionFixed = ($el.css('position') === 'fixed');
        //         if ($(this).scrollTop() > 140 && !isPositionFixed) {
        //             $el.css({'position': 'fixed', 'top': '0px'});
        //         }
        //         if ($(this).scrollTop() < 140 && isPositionFixed) {
        //             $el.css({'position': 'static', 'top': '0px'});
        //         }
        //     })
        // }

        // overviewBtn.click(function () {
        //     $('html, body').animate({
        //         scrollTop: $('#overview').offset().top - 20
        //     }, 1000);
        // });

        // connectionsBtn.click(function () {
        //     $('html, body').animate({
        //         scrollTop: $('#connections').offset().top - 20
        //     }, 1000);
        // });
    });

    return <>
        <section className="startup-content">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <div className="startup-sidebar" id="sidebar-scroller">
                            <div className="profile-content">
                            <div className="head-info d-flex align-items-center">
                                <img id="viewer-image"
                                    onClick={() => dispatch(showImageViewer(profile.profile_pic_url))}
                                    src={profile.profile_pic_url} alt="" className="img-fluid img-profile" />
                                <p className="profile-name mb-0">
                                    {`${profile.user.first_name} ${profile.user.last_name}`}
                                </p>
                            </div>
                            <p><img className="location-img" src="/images/icon/location.svg" alt=""/> {profile.location ? profile.location.country : ''}</p>
                            <p>{profile.website}</p>
                            <p>{profile.phone}</p>
                            <div className="social-icons">
                                <a href={`${profile.facebook}`}
                                    target="_blank">
                                    <img src="/images/icon/fb-colored.svg" alt="" />
                                </a>
                                <a href={`${profile.linkedin}`}
                                    target="_blank">
                                    <img src="/images/icon/lnkd-colored.svg" alt="" />
                                </a>
                                <a href={`${profile.instagram}`}
                                    target="_blank">
                                    <img src="/images/icon/ig-colored.svg" alt="" />
                                </a>
                                <a href={`${profile.twitter}`}
                                    target="_blank">
                                    <img src="/images/icon/twt-colored.svg" alt="" />
                                </a>
                            </div>
                            <button className="btn edit-investors-profile my-3"
                                    onClick={() => Router.push('/profile/edit')}>Edit Profile
                            </button>
                            </div>
                            {/* <div className="profile-content mt-5">
                                <button className="startup-link-view" id="overview-btn">
                                    <img className="img-fluid" src="/images/icon/startup-lev-eye.svg" alt="" />Overview
                                </button>
                                <button className="startup-link-view" id="connections-btn">
                                   <img src="/images/icon/startup-level-icon-connect.svg" alt=""/>  Connections 
                                </button>
                            </div> */}
                            
                        </div>
                    </div>

                    <div className="col-md-8">

                        <div className="startup-heading" id="overview">
                            <h5>Overview</h5>
                            <div className="row overview-border">
                                <div className="col-lg-4">
                                    <div className="startup-description">
                                        <div className="d-flex align-items-center mb-5">
                                            <img src="/images/icon/stage-icon-invest.svg" alt="" />
                                            <p className="profile-name mb-0">
                                                Investment range
                                            </p>
                                        </div>

                                       <p className="text-capitalize overview-sub-text">
                                            {interests.investment_range}
                                        </p>
                                    </div>
                                </div>

                                <div className="col-lg-4">
                                    <div className="startup-description">
                                        <div className="d-flex align-items-center mb-5">
                                            <img src="/images/icon/ind-icon-new.svg" alt="" />
                                            <p className="profile-name mb-0">
                                                Industries
                                            </p>
                                        </div>

                                       <p className="text-capitalize overview-sub-text">
                                            {interests.industries.join(', ')}
                                        </p>
                                    </div>
                                </div>

                                <div className="col-lg-4">
                                    <div className="startup-description">
                                        <div className="d-flex align-items-center mb-5">
                                            <img src="/images/icon/stage-icon-start.svg" alt="" />
                                            <p className="profile-name mb-0">
                                                Startup Stage
                                            </p>
                                        </div>

                                       <p className="text-capitalize overview-sub-text">
                                            {interests.investment_stages.join(', ')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="row overview-border mt-5">
                                <div className="col-lg-4">
                                    <div className="startup-description">
                                        <div className="d-flex align-items-center mb-5">
                                            <img src="/images/icon/stage-icon-geo.svg" alt="" />
                                            <p className="profile-name mb-0">
                                                Geographical Focus
                                            </p>
                                        </div>

                                       <p className="text-capitalize overview-sub-text">
                                            {JSON.parse(interests.geographical_focus).join(', ')}
                                        </p>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="startup-description">
                                        <div className="d-flex align-items-center mb-5">
                                            <img src="/images/icon/stage-icon-invest-type.svg" alt="" />
                                            <p className="profile-name mb-0">
                                                Investment Types
                                            </p>
                                        </div>

                                       <p className="text-capitalize overview-sub-text">
                                            {JSON.parse(interests.investment_type).join(', ')}
                                        </p>
                                    </div> 
                                </div>

                                <div className="col-lg-4">
                                    <div className="startup-description">
                                        <div className="d-flex align-items-center mb-5">
                                            <img src="/images/icon/stage-icon-start-pref.svg" alt="" />
                                            <p className="profile-name mb-0">
                                                Startup Preference
                                            </p>
                                        </div>

                                       <p className="text-capitalize overview-sub-text">
                                            Level {interests.startup_level}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                       
                        <div className="startup-heading">
                            <div className="row overview-border">
                                <div className="col-12">
                                    <div className="startup-description p-0 startup-description-others">
                                        {/* <img src="/images/icon/book.svg" alt="" />
                                        <p className="profile-name">
                                            About Me
                                        </p>
                                        <p>{profile.about}</p> */}
                                        <div className={`d-flex align-items-center side-content`}>
                                            <img className="mr-2 level-img" src={`/images/icon/about-me-icon.svg`}
                                                alt="" />
                                            <p className="p-0 level-name">  About Me</p>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="startup-level-content">
                                                <p className="ml-2">{profile.about}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="events discover investors-bg" id="connections">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2>Connections</h2>
                    </div>
                </div>

                {/* <div className="row"> */}

                    {
                        connections.length > 0 && <div>
                            {
                                connections.map(user => {
                                    return <StartupCard key={user.slug} startup={user}/>
                                })
                            }
                        </div>
                    }

                {/* </div> */}

                {/*<div className="text-center button mt-5">*/}
                {/*    <a href="#" className="btn">Load more</a>*/}
                {/*</div>*/}
            </div>
        </section>
    </>
};

export default InvestorProfile;