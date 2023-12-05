import React from "react";
import Link from "next/link";
import {useDispatch} from "react-redux";
import {loader} from "../../store/actions/loader";
import axiosInstance from "../../config/axios";
import Token from "../../utils/Token";

const SingleNotification = ({notification}) => {

    const dispatch = useDispatch();

    const acceptRequestHandler = async (token, id) => {
        dispatch(loader());
        try {
            const {data: response} = await axiosInstance.post('startups/grant-permission', {token, investor_id: id}, {
                headers: {
                    Authorization: `Bearer ${Token()}`
                }});
            console.log(response);
            dispatch(loader());
        } catch (e) {
            dispatch(loader());
            console.log(e.response.data.message);
        }
    }

    const NotificationComponent = () => {
        switch (true) {
            case notification.type.includes('InvestorConnected'):
                return <li>
                    <p className="head-text"><img src="/images/icon/new-connection-icon.svg" alt="" /> New Connection</p>
                    <p className="msg-text">
                        You connected to &nbsp;
                        <Link href="/startups/[id]" as={`/startups/${notification.data.startup.slug}`}>
                            <a>{`${notification.data.startup.first_name} ${notification.data.startup.last_name}`}</a>
                        </Link>.
                    </p>
                    <span>{notification.date_created}</span>
                </li>;

            case notification.type.includes('StartupAcceptedRequestForStartup'):
                return <li>
                    <p className="head-text"><img src="/images/icon/profile-request-icon.svg" alt="" /> Profile View
                        Request</p>
                    <p className="msg-text">You've given <b>{`${notification.data.investor.first_name} ${notification.data.investor.last_name}`}</b> permission to view your profile.</p>
                    <span>{notification.date_created}</span>
                </li>;

            case notification.type.includes('StartupAcceptedRequestForInvestor'):
                return <li>
                    <p className="head-text"><img src="/images/icon/profile-request-icon.svg" alt="" /> Profile View
                        Request</p>
                    <p className="msg-text"><Link href="/startups/[id]" as={`/startups/${notification.data.startup.slug}`}>
                        <a>{`${notification.data.startup.first_name} ${notification.data.startup.last_name}`}</a>
                    </Link> has given you permission to view their profile.</p>
                    <span>{notification.date_created}</span>
                </li>;

            case notification.type.includes('NewConnection'):
                return <li>
                    <p className="head-text"><img src="/images/icon/new-connection-icon.svg" alt="" /> New Connection
                    </p>
                    <p className="msg-text"><b>{`${notification.data.investor.first_name} ${notification.data.investor.last_name}`}</b> is now a new connection.</p>
                    <span>{notification.date_created}</span>
                </li>;

            case notification.type.includes('NewEvent'):
                return <li>
                    <p className="head-text"><img src="/images/icon/new-event.svg" alt="" /> New Event</p>
                    <p className="msg-text"><Link href="/events/[slug]" as={`/events/${notification.data.event.slug}`}><a>{notification.data.event.title}</a></Link> is an upcoming Event.</p>
                    <span>{notification.date_created}</span>
                </li>;

            case notification.type.includes('ProfileRequest'):
                return <li>
                    <p className="head-text"><img src="/images/icon/profile-request-icon.svg" alt="" /> Profile View
                        Request</p>
                    <p className="msg-text"><b>{`${notification.data.investor.first_name} ${notification.data.investor.last_name}`}</b> requested to view your profile.</p>
                    <div className="d-flex align-items-center">
                        <button className="accept-btn" onClick={() => acceptRequestHandler(notification.data.token, notification.data.investor.id)}>
                            Accept
                        </button>
                        <button className="decline-btn">
                            Decline
                        </button>
                    </div>
                    <span>{notification.date_created}</span>
                </li>;

            default:
                return null;
        }
    }

    return <NotificationComponent />
}

export default SingleNotification;