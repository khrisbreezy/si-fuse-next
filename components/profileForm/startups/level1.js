import React, {useEffect, useState} from "react";
import InfoBox from "./InfoBox";
import {useForm} from "react-hook-form";
import {incrementCurrentLevelState} from "../../../store/actions/profile";
import {useDispatch, useSelector} from "react-redux";
import LevelHeader from "./LevelHeader";
import LevelButtonsComponent from "./LevelButtons";
import {loader} from "../../../store/actions/loader";
import axiosInstance from "../../../config/axios";
import Token from "../../../utils/Token";
import {showNotifier} from "../../../store/actions/notifier";
import {setStartupData} from "../../../store/actions/startupProfile";
import Router from "next/router";

const Level1 = ({startup, isEditingLevel}) => {
    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm();

    const problem = () => {
        if (startup.level && startup.level.hasOwnProperty('problem')) {
            let prob = JSON.parse(startup.level.problem);
            if (prob && prob.length > 0) {
                return prob.map(p => p.split('::')[0])
            }
            return []
        }
        return [];
    }

    const nextPageHandler = async data => {
        if (data.problem.length === 0) {
            dispatch(showNotifier('Please choose at least one option', 'danger'));
            return;
        }
        dispatch(loader());
        try {
            const {data: response} = await axiosInstance.post('startups/level', {problem: JSON.stringify(data.problem), profile_stage: 2}, {
                headers: {
                    Authorization: `Bearer ${Token()}`
                }
            });
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

                                <InfoBox heading="Problem" text="We would like to know the industry need you're addressing"/>

                                <form onSubmit={handleSubmit(nextPageHandler)} className="profile-details">

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="problem"
                                               defaultChecked={problem().includes('P1')}
                                               value="P1::Our team have identified an important need that requires a solution."/>
                                        <span className="checkout-custom"/>
                                        Our team have identified an important need that requires a solution.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="problem"
                                               defaultChecked={problem().includes('P2')}
                                               value="P2::We can solve this identified need through our solution."/>
                                        <span className="checkout-custom"/>
                                        We can solve this identified need through our solution
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="problem"
                                               defaultChecked={problem().includes('P3')}
                                               value="P3::Our solution has a unique value proposition that stands it out from others."/>
                                        <span className="checkout-custom"/>
                                        Our solution has a unique value proposition that stands it out from others.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="problem"
                                               defaultChecked={problem().includes('P4')}
                                               value="P4::We are able to describe how important our solution is in industry transformation."/>
                                        <span className="checkout-custom"/>
                                        We are able to describe how important our solution is in industry transformation.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="problem"
                                               defaultChecked={problem().includes('P5')}
                                               value="P5::We can prove that our solution solves consumer's problem."/>
                                        <span className="checkout-custom"/>
                                        We can prove that our solution solves consumer's problem.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="problem"
                                               defaultChecked={problem().includes('P6')}
                                               value="P6::Our solution(s) is being used by early adopters and it is rapidly being adopted by consumers."/>
                                        <span className="checkout-custom"/>
                                        Our solution(s) is being used by early adopters and it is rapidly being adopted by consumers.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="problem"
                                               defaultChecked={problem().includes('P7')}
                                               value="P7::We have proof that our solution will be adopted in a large market."/>
                                        <span className="checkout-custom"/>
                                        We have proof that our solution will be adopted in a large market.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="problem"
                                               defaultChecked={problem().includes('P8')}
                                               value="P8::We are upgrading our solution to better address the current industry need."/>
                                        <span className="checkout-custom"/>
                                        We are upgrading our solution to better address the current industry need.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="problem"
                                               defaultChecked={problem().includes('P9')}
                                               value="P9::Our solution is considered a global leader in solving industry needs."/>
                                        <span className="checkout-custom"/>
                                        Our solution is considered a global leader in solving industry needs.
                                    </label>

                                    <LevelButtonsComponent noPrev nextHandler={handleSubmit(nextPageHandler)}/>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>;
}

export default Level1;