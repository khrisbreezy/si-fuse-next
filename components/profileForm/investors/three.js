import React from "react";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {loader} from "../../../store/actions/loader";
import Router from "next/router";
import Cookies from "js-cookie";
import axiosInstance from "../../../config/axios";
import Token from "../../../utils/Token";
import {decrementCurrentState} from "../../../store/actions/profile";
import ErrorSpan from "../../UI/ErrorSpan";
import {showNotifier} from "../../../store/actions/notifier";
import InvestorProfileHeader from "./InvestorProfileHeader";
import {setInvestorProfile} from "../../../store/actions/investorProfile";

const InvestorMoreInfo = ({investor, stages}) => {
    const dispatch = useDispatch();
    const {register, handleSubmit, errors} = useForm();

    const onSubmitHandler = async data => {
        dispatch(loader());
        try {
            const {data: response} = await axiosInstance.post('investors/interest-level', data, {
                headers: {
                    Authorization: `Bearer ${Token()}`,
                    'Content-Type': 'application/json'
                }
            });
            
            dispatch(setInvestorProfile(response.data));
            dispatch(loader());
            dispatch(showNotifier('Signup Complete'));
            let user = JSON.parse(Cookies.get('user'));
            user.has_profile = 1;
            Cookies.set('user', JSON.stringify(user));
            Router.push('/timeline');
        } catch (e) {
            dispatch(loader());
            console.log(e);
        }
    }

    const hasInterests = () => investor.hasOwnProperty('interests') && investor.interests;

    return <>
        <section className="startup-levels">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="white-bg">
                            <div className="row">
                                <div className="col-md-9 mx-auto">
                                    <InvestorProfileHeader/>

                                    <div className="d-md-none">
                                        <h4 className="text-center mb-3">Startup Preference</h4>
                                    </div>

                                    <form onSubmit={handleSubmit(onSubmitHandler)} className="profile-details">
                                        <div className="investor-levels">
                                            <input ref={register} type="radio" name="startup_level" id="level-1"
                                                   value="1"
                                                   defaultChecked={hasInterests() && investor.interests.startup_level === '1'}/>
                                            <label htmlFor="level-1" className="radio-label">
                                                <span className="input-label">Level 1</span>
                                                <p>I am interested in a startup that have a well established founding
                                                    team, that have gone ahead to identified a key/vital problem in
                                                    their industry to solve. They do not need to have a product protype
                                                    or a business model.</p>
                                            </label>

                                            <input ref={register} type="radio" name="startup_level" id="level-2"
                                                   value="2"
                                                   defaultChecked={hasInterests() && investor.interests.startup_level === '2'}/>
                                            <label htmlFor="level-2" className="radio-label">
                                                <span className="input-label">Level 2</span>
                                                <p>I am interested in a start-up where the founders have developed a
                                                    value proposition on how they plan on solving an identified problem,
                                                    and can show investors that their value proposition is valuable to
                                                    potential consumers/customers.</p>
                                            </label>

                                            <input ref={register} type="radio" name="startup_level" id="level-3"
                                                   value="3"
                                                   defaultChecked={hasInterests() && investor.interests.startup_level === '3'}/>
                                            <label htmlFor="level-3" className="radio-label">
                                                <span className="input-label">Level 3</span>
                                                <p>I am interested in a start-up that has evidence that validates their
                                                    solution is valuable to customers and have started trials of their
                                                    price strategy with early prototypes with a report that shows
                                                    customers/consumers can afford a price that would drive business
                                                    sustainability.</p>
                                            </label>

                                            <input ref={register} type="radio" name="startup_level" id="level-4"
                                                   value="4"
                                                   defaultChecked={hasInterests() && investor.interests.startup_level === '4'}/>
                                            <label htmlFor="level-4" className="radio-label">
                                                <span className="input-label">Level 4</span>
                                                <p>I am interested in a start-up with an obvious business opportunity
                                                    that has a reliable third party data to validate that their total
                                                    available market is over $1 million and are well positioned to
                                                    penetrate this market. Also can provide proof to investors that they
                                                    can establish a profitable business within the market.
                                                </p>
                                            </label>

                                            <input ref={register} type="radio" name="startup_level" id="level-5"
                                                   value="5"
                                                   defaultChecked={hasInterests() && investor.interests.startup_level === '5'}/>
                                            <label htmlFor="level-5" className="radio-label">
                                                <span className="input-label">Level 5</span>
                                                <p>I am interested in a start-up that have reached a business turning
                                                    point, with paying clients, reduced acquisition cost, with data that
                                                    shows that they could attain a positive unit economics. Also, can
                                                    provide investors with a road map how the business tend to capture
                                                    customers past early adopters.</p>
                                            </label>

                                            <input ref={register} type="radio" name="startup_level" id="level-6"
                                                   value="6"
                                                   defaultChecked={hasInterests() && investor.interests.startup_level === '6'}/>
                                            <label htmlFor="level-6" className="radio-label">
                                                <span className="input-label">Level 6</span>
                                                <p>I am interested in start-up that have completed vital business steps
                                                    and are demonstrating that customers past the early adopters see
                                                    value in their products/services. And can provide investors with
                                                    proof of product/market fit, specifically that their unit economics
                                                    are positives with favourable avarage profit margin.</p>
                                            </label>

                                            <input ref={register} value={7} type="radio" name="startup_level" value="7"
                                                   id="level-7"
                                                   defaultChecked={hasInterests() && investor.interests.startup_level === '7'}/>
                                            <label htmlFor="level-7" className="radio-label">
                                                <span className="input-label">Level 7</span>
                                                <p>I am interested in start-up that have shown that they could make
                                                    profits from every customers/consumers and now simply want to expand
                                                    the business. They are willing to show investors how quickly they
                                                    can expand sales and manage the increasing pains of an growing
                                                    organization.</p>
                                            </label>

                                            <input ref={register} type="radio" name="startup_level" id="level-8"
                                                   value="8"
                                                   defaultChecked={hasInterests() && investor.interests.startup_level === '8'}/>
                                            <label htmlFor="level-8" className="radio-label">
                                                <span className="input-label">Level 8</span>
                                                <p>I am interested in a start-up that is expanding quickly and have
                                                    developed working strategies for business growth. With sustainable
                                                    value proposition, products and revenue model. While, concentrating
                                                    on sales, growth, and managing the team as it also grows in new and
                                                    challenging ways. They can also provide early investors with
                                                    liquidity and exit plan.</p>
                                            </label>

                                            <input ref={register} type="radio" name="startup_level" id="level-9"
                                                   value="9"
                                                   defaultChecked={hasInterests() && investor.interests.startup_level === '9'}/>
                                            <label htmlFor="level-9" className="radio-label">
                                                <span className="input-label">Level 9</span>
                                                <p> I am interested in a start-up that have built an extraordinary and
                                                    spectacular enterprise, have gained large market share and
                                                    recognized as a pace-setter in their industry. They are currently in
                                                    the midst of a significant negotiations for investor's exit and new
                                                    source of capital, and should be signing a deal soon.</p>
                                            </label>
                                        </div>

                                        <div className="d-flex">
                                            <button className="btn prev mr-auto"
                                                    onClick={() => dispatch(decrementCurrentState())} type="button">
                                                <span/> Prev
                                            </button>
                                            <button className="btn next ml-auto" type="submit">
                                                Save <span/>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <style jsx>{`
            .covid-impact {
                margin-top: 4rem;
             }
        `}</style>
    </>
}

export default InvestorMoreInfo;