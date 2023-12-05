import React, {useState} from "react";
import StartupProfile from "./profiles/StartupProfile";
import InvestorProfile from "./profiles/InvestorProfile";

const Profile = ({rating, startupComments, company, services, finance, market, userType, profile, interests, level = null, hasEdit = false, id = null, isConnected = null, profileContent = null, connections = [], loggedInUser, hasPermission, pendingPermission}) => {

    return <>
        {
            userType.toLowerCase() === 'startup'
                ?
                <StartupProfile company={company} services={services} userType="startup" finance={finance} level={level}
                                market={market} profile={profile} profileContent={profileContent} hasEdit={hasEdit}
                                loggedInUser={loggedInUser} hasPermission={hasPermission} pendingPermission={pendingPermission} isConnected={isConnected}
                                startupComments={startupComments} rating={rating}/>
                :
                <InvestorProfile profile={profile} interests={interests} userType="investor" connections={connections}/>
        }
        <style jsx>{`
            .person .has-edit {
                content: '';
                background: url(/images/icon/edit.png);
                width: 30px;
                height: 30px;
                position: absolute;
                background-repeat: no-repeat;
                background-size: contain;
                cursor: pointer;
                top: 5px;
                right: 25px;
            }
        `}</style>
    </>
}

export default Profile;