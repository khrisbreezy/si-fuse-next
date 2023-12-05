import Layout from "../components/layout";
import Head from "next/head";
import React, {useEffect, useState} from "react";
import {auth} from "../components/hoc/auth";
import axiosInstance from "../config/axios";
import {compose} from "redux";
import {User} from "../utils/User";
import Token from "../utils/Token";
import nookies from "nookies";
import Router from "next/router";
import Cookies from 'js-cookie';
import {useDispatch} from "react-redux";
import {loader} from "../store/actions/loader";
import StartupCard from "../components/startups/startupCard";
import {useForm} from "react-hook-form";
import {showNotifier} from "../store/actions/notifier";

const Discover = ({userType, data, industries, countries}) => {
    useEffect(() => {
        localStorage.setItem('discover', JSON.stringify(data));
    }, []);

    let {data: users, links, meta} = data;
    const [allStartups, setStartups] = useState(users);
    const [nextUrl, setNextUrl] = useState(links.next);
    const [lastPage, setLastPage] = useState(meta.last_page);
    const [currentPage, setCurrentPage] = useState(meta.current_page);
    const [lastFilter, setLastFilter] = useState();
    const dispatch = useDispatch();

    const {register, handleSubmit} = useForm();

    const resetFilterHandler = () => {
        const discover = JSON.parse(localStorage.getItem('discover'));
        if (discover) {
            let {data: users, links, meta} = discover;
            setStartups(users);
            setNextUrl(links.next);
            setLastPage(meta.last_page);
            setCurrentPage(meta.current_page);
        }
    }

    const filterHandler = async data => {
        dispatch(loader());
        setLastFilter(data);
        try {
            const {data: response} = await axiosInstance.get(`investors/filter-discover?company_stage=${data.company_stage}&country=${data.country}&industry=${data.industry}&investment_ask=${data.investment_ask}&team_size=${data.team_size}&paginate=10`, {
            // const {data: response} = await axiosInstance.post('investors/filter-discover', {...data, paginate: 10}, {
                headers: {
                    Authorization: `Bearer ${Token()}`
                }
            });
            const filteredStartup = response.data.filter(x => x.company);
            setStartups(filteredStartup);
            setNextUrl(response.links.next);
            setLastPage(response.meta.last_page);
            setCurrentPage(response.meta.current_page);
            dispatch(loader());
        } catch (e) {
            dispatch(loader());
            dispatch(showNotifier(e.response.data.message, 'danger'));
        }
    }

    const nextPageHandler = async e => {
        e.preventDefault();

        dispatch(loader());
        const loadMoreY = document.getElementById('load-more').getBoundingClientRect().top + window.scrollY;
        const data = lastFilter;
        const url = data
            ? `${nextUrl}&company_stage=${data.company_stage}&country=${data.country}&industry=${data.industry}&investment_ask=${data.investment_ask}&team_size=${data.team_size}&paginate=10`
            : `${nextUrl}&paginate=10`;
        try {
            const {data: response} = await axiosInstance.get(url, {
                headers: {
                    'Authorization': `Bearer ${Token()}`
                }
            });
            setStartups(state => state.concat(response.data));
            setNextUrl(response.links.next);
            setLastPage(response.meta.last_page);
            window.scrollTo(null, loadMoreY);
            setCurrentPage(response.meta.current_page);
            dispatch(loader());
        } catch (error) {
            console.log(error);
            dispatch(loader());
        }
    }

    const DiscoverHeaderContent = () => <div className="center-box">
        <h1>Discover</h1>
    </div>

    return <Layout page="Discover" whiteAccount headerClass="discover page-header"
                   headerContent={<DiscoverHeaderContent/>}>
        <Head>
            <title>Discover</title>
            <script src="/js/rater.min.js"/>
        </Head>

        <section className="events discover">
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <h4 className="filter">Filter Result</h4>

                        <div className="row">
                            <div className="col-12">
                                <form className="profile-details w-100" onSubmit={handleSubmit(filterHandler)}>

                                    <p className="label-head">Industry</p>
                                    <select
                                        ref={register}
                                        className="w-100 full-width" name="industry">
                                        <option value="">Choose Industry</option>
                                        {
                                            industries.map(({industry, id}) => <option key={id}
                                                                                       value={id}>{industry}</option>)
                                        }
                                    </select>

                                    <p className="label-head">Country of Operation</p>
                                    <select
                                        ref={register}
                                        className="w-100 full-width" name="country">
                                        <option value="">Choose Country</option>
                                        {
                                            countries.map(({country, id}) => <option key={id}
                                                                                     value={country}>{country}</option>)
                                        }
                                    </select>


                                    <p className="label-head">Company Stage</p>
                                    <label className="checkout-label">
                                        <input type="radio" name="company_stage" value="concept"
                                               ref={register}
                                        />
                                        <span className="checkout-custom"/>
                                        Concept
                                    </label>
                                    <label className="checkout-label">
                                        <input type="radio" name="company_stage" value="early stage"
                                               ref={register}
                                        />
                                        <span className="checkout-custom"/>
                                        Early Stage
                                    </label>
                                    <label className="checkout-label">
                                        <input type="radio" name="company_stage" value="scaling"
                                               ref={register}
                                        />
                                        <span className="checkout-custom"/>
                                        Scaling
                                    </label>
                                    <label className="checkout-label">
                                        <input type="radio" name="company_stage" value="established"
                                               ref={register}
                                        />
                                        <span className="checkout-custom"/>
                                        Established
                                    </label>

                                    <p className="label-head">Team Size</p>

                                    <label className="checkout-label">
                                        <input type="radio" name="team_size"
                                               ref={register}
                                               value="1-10"/>
                                        <span className="checkout-custom"/>
                                        1 - 10
                                    </label>
                                    <label className="checkout-label">
                                        <input type="radio" name="team_size"
                                               ref={register}
                                               value="11-50"/>
                                        <span className="checkout-custom"/>
                                        11 - 50
                                    </label>
                                    <label className="checkout-label">
                                        <input type="radio" name="team_size"
                                               ref={register}
                                               value="50 and above"/>
                                        <span className="checkout-custom"/>
                                        50 and above
                                    </label>

                                    <p className="label-head">Investment Ask</p>
                                    <select
                                        ref={register}
                                        className="w-100 full-width mb-4" name="investment_ask">
                                        <option value="">Choose Investment Range</option>
                                        <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                                        <option value="$10,000 - $50,000">$10,000 - $50,000</option>
                                        <option value="$50,000 - $100,000">$50,000 - $100,000</option>
                                        <option value="$100,000 - $250,000">$100,000 - $250,000</option>
                                        <option value="$250,000 - $1,000,000">$250,000 - $1,000,000
                                        </option>
                                        <option value="$1,000,000 - $2,000,000">$1,000,000 -
                                            $2,000,000
                                        </option>
                                        <option value="$2,000,000 and above">$2,000,000 and above
                                        </option>
                                    </select>


                                    <button className="btn btn-sm" type="submit">Apply Filter</button>
                                    <button className="btn btn-sm mt-0 mt-md-3 ml-3 ml-md-0" type="reset" onClick={resetFilterHandler}>Reset
                                        Filter
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>


                    <div className="col-md-9">
                        {/*<div className="row">*/}
                        {/*    <div className="col-12">*/}
                        {/*        <h2>{userType === 'Investor' ? 'Startups' : 'Investors'}</h2>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        <div className="row">
                            {
                                allStartups.map((user, index) => <StartupCard key={index} startup={user}/>)
                            }
                            {
                                allStartups.length === 0 && <div className="row mb-5 w-100">
                                    <div className="col">
                                        <article>
                                            <div className="row">
                                                <div className="col">
                                                    <h4>No startup matches that requirement</h4>
                                                </div>
                                            </div>
                                        </article>
                                    </div>
                                </div>
                            }
                        </div>

                        {
                            currentPage < lastPage
                                ? <div className="text-center button mt-5">
                                    <a href="#" id="load-more" onClick={nextPageHandler} className="btn">Load more</a>
                                </div>
                                : null
                        }
                    </div>
                </div>

            </div>
        </section>
    </Layout>
};

Discover.getInitialProps = async (ctx) => {
    const user = User(ctx);
    const token = Token(ctx);

    if (!token) {
        if (typeof window === 'undefined') {
            nookies.set(ctx, 'redirectIntended', ctx.pathname, {});
            ctx.res.writeHead(302, {Location: '/login'});
            ctx.res.end();
        } else {
            Cookies.set('redirectIntended', '/discover');
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

    const userType = user.user_type.user_type;
    const url = userType === 'Investor' ? '/investors/discover?paginate=10' : '/startups/discover?paginate=10';

    try {
        const {data} = await axiosInstance.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const {data: {industries, countries}} = await axiosInstance.get('discover-page-content');
        return {
            data,
            userType,
            industries,
            countries
        }
    } catch (e) {
        console.log(e.response.data.message);
        return {user};
    }
}

export default compose(auth)(Discover);