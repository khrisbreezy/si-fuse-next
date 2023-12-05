import Layout from "../../components/layout";
import Head from "next/head";
import React, {useEffect, useState} from "react";
import axiosInstance from "../../config/axios";
import {useForm} from "react-hook-form";
import Error from "../../components/UI/ErrorSpan";
import {User} from "../../utils/User";
import Token from "../../utils/Token";
import {useDispatch} from "react-redux";
import {loader} from "../../store/actions/loader";
import {showNotifier} from "../../store/actions/notifier";
import Router from "next/router";

export default function Events({event, countries}) {

    const createMarkup = () => ({__html: event.content});

    const [showRegister, setShowRegister] = useState(false);
    const {register, handleSubmit, errors} = useForm();
    const [countryFlag, setCountryFlag] = useState('');
    const [currentUser, setCurrentUser] = useState(User());

    const dispatch = useDispatch();
    const toggleRegisterForm = (e) => {
        e.preventDefault();
        setShowRegister(true);
    }

    const submitHandler = async data => {
        if (!Token()) {
            localStorage.setItem('redirectBackToEvents', `/events/${event.slug}`);
            Router.push('/login');
            return;
        }
        dispatch(loader());
        try {
            let formData = null;
            if (event.is_free) {
                formData = {...data, event_id: event.id};
            } else {
                const raveResponse = await payWithRave({...data, amount: event.amount, id: event.id});
                formData = {
                    ...data,
                    event_id: event.id,
                    amount: raveResponse.tx.amount,
                    txn_ref: raveResponse.tx.txRef,
                    flw_ref: raveResponse.tx.flwRef,
                    rave_ref: raveResponse.tx.raveRef
                };
            }
            const {data: response} = await axiosInstance.post('user-events', formData, {
                headers: {
                    Authorization: `Bearer ${Token()}`
                }
            });
            dispatch(loader());
            dispatch(showNotifier('Registered for event!'));
        } catch (e) {
            console.log(e);
            dispatch(loader());
            dispatch(showNotifier(e.response.data.message, 'danger'));
        }
    }

    const payWithRave = async ({email, amount, phone, id}) => {
        return new Promise((resolve, reject) => {
            const x = getpaidSetup({
                PBFPubKey: 'FLWPUBK_TEST-26b715e6695e5b02f3b6b758a8fb365b-X',
                customer_email: email,
                amount: amount,
                customer_phone: phone,
                currency: "NGN",
                txref: "event-" + id,
                onclose: function () {
                },
                callback: function (response) {
                    if (
                        response.data.chargeResponseCode == "00" ||
                        response.data.chargeResponseCode == "0"
                    ) {
                        resolve(response);
                        // redirect to a success page
                    } else {
                        // redirect to a failure page.
                    }

                    resolve(response);
                    x.close(); // use this to close the modal immediately after payment.
                }
            });
        })
    }

    const countryChangeHandler = e => {
        const country = countries.find(country => country.id === +e.target.value);
        setCountryFlag(country.flag);
    }

    return <>
        <Layout page="SingleEvent" headerContent={null} headerClass="page-header no-bg" redBar>
            <Head>
                <title>{event.title}</title>
                <script src="https://api.ravepay.co/flwv3-pug/getpaidx/api/flwpbf-inline.js"/>
                <script type="text/javascript" src="https://addevent.com/libs/atc/1.6.1/atc.min.js" async defer/>
            </Head>

            <section className="single-post">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="white-bg">
                                <img src={event.image} alt={event.title} className="img-fluid blog-image"/>

                                <div className="row">
                                    <div className="col-md-9 mx-auto">
                                        <div className="content">
                                            <h1>{event.title}</h1>

                                            <div className="event-category">
                                                <div>
                                                    <p><img src="/images/icon/time.svg"
                                                            alt=""/> {event.date_formatted_alt}
                                                    </p>
                                                    {/*<p><img src="/images/icon/date.svg" alt=""/> 12:00 - 2:00 (CAT)</p>*/}
                                                    <p><img src="/images/icon/location.svg"
                                                            alt=""/> {event.location + ', ' + event.country + '.'}</p>
                                                    {
                                                        event.map_link && <a href={event.map_link} target="_blank"
                                                        className="btn btn-xs mr-3 mt-0">
                                                            <img src="/images/icon/location.svg"
                                                                 alt=""/> Get Directions
                                                        </a>
                                                    }
                                                    {
                                                        !event.expired && <div title="Add to Calendar" className="addeventatc event-button">
                                                            Add to Calendar
                                                            <span className="start">{event.date_for_calendar + ' ' + '08:00'}</span>
                                                            <span className="end">{event.date_for_calendar + ' ' + '16:00'}</span>
                                                            <span className="timezone">Africa/Lagos</span>
                                                            <span className="title">{event.title}</span>
                                                            <span className="description">{event.title}</span>
                                                            <span className="location">{event.location + ', ' + event.country + '.'}</span>
                                                        </div>
                                                    }
                                                </div>
                                                <p className="color-red">{event.is_free ? 'Free' : 'Paid'} Event</p>
                                            </div>



                                            <h5>About this Event</h5>

                                            <div dangerouslySetInnerHTML={createMarkup()}/>

                                            {
                                                showRegister
                                                    ? <div>
                                                        <h5 className="mb-0 mt-5">Register For Event</h5>
                                                        <form onSubmit={handleSubmit(submitHandler)}
                                                              className="profile-details event-register">
                                                            <div className="d-flex">
                                                                <div className="input-container w-50 m-right">
                                                                    <input name="first_name"
                                                                           defaultValue={currentUser ? currentUser.first_name : ''}
                                                                           ref={register({required: 'This field is required'})}
                                                                           type="text" className="half-width"
                                                                           placeholder="First Name"/>
                                                                    {errors.first_name &&
                                                                    <Error>{errors.first_name.message}</Error>}
                                                                </div>

                                                                <div className="input-container w-50">
                                                                    <input name="last_name"
                                                                           defaultValue={currentUser ? currentUser.last_name : ''}
                                                                           ref={register({required: 'This field is required'})}
                                                                           type="text"
                                                                           className="half-width"
                                                                           placeholder="Last Name"/>
                                                                    {errors.last_name &&
                                                                    <Error>{errors.last_name.message}</Error>}
                                                                </div>
                                                            </div>

                                                            <div className="input-container">
                                                                <input name="email"
                                                                       defaultValue={currentUser ? currentUser.email : ''}
                                                                       ref={register({required: 'This field is required'})}
                                                                       type="text" className="full-width"
                                                                       placeholder="Email Address"/>
                                                                {errors.email &&
                                                                <Error>{errors.email.message}</Error>}
                                                            </div>

                                                            <div className="d-flex">
                                                                <div className="input-container small">
                                                                    <select name="country_code" className="select2"
                                                                            ref={register({required: "This field is required"})}
                                                                            defaultValue={currentUser ? currentUser.country_id : ''}>
                                                                        {
                                                                            countries.map(({id, country_area_code, country}) =>
                                                                                <option key={id}
                                                                                        value={id}>{country_area_code} - {country}</option>)
                                                                        }
                                                                    </select>
                                                                    {/*<select*/}
                                                                    {/*    ref={register({required: 'This field is required'})}*/}
                                                                    {/*    name="country_code"*/}
                                                                    {/*    id="flag"*/}
                                                                    {/*    className="m-right select-flag mb-0"*/}
                                                                    {/*    onChange={countryChangeHandler}*/}
                                                                    {/*    defaultValue={currentUser ? currentUser.country_id : ''}*/}
                                                                    {/*>*/}
                                                                    {/*    <option value="">Country Code</option>*/}
                                                                    {/*    {*/}
                                                                    {/*        countries.map(*/}
                                                                    {/*            ({id, country, country_area_code}) =>*/}
                                                                    {/*                <option value={id}*/}
                                                                    {/*                        key={id}>{`${country_area_code} (${country})`}</option>*/}
                                                                    {/*        )*/}
                                                                    {/*    }*/}
                                                                    {/*</select>*/}
                                                                    {errors.country_code &&
                                                                    <Error>{errors.country_code.message}</Error>}
                                                                </div>

                                                                <div className="input-container flex-grow-1">
                                                                    <input name="phone"
                                                                           ref={register({required: 'This field is required'})}
                                                                           type="text"
                                                                           className="w-sm-2 w-100"
                                                                           placeholder="Phone Number"
                                                                    />
                                                                    {errors.phone &&
                                                                    <Error>{errors.phone.message}</Error>}
                                                                </div>
                                                            </div>

                                                            {/*<p>Your seat number is <span>36</span></p>*/}
                                                            {event.is_free ? null :
                                                                <p className="ticket-price-span">Tickets Cost <span
                                                                    className="col-green">#{event.amount_formatted}</span>,
                                                                    click register to
                                                                    pay and get your ticket</p>}
                                                            <button type="submit" className="btn full-width">Register
                                                            </button>
                                                        </form>
                                                    </div>
                                                    : null
                                            }
                                        </div>
                                    </div>
                                </div>

                                {
                                    (!showRegister && !event.expired) && <div className="text-center button">
                                            <a href="#" onClick={toggleRegisterForm} id="btn-reg"
                                               className="btn">Register</a>
                                        </div>
                                }

                                {
                                    (!showRegister && event.expired) && <div className="text-center mt-4 text-uppercase">Registration Closed</div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </Layout>

        <style jsx>{`
            .input-container {
                display: flex;
                flex-direction: column;             
                margin-top: 4rem;               
            }
            
            @media (max-width: 767px){
                .input-container{
                    margin-top: 20px;
                }
            }
            
            input {
                width: 100%!important;
                margin-bottom: 0!important;
            }
            .w-sm {
                width: 100% !important;
            }
            .small {
                width: 20% !important;
                margin-right: 2rem;
            }
            .select-flag {
                background: url(${countryFlag ? countryFlag : '/images/icon/flag.png'}) no-repeat left;
                background-size: 30px;
            }
            .ticket-price-span {
                margin-top: 4rem;
            }
            .btn {
                margin-top: 2rem;
            }
        `}</style>
    </>
}

export async function getStaticPaths() {
    const {data: response} = await axiosInstance.get('events-slugs');
    const slugs = response.map(slug => ({
        params: {
            slug: slug.slug
        }
    }));

    return {
        paths: slugs,
        fallback: false
    }
}

export async function getStaticProps({params}) {
    const slug = params.slug;

    const {data: {data: event}} = await axiosInstance.get(`events/${slug}`);
    const {data: countries} = await axiosInstance.get('countries');

    return {
        props: {
            event,
            countries
        }
    }
}