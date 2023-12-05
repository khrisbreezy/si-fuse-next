import Layout from "../../components/layout";
import React from "react";
import Head from "next/head";
import Router from "next/router";
import axiosInstance from "../../config/axios";
import Token from "../../utils/Token";
import Profile from "../../components/Profile";
import {User} from "../../utils/User";
import {profileMiddleWare} from "../../components/hoc/auth";
import nookies from "nookies";
import Cookies from "js-cookie";

const ProfilePage = ({canView, data: {company, product_services: services, finance, market, profile, interests, level, connections}, userType, profileContent, loggedInUser}) => {
    return <>
        <Layout headerContent={null} headerClass="page-header no-bg" redBar>
            <Head>
                <title>My Profile</title>
                <script src="/js/rater.min.js"/>
            </Head>

            <Profile company={company} services={services} finance={finance} market={market} level={level}
                     profile={profile} interests={interests} userType={userType} hasEdit profileContent={profileContent}
                     connections={connections} loggedInUser={loggedInUser} hasPermission={true}/>
        </Layout>
        <style jsx>{`
            .services-stage {
                text-transform: capitalize;
            }
            .person-logo { max-width: 40% }
        `}</style>
    </>
}

ProfilePage.getInitialProps = async (ctx) => {
    const user = User(ctx);
    const isLoggedIn = Token(ctx);
    const hasProfile = user ? user.has_profile : false;

    if (!isLoggedIn) {
        if (typeof window === 'undefined') {
            nookies.set(ctx, 'redirectIntended', ctx.pathname, {});
            ctx.res.writeHead(302, {Location: '/login'});
            ctx.res.end();
        } else {
            Cookies.set('redirectIntended', '/profile');
            Router.push('/login');
            return {};
        }
    }

    if (!user.has_profile) {
        if (typeof window === 'undefined') {
            ctx.res.writeHead(302, {Location: user.user_type.user_type === 'Investor' ? '/profile/edit' : '/profile/edit-levels'});
            ctx.res.end();
        } else {
            Router.push(user.user_type.user_type === 'Investor' ? '/profile/edit' : '/profile/edit-levels');
            return {};
        }
    }

    const headers = {
        headers: {
            Authorization: `Bearer ${Token(ctx)}`
        }
    };

    const url = user.user_type.user_type === 'Investor' ? 'investors' : 'startups';
    const {data: response} = await axiosInstance.get(url, headers);
    const {data: profileContent} = await axiosInstance.get('profile-content', headers);
    const loggedInUser = User(ctx);

    return {
        data: response.data,
        userType: user.user_type.user_type,
        profileContent,
        canView: isLoggedIn && hasProfile,
        loggedInUser
    }
}

export default profileMiddleWare(ProfilePage);
