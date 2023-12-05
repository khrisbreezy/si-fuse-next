import Layout from "../../components/layout";
import Head from "next/head";
import Link from "next/link";
import React, {useState} from "react";
import axiosInstance from "../../config/axios";
import Token from "../../utils/Token";
import {auth} from "../../components/hoc/auth";
import {useDispatch} from "react-redux";
import {loader} from "../../store/actions/loader";

const MyEvents = ({data: {data: events, links: {next}, meta: {current_page, last_page}}}) => {
    const [allEvents, setEvents] = useState(events);
    const [nextUrl, setNextUrl] = useState(next);
    const [lastPage, setLastPage] = useState(last_page);
    const [currentPage, setCurrentPage] = useState(current_page);

    const dispatch = useDispatch();

    const nextPageHandler = async e => {
        e.preventDefault();
        dispatch(loader());
        try {
            const {data: response} = await axiosInstance.get(nextUrl);
            setEvents(state => state.concat(response.data));
            setNextUrl(response.links.next);
            setLastPage(response.meta.last_page);
            setCurrentPage(response.meta.current_page);
            dispatch(loader());
        } catch (error) {
            console.log(error);
            dispatch(loader());
        }
    }

    return <Layout page="My Events" headerClass="page-header events" headerContent={<h1>My Events</h1>} whiteAccount>
        <Head>
            <title>My Events</title>
        </Head>

        <section className="events">
            <div className="container">
                <div className="row">
                    {
                        allEvents.map(({event}) => <div className="col-md-4" key={event.id}>
                            <div className="card">
                                <Link href="events/[slug]" as={`events/${event.slug}`}>
                                    <div className="position-relative">
                                        <img className="card-img-top img-fluid" src={event.image}/>
                                        <a className="view text-white">view <img src="/images/icon/right.png"
                                                                                 alt=""/></a>

                                    </div>
                                </Link>

                                <div className="background-text">
                                    <Link href="events/[slug]" as={`events/${event.slug}`}>
                                        <h5>{event.title}</h5>
                                    </Link>
                                </div>


                                <div className="meta">
                                    <p>{event.date_formatted}</p>
                                    <p>{event.country}</p>
                                </div>
                            </div>
                        </div>)
                    }

                    {
                        allEvents.length === 0 && <div className="col-md-4">
                            No events!
                        </div>
                    }

                </div>
                {
                    currentPage < lastPage
                        ? <div className="text-center button">
                            <a href="#" onClick={nextPageHandler} className="btn">Load more</a>
                        </div>
                        : null
                }
            </div>
        </section>
    </Layout>
}

MyEvents.getInitialProps = async (ctx) => {
    const {data: data} = await axiosInstance.get('user-events?paginate=12', {
        headers: {
            Authorization: `Bearer ${Token(ctx)}`
        }
    });

    return {
        data
    }
}

export default auth(MyEvents);