import React from "react";
import InfoBox from "./InfoBox";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import LevelButtonsComponent from "./LevelButtons";
import LevelHeader from "./LevelHeader";
import {loader} from "../../../store/actions/loader";
import axiosInstance from "../../../config/axios";
import Token from "../../../utils/Token";
import {showNotifier} from "../../../store/actions/notifier";
import Router from "next/router";
import {setStartupData} from "../../../store/actions/startupProfile";

const Level8 = ({startup, isEditingLevel}) => {
    const {register, handleSubmit} = useForm();

    const dispatch = useDispatch();

    const investorExit = () => {
        if (startup.level && startup.level.hasOwnProperty('investor_exit')) {
            let prob = JSON.parse(startup.level.investor_exit);
            if (prob && prob.length > 0) {
                return prob.map(p => p.split('::')[0])
            }
            return []
        }
        return [];
    }

    const nextPageHandler = async data => {
        if (data.investor_exit.length === 0) {
            dispatch(showNotifier('Please choose at least one option', 'danger'));
            return;
        }
        dispatch(loader());
        try {
            const {data: response} = await axiosInstance.post('startups/level', {investor_exit: JSON.stringify(data.investor_exit), profile_stage: 8}, {
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
            Router.push('/profile/edit');
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

                                <InfoBox heading="Investor Exit"
                                         text="What proof do you have that provides liquidity to your investors?"/>

                                <form onSubmit={handleSubmit(nextPageHandler)} className="profile-details">

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="investor_exit"
                                               defaultChecked={investorExit().includes('I1')}
                                               value="I1::Our team understands the need for an investors exit plan because we recognize its significance to investors."/>
                                        <span className="checkout-custom"/>
                                        Our team understands the need for an investors exit plan because we recognize its significance to investors.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="investor_exit"
                                               defaultChecked={investorExit().includes('I2')}
                                               value="I2::Our team have a clear direction on how to provide liquidity to our investors."/>
                                        <span className="checkout-custom"/>
                                        Our team have a clear direction on how to provide liquidity to our investors.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="investor_exit"
                                               defaultChecked={investorExit().includes('I3')}
                                               value="I3::We have proof to shows business acquirers indicating interest in our business solution."/>
                                        <span className="checkout-custom"/>
                                        We have proof to shows business acquirers indicating interest in our business solution.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="investor_exit"
                                               defaultChecked={investorExit().includes('I4')}
                                               value="I4::There are track records of big companies making large financial commitment (investment) in our industry."/>
                                        <span className="checkout-custom"/>
                                        There are track records of big companies making large financial commitment (investment) in our industry.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="investor_exit"
                                               defaultChecked={investorExit().includes('I5')}
                                               value="I5::We're getting numerous requests from big potential acquirers indicating interest."/>
                                        <span className="checkout-custom"/>
                                        We're getting numerous requests from big potential acquirers indicating interest.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="investor_exit"
                                               defaultChecked={investorExit().includes('I6')}
                                               value="I6::Our team have spotted/picked certain business acquirers that have showed interest. Also we've identified other investor's exit options."/>
                                        <span className="checkout-custom"/>
                                        Our team have spotted/picked certain business acquirers that have showed interest. Also we've identified other investor's exit options.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="investor_exit"
                                               defaultChecked={investorExit().includes('I7')}
                                               value="I7::Our team have built good business relationships with various potential acquirers."/>
                                        <span className="checkout-custom"/>
                                        Our team have built good business relationships with various potential acquirers.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="investor_exit"
                                               defaultChecked={investorExit().includes('I8')}
                                               value="I8::We've previously declined acquisition offer made at us."/>
                                        <span className="checkout-custom"/>
                                        We've previously declined acquisition offer made at us.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="investor_exit"
                                               defaultChecked={investorExit().includes('I9')}
                                               value="I9::Our team is currently close to the last phase of an investor exit plan."/>
                                        <span className="checkout-custom"/>
                                        Our team is currently close to the last phase of an investor exit plan.
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

export default Level8;