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

const Level4 = ({startup, isEditingLevel}) => {
    const {register, handleSubmit} = useForm();

    const dispatch = useDispatch();

    const market = () => {
        if (startup.level && startup.level.hasOwnProperty('market')) {
            let prob = JSON.parse(startup.level.market);
            if (prob && prob.length > 0) {
                return prob.map(p => p.split('::')[0])
            }
            return []
        }
        return [];
    }

    const nextPageHandler = async data => {
        if (data.market.length === 0) {
            dispatch(showNotifier('Please choose at least one option', 'danger'));
            return;
        }
        dispatch(loader());
        try {
            const {data: response} = await axiosInstance.post('startups/level', {market: JSON.stringify(data.market), profile_stage: 5}, {
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

                                <InfoBox heading="Market" text="What are your proof that a large pool of customers experiences this problem?"/>

                                <form onSubmit={handleSubmit(nextPageHandler)} className="profile-details">
                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="market"
                                               defaultChecked={market().includes('M1')}
                                               value="M1::We know our potential market size and the market share allocated to us."/>
                                        <span className="checkout-custom"/>
                                        We know our potential market size and the market share allocated to us.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="market"
                                               defaultChecked={market().includes('M2')}
                                               value="M2::We know the relevant regulations that binds our market & have a strategic approach for compliance."/>
                                        <span className="checkout-custom"/>
                                        We know the relevant regulations that binds our market & have a strategic approach for compliance.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="market"
                                               defaultChecked={market().includes('M3')}
                                               value="M3::Initial sales income shows that we offer value to our target market."/>
                                        <span className="checkout-custom"/>
                                        Initial sales income shows that we offer value to our target market.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="market"
                                               defaultChecked={market().includes('M4')}
                                               value="M4::We have proof that our overall potential market is over $1M."/>
                                        <span className="checkout-custom"/>
                                        We have proof that our overall potential market is over $1M.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="market"
                                               defaultChecked={market().includes('M5')}
                                               value="M5::Large-scale businesses/partners have showed interest in the distribution, marketing, sales, etc., of our products."/>
                                        <span className="checkout-custom"/>
                                        Large-scale businesses/partners have showed interest in the distribution, marketing, sales, etc., of our products.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="market"
                                               defaultChecked={market().includes('M6')}
                                               value="M6::Our suppliers & vendors have made significant profits from our product's success."/>
                                        <span className="checkout-custom"/>
                                        Our suppliers & vendors have made significant profits from our product's success.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="market"
                                               defaultChecked={market().includes('M7')}
                                               value="M7::We have a strong sales strategy for our products that surpasses industry standard."/>
                                        <span className="checkout-custom"/>
                                        We have a strong sales strategy for our products that surpasses industry standard.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="market"
                                               defaultChecked={market().includes('M8')}
                                               value="M8::We have strong partnership for distribution, marketing and business growth."/>
                                        <span className="checkout-custom"/>
                                        We have strong partnership for distribution, marketing and business growth.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="market"
                                               defaultChecked={market().includes('M9')}
                                               value="M9::We have a clear vision on how we want to dominate the industry with our product."/>
                                        <span className="checkout-custom"/>
                                        We have a clear vision on how we want to dominate the industry with our product.
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

export default Level4;