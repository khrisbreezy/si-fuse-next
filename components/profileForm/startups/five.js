import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {loader} from "../../../store/actions/loader";
import axiosInstance from "../../../config/axios";
import Token from "../../../utils/Token";
import Router from "next/router";
import Cookies from 'js-cookie';
import {decrementCurrentState} from "../../../store/actions/profile";
import {showNotifier} from "../../../store/actions/notifier";
import StartupProfileHeader from "./StartupProfileHeader";
import ErrorSpan from "../../UI/ErrorSpan";
import {setStartupData} from "../../../store/actions/startupProfile";

export default function ProfileFive({startup}) {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const dispatch = useDispatch();

    const savedCompanyProfileImage = useSelector(state => state.profile.companyProfileImage)
    const savedCompanyName = useSelector(state => state.profile.companyName)

    const {register, handleSubmit, errors} = useForm();

    const hasMarketing = () => startup.hasOwnProperty('market') && startup.market;

    const onSubmitHandler = async data => {
        dispatch(loader());
        try {
            const {data: response} = await axiosInstance.post('startups/market', data, {
                headers: {
                    Authorization: `Bearer ${Token()}`
                }
            });
            dispatch(setStartupData(response.data));
            dispatch(loader());
            let user = JSON.parse(Cookies.get('user'));
            if (+user.has_profile === 0) {
                dispatch(showNotifier('Signup Complete'));
            }
            user.has_profile = 1;
            Cookies.set('user', JSON.stringify(user));
            // dispatch(resetCurrentState());
            Router.push('/profile');
        } catch (e) {
            console.log(e);
            dispatch(loader());
        }
    }

    return <>
        <section className="startup-levels">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="white-bg">
                            <div className="row">
                                <div className="col-md-9 mx-auto">
                                    <StartupProfileHeader/>

                                    <div className="d-md-none">
                                        <h4 className="text-center mb-3">Marketing</h4>
                                    </div>

                                    <form onSubmit={handleSubmit(onSubmitHandler)} className="profile-details">
                                        <div className="row">
                                            <div className="col-md-4 text-center profile-pic">
                                                <img className="img-fluid"
                                                     src={savedCompanyProfileImage || startup.company.logo_url} alt=""/>
                                                <br/>
                                                <h5 className="mt-2">{savedCompanyName || startup.company.name}</h5>
                                            </div>

                                            <div className="col-md-8">
                                                <div className="input-group-container">
                                                    <textarea ref={register({required: 'This field is required'})}
                                                              placeholder="What is your addressable market? (this is the revenue opportunity available to your product/services)"
                                                              defaultValue={hasMarketing() ? startup.market.addressable_market : ''}
                                                              className="full-width" name="addressable_market" id=""
                                                              rows="4"/>
                                                    {errors.addressable_market &&
                                                    <ErrorSpan>{errors.addressable_market.message}</ErrorSpan>}
                                                </div>

                                                <div className="input-group-container">
                                                    <input type="text"
                                                           ref={register({required: 'This field is required'})}
                                                           placeholder="Target market percentage?"
                                                           defaultValue={hasMarketing() ? startup.market.percentage_of_market : ''}
                                                           className="full-width" name="percentage_of_market"/>
                                                    {errors.percentage_of_market &&
                                                    <ErrorSpan>{errors.percentage_of_market.message}</ErrorSpan>}
                                                </div>

                                                <div className="input-group-container">
                                                    <textarea ref={register({required: 'This field is required'})}
                                                              placeholder="Marketing strategy"
                                                              defaultValue={hasMarketing() ? startup.market.marketing_strategy : ''}
                                                              className="full-width" name="marketing_strategy" id=""
                                                              rows="4"/>
                                                    {errors.marketing_strategy &&
                                                    <ErrorSpan>{errors.marketing_strategy.message}</ErrorSpan>}
                                                </div>

                                                <div className="input-group-container">
                                                    <textarea ref={register({required: 'This field is required'})}
                                                              placeholder="Who are your competitors?"
                                                              defaultValue={hasMarketing() ? startup.market.company_competitors : ''}
                                                              className="full-width" name="company_competitors" id=""
                                                              rows="4"/>
                                                    {errors.company_competitors &&
                                                    <ErrorSpan>{errors.company_competitors.message}</ErrorSpan>}
                                                </div>

                                                <div className="input-group-container">
                                                <textarea ref={register({required: 'This field is required'})}
                                                          placeholder="What gives you competitive advantage?"
                                                          defaultValue={hasMarketing() ? startup.market.competitive_advantage : ''}
                                                          className="full-width" name="competitive_advantage" id=""
                                                          rows="4"/>
                                                    {errors.competitive_advantage &&
                                                    <ErrorSpan>{errors.competitive_advantage.message}</ErrorSpan>}
                                                </div>
                                            </div>
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
    </>
}