import Layout from "../../components/layout";
import React from "react";
import Head from "next/head";
import axiosInstance from "../../config/axios";
import Token from "../../utils/Token";
import Profile from "../../components/Profile";
import {User} from "../../utils/User";

export default function SingleStartup({startup: {profile, company, level, product_services: services, finance, market, comments: startupComments, rating}, id, isConnected, profileContent, loggedInUser, hasPermission, pendingPermission}) {
    console.log(startupComments);
    return <>
        <Layout headerContent={null} headerClass="page-header no-bg" redBar>
            <Head>
                <title>{company.name}</title>
                <script src="/js/rater.min.js"/>
            </Head>

            <Profile profile={profile} company={company} services={services} finance={finance} level={level}
                     market={market} userType="startup" id={id} isConnected={isConnected}
                     profileContent={profileContent} loggedInUser={loggedInUser} hasPermission={hasPermission} pendingPermission={pendingPermission} startupComments={startupComments} rating={rating}/>
        </Layout>
        <style jsx>{`
            .services-stage {
                text-transform: capitalize;
            }
            .person-logo { max-width: 40% }
        `}</style>
    </>
}

SingleStartup.getInitialProps = async (ctx) => {
    const id = ctx.query.id;
    const headers = {
        headers: {
            Authorization: `Bearer ${Token(ctx)}`
        }
    };
    const {data: response} = await axiosInstance.get(`investors/startups/${id}/by-slug`, headers);
    const {data: profileContent} = await axiosInstance.get('profile-content', headers);
    const loggedInUser = User(ctx);

    return {
        startup: response.data,
        isConnected: response.is_connected,
        id,
        profileContent,
        loggedInUser,
        hasPermission: response.has_permission,
        pendingPermission: response.pending_permission,
    }
}
