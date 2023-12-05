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

const Level2 = ({startup, isEditingLevel}) => {
    const {register, handleSubmit} = useForm();

    const dispatch = useDispatch();

    const vision = () => {
        if (startup.level && startup.level.hasOwnProperty('vision')) {
            let prob = JSON.parse(startup.level.vision);
            if (prob && prob.length > 0) {
                return prob.map(p => p.split('::')[0])
            }
            return []
        }
        return [];
    }

    const nextPageHandler = async data => {
        if (data.vision.length === 0) {
            dispatch(showNotifier('Please choose at least one option', 'danger'));
            return;
        }
        dispatch(loader());
        try {
            const {data: response} = await axiosInstance.post('startups/level', {vision: JSON.stringify(data.vision), profile_stage: 3}, {
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

                                <InfoBox heading="Vision & Value Proposition"
                                         text="What are the proof that your product is needed by target customers?"/>

                                <form onSubmit={handleSubmit(nextPageHandler)} className="profile-details">
                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="vision"
                                               defaultChecked={vision().includes('V1')}
                                               value="V1::We have a vision to address the industry need."/>
                                        <span className="checkout-custom"/>
                                        We have a vision to address the industry need.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="vision"
                                               defaultChecked={vision().includes('V2')}
                                               value="V2::The rapid adoption of our solution by potential consumers proves we understand our consumers pain point."/>
                                        <span className="checkout-custom"/>
                                        The rapid adoption of our solution by potential consumers proves we understand our consumers pain point.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="vision"
                                               defaultChecked={vision().includes('V3')}
                                               value="V3::Customers are willing to pay a certain amount for our solution."/>
                                        <span className="checkout-custom"/>
                                        Customers are willing to pay a certain amount for our solution.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="vision"
                                               defaultChecked={vision().includes('V4')}
                                               value="V4::Our solution is currently preferred to other similar solution because of our superior offering."/>
                                        <span className="checkout-custom"/>
                                        Our solution is currently preferred to other solution because of our superior offering.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="vision"
                                               defaultChecked={vision().includes('V5')}
                                               value="V5::Our creative solution is loved and still used by our early target consumers."/>
                                        <span className="checkout-custom"/>
                                        Our creative solution is loved and still used by our early target consumers.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="vision"
                                               defaultChecked={vision().includes('V6')}
                                               value="V6::We have started making sales of beyond our initial customers."/>
                                        <span className="checkout-custom"/>
                                        We have started making sales of beyond our initial customers.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="vision"
                                               defaultChecked={vision().includes('V7')}
                                               value="V7::A lot of our sales now are primarily from returning customers."/>
                                        <span className="checkout-custom"/>
                                        A lot of our sales now are primarily from returning customers.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="vision"
                                               defaultChecked={vision().includes('V8')}
                                               value="V8::There is an increase in returning customers without a good deal of marketing effort."/>
                                        <span className="checkout-custom"/>
                                        There is an increase in returning customers without a good deal of marketing effort.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="vision"
                                               defaultChecked={vision().includes('V9')}
                                               value="V9::Our solution is identified as an industry leader in solving our industry need."/>
                                        <span className="checkout-custom"/>
                                        Our solution is identified as an industry leader in solving our industry need.
                                    </label>

                                    <LevelButtonsComponent nextHandler={handleSubmit(nextPageHandler)}/>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>;
}

export default Level2;