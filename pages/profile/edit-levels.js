import Layout from "../../components/layout";
import Head from "next/head";
import React, {useEffect} from "react";
import Level1 from "../../components/profileForm/startups/level1";
import Level2 from "../../components/profileForm/startups/level2";
import Level3 from "../../components/profileForm/startups/level3";
import Level4 from "../../components/profileForm/startups/level4";
import Level5 from "../../components/profileForm/startups/level5";
import Level6 from "../../components/profileForm/startups/level6";
import Level7 from "../../components/profileForm/startups/level7";
import Level8 from "../../components/profileForm/startups/level8";
import InvestorBasicInfo from "../../components/profileForm/investors/one";
import InvestorPreference from "../../components/profileForm/investors/two";
import InvestorMoreInfo from "../../components/profileForm/investors/three";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentLevelState} from "../../store/actions/profile";
import {auth} from "../../components/hoc/auth";
import Token from "../../utils/Token";
import {User} from "../../utils/User";
import axiosInstance from "../../config/axios";
import {setStartupData} from "../../store/actions/startupProfile";

const EditLevels = ({startup}) => {

    const dispatch = useDispatch();

    const isEditingLevels = useSelector(state => state.profile.isEditingLevels);

    useEffect(() => {
        if (!isEditingLevels)
            dispatch(setCurrentLevelState(startup.profile_level_stage));
    }, []);

    const currentProfileStage = useSelector(state => state.profile.currentLevelState);
    const currentStartupProfile = useSelector(state => state.startupProfile.startup) || startup;

    const ProfileComponent = () => {
        switch (currentProfileStage) {
            case 1:
                return <Level1 startup={currentStartupProfile} isEditingLevel={isEditingLevels}/>;
            case 2:
                return <Level2 startup={currentStartupProfile} isEditingLevel={isEditingLevels}/>;
            case 3:
                return <Level3 startup={currentStartupProfile} isEditingLevel={isEditingLevels}/>;
            case 4:
                return <Level4 startup={currentStartupProfile} isEditingLevel={isEditingLevels}/>;
            case 5:
                return <Level5 startup={currentStartupProfile} isEditingLevel={isEditingLevels}/>;
            case 6:
                return <Level6 startup={currentStartupProfile} isEditingLevel={isEditingLevels}/>;
            case 7:
                return <Level7 startup={currentStartupProfile} isEditingLevel={isEditingLevels}/>;
            case 8:
                return <Level8 startup={currentStartupProfile} isEditingLevel={isEditingLevels}/>;
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

EditLevels.getInitialProps = async ctx => {
    const token = Token(ctx);
    const loggedInUser = User(ctx);

    const {data: {startup}} = await axiosInstance.get('profile-content', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return {
        startup,
        loggedInUser
    }
}

export default auth(EditLevels);