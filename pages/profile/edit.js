import Layout from "../../components/layout";
import React, {useEffect} from "react";
import ProfileOne from "../../components/profileForm/startups/one";
import ProfileTwo from "../../components/profileForm/startups/two";
import ProfileThree from "../../components/profileForm/startups/three";
import ProfileFive from "../../components/profileForm/startups/five";
import Head from "next/head";
import {auth} from "../../components/hoc/auth";
import {useDispatch, useSelector} from "react-redux";
import axiosInstance from "../../config/axios";
import Token from "../../utils/Token";
import {ProfileFour} from "../../components/profileForm/startups/four";
import {User} from "../../utils/User";
import InvestorBasicInfo from "../../components/profileForm/investors/one";
import InvestorPreference from "../../components/profileForm/investors/two";
import InvestorMoreInfo from "../../components/profileForm/investors/three";
import {setCurrentState} from "../../store/actions/profile";

const Profile = ({startup, industries, locations, stages, loggedInUser, investor}) => {
    const dispatch = useDispatch();

    useEffect(() => {
            dispatch(setCurrentState(userType === 'Investor' ? investor.profile_stage : startup.profile_stage));
    }, []);

    const userType = loggedInUser.user_type.user_type;
    const currentProfileStage = useSelector(state => state.profile.currentState);
    const currentStartupProfile = useSelector(state => state.startupProfile.startup) || startup;
    const currentInvestorProfile = useSelector(state => state.investorProfile.investorProfile) || investor;


    const ProfileComponent = () => {
        if (userType === 'Startup') {
            switch (currentProfileStage) {
                case 1:
                    return <ProfileOne startup={currentStartupProfile} locations={locations} industries={industries}/>;
                case 2:
                    return <ProfileTwo startup={currentStartupProfile}/>;
                case 3:
                    return <ProfileThree startup={currentStartupProfile}/>;
                case 4:
                    return <ProfileFour startup={currentStartupProfile}/>;
                case 5:
                    return <ProfileFive startup={currentStartupProfile}/>;
            }
        } else {
            switch (currentProfileStage) {
                case 1:
                    return <InvestorBasicInfo investor={currentInvestorProfile} locations={locations}/>;
                case 2:
                    return <InvestorPreference industries={industries} investor={currentInvestorProfile} stages={stages}/>;
                case 3:
                    return <InvestorMoreInfo industries={industries} stages={stages} investor={currentInvestorProfile}/>
            }
        }
    }


    return <Layout headerContent={null} headerClass="page-header no-bg" redBar page="profile" isLoggedIn>

        <Head>
            <title>Profile</title>
            <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-beta.1/dist/css/select2.min.css" rel="stylesheet"/>
            <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-beta.1/dist/js/select2.min.js"/>
        </Head>

        <ProfileComponent/>
    </Layout>
}

Profile.getInitialProps = async ctx => {
    const token = Token(ctx);
    const loggedInUser = User(ctx);

    const {data: {startup, industries, locations, stages, investor}} = await axiosInstance.get('profile-content', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return {
        startup,
        industries,
        locations,
        stages,
        loggedInUser,
        investor
    }
}

export default auth(Profile);