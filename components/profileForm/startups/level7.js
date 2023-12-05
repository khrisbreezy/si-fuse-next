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
import {incrementCurrentLevelState} from "../../../store/actions/profile";
import {setStartupData} from "../../../store/actions/startupProfile";
import Router from "next/router";

const Level7 = ({startup, isEditingLevel}) => {
    const {register, handleSubmit} = useForm();

    const dispatch = useDispatch();

    const scale = () => {
        if (startup.level && startup.level.hasOwnProperty('scale')) {
            let prob = JSON.parse(startup.level.scale);
            if (prob && prob.length > 0) {
                return prob.map(p => p.split('::')[0])
            }
            return []
        }
        return [];
    }

    const nextPageHandler = async data => {
        if (data.scale.length === 0) {
            dispatch(showNotifier('Please choose at least one option', 'danger'));
            return;
        }
        dispatch(loader());
        try {
            const {data: response} = await axiosInstance.post('startups/level', {scale: JSON.stringify(data.scale), profile_stage: 8}, {
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

                                <InfoBox heading="Scale" text="What scale are you operating at?"/>

                                <form onSubmit={handleSubmit(nextPageHandler)} className="profile-details">

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="scale"
                                               defaultChecked={scale().includes('S1')}
                                               value="S1::We’ve recognized a couple viable markets or consumer segments that would drive scalability and growth."/>
                                        <span className="checkout-custom"/>
                                        We’ve recognized a couple viable markets or consumer segments that would drive scalability and growth.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="scale"
                                               defaultChecked={scale().includes('S2')}
                                               value="S2::We have proof that several markets experiences the problem our creative solution solves."/>
                                        <span className="checkout-custom"/>
                                        We have proof that several markets experiences the problem our creative solution solves.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="scale"
                                               defaultChecked={scale().includes('S3')}
                                               value="S3::We have a clear strategic approach for penetration/scaling into several identified markets."/>
                                        <span className="checkout-custom"/>
                                        We have a clear strategic approach for penetration/scaling into several identified markets.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="scale"
                                               defaultChecked={scale().includes('S4')}
                                               value="S4::Customers in several identified markets see value in our solution and are willing to pay our fee."/>
                                        <span className="checkout-custom"/>
                                        Customers in several identified markets see value in our solution and are willing to pay our fee.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="scale"
                                               defaultChecked={scale().includes('S5')}
                                               value="S5::Our business model (company's performance) have been favourable in at least two identified markets."/>
                                        <span className="checkout-custom"/>
                                        Our business model (company's performance) have been favourable in at least two identified markets.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="scale"
                                               defaultChecked={scale().includes('S6')}
                                               value="S6::We’ve cleared regulatory issues and have a clear IP strategy."/>
                                        <span className="checkout-custom"/>
                                        We’ve cleared regulatory issues and have a clear IP strategy.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="scale"
                                               defaultChecked={scale().includes('S7')}
                                               value="S7::Our business model (company's performance) have been wonderful at several identified markets."/>
                                        <span className="checkout-custom"/>
                                        Our business model (company's performance) have been wonderful at several identified markets.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="scale"
                                               defaultChecked={scale().includes('S8')}
                                               value="S8::The growth in our consumer base is increasing rapidly monthly."/>
                                        <span className="checkout-custom"/>
                                        The growth in our consumer base is increasing rapidly monthly.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="scale"
                                               defaultChecked={scale().includes('S9')}
                                               value="S9::Our business model (company's performance) is good to be replicated at several markets or consumer segments."/>
                                        <span className="checkout-custom"/>
                                        Our business model (company's performance) is good to be replicated at several markets or consumer segments.
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

export default Level7;