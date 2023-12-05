import React from "react";
import InfoBox from "./InfoBox";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {incrementCurrentLevelState} from "../../../store/actions/profile";
import LevelButtonsComponent from "./LevelButtons";
import LevelHeader from "./LevelHeader";
import {loader} from "../../../store/actions/loader";
import axiosInstance from "../../../config/axios";
import Token from "../../../utils/Token";
import {showNotifier} from "../../../store/actions/notifier";
import {setStartupData} from "../../../store/actions/startupProfile";
import Router from "next/router";

const Level5 = ({startup, isEditingLevel}) => {
    const {register, handleSubmit} = useForm();

    const dispatch = useDispatch();

    const businessModel = () => {
        if (startup.level && startup.level.hasOwnProperty('business_model')) {
            let prob = JSON.parse(startup.level.business_model);
            if (prob && prob.length > 0) {
                return prob.map(p => p.split('::')[0])
            }
            return []
        }
        return [];
    }

    const nextPageHandler = async data => {
        if (data.business_model.length === 0) {
            dispatch(showNotifier('Please choose at least one option', 'danger'));
            return;
        }
        dispatch(loader());
        try {
            const {data: response} = await axiosInstance.post('startups/level', {business_model: JSON.stringify(data.business_model), profile_stage: 6}, {
                headers: {
                    Authorization: `Bearer ${Token()}`
                }
            })
            dispatch(setStartupData(response.data));
            dispatch(loader());
            if (isEditingLevel) {
                Router.push('/profile');
                return;
            }
            dispatch(incrementCurrentLevelState());
        } catch (e) {
            console.log(e);
            dispatch(loader());
        }
    }

    return <section className="startup-levels">
        <div className="container">
            <div className="row">
                <div className="col">
                    <div className="white-bg">
                        <div className="row">
                            <div className="col-md-9 mx-auto">
                                {!isEditingLevel && <LevelHeader isLevel/>}

                                <InfoBox heading="Business Model" text="What proof do you have that validates your business model?"/>

                                <form onSubmit={handleSubmit(nextPageHandler)} className="profile-details">

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="business_model"
                                               defaultChecked={businessModel().includes('BM1')}
                                               value="BM1::We have a well defined model for revenue generation."/>
                                        <span className="checkout-custom"/>
                                        We have a well defined model for revenue generation.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="business_model"
                                               defaultChecked={businessModel().includes('BM2')}
                                               value="BM2::Current industry price of our solution backs our model for revenue generation."/>
                                        <span className="checkout-custom"/>
                                        Current industry price of our solution backs our model for revenue generation.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="business_model"
                                               defaultChecked={businessModel().includes('BM3')}
                                               value="BM3::Our business model allows for clear costing for our solution."/>
                                        <span className="checkout-custom"/>
                                        Our business model allows for clear costing for our solution.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="business_model"
                                               defaultChecked={businessModel().includes('BM4')}
                                               value="BM4::Our team have outline revenue and cost projections with strategic approach to achieving them."/>
                                        <span className="checkout-custom"/>
                                        Our team have outline revenue and cost projections with strategic approach to achieving them.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="business_model"
                                               defaultChecked={businessModel().includes('BM5')}
                                               value="BM5::Our current costing validates a positive projections of company's performance."/>
                                        <span className="checkout-custom"/>
                                        Our current costing validates a positive projections of company's performance.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="business_model"
                                               defaultChecked={businessModel().includes('BM6')}
                                               value="BM6::Our cost for acquiring a customer is low while pricing is on the increase."/>
                                        <span className="checkout-custom"/>
                                        Our cost for acquiring a customer is low while pricing is on the increase.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="business_model"
                                               defaultChecked={businessModel().includes('BM7')}
                                               value="BM7::Our business model for revenue generation have been tested. And we certainly have a strong unit economics."/>
                                        <span className="checkout-custom"/>
                                        Our business model for revenue generation have been tested. And we certainly have a strong unit economics.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="business_model"
                                               defaultChecked={businessModel().includes('BM8')}
                                               value="BM8::Our growth monthly is fast with a well thought out route to profitability."/>
                                        <span className="checkout-custom"/>
                                        Our growth monthly is fast with a well thought out route to profitability.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="business_model"
                                               defaultChecked={businessModel().includes('BM9')}
                                               value="BM9::Revenue generated has surpassed our investors' expectations for a number of years."/>
                                        <span className="checkout-custom"/>
                                        Revenue generated has surpassed our investors' expectations for a number of years.
                                    </label>

                                    <LevelButtonsComponent nextHandler={handleSubmit(nextPageHandler)}/>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
;
}

export default Level5;