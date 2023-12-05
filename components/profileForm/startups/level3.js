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

const Level3 = ({startup, isEditingLevel}) => {
    const {register, handleSubmit} = useForm();

    const dispatch = useDispatch();
    const products = () => {
        if (startup.level && startup.level.hasOwnProperty('products')) {
            let prob = JSON.parse(startup.level.products);
            if (prob && prob.length > 0) {
                return prob.map(p => p.split('::')[0])
            }
            return []
        }
        return [];
    }

    const nextPageHandler = async data => {
        if (data.products.length === 0) {
            dispatch(showNotifier('Please choose at least one option', 'danger'));
            return;
        }
        dispatch(loader());
        try {
            const {data: response} = await axiosInstance.post('startups/level', {products: JSON.stringify(data.products), profile_stage: 4}, {
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

                                <InfoBox heading="Products" text="Do you have a well developed products and feedback mechanics?"/>

                                <form onSubmit={handleSubmit(nextPageHandler)} className="profile-details">
                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="products"
                                               defaultChecked={products().includes('PR1')}
                                               value="PR1::We have the capability of building a lo-fi prototype but don't have one yet."/>
                                        <span className="checkout-custom"/>
                                        We have the capability of building a lo-fi prototype but don't have one yet.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="products"
                                               defaultChecked={products().includes('PR2')}
                                               value="PR2::We have successfully developed a lo-fi prototype."/>
                                        <span className="checkout-custom"/>
                                        Our team have successfully developed a lo-fi prototype.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="products"
                                               defaultChecked={products().includes('PR3')}
                                               value="PR3::We have successfully developed a functional prototype (after rigour testing) with product roadmap for upgrades."/>
                                        <span className="checkout-custom"/>
                                        We have successfully developed a functional prototype (after rigour testing) with product roadmap for upgrades.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="products"
                                               defaultChecked={products().includes('PR4')}
                                               value="PR4::We have a good knowledge of product management and its costing."/>
                                        <span className="checkout-custom"/>
                                        We have a good knowledge of product management and its costing.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="products"
                                               defaultChecked={products().includes('PR5')}
                                               value="PR5::Our product (solution) is almost ready for market distribution."/>
                                        <span className="checkout-custom"/>
                                        Our product (solution) is almost ready for market distribution.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="products"
                                               defaultChecked={products().includes('PR6')}
                                               value="PR6::Our product is complete and in mainstream market. We are currently collecting feedback for product enhancement."/>
                                        <span className="checkout-custom"/>
                                        Our product is complete and in mainstream market. We are currently collecting feedback for product enhancement.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="products"
                                               defaultChecked={products().includes('PR7')}
                                               value="PR7::With feedback collected, we have started developing new product propositions."/>
                                        <span className="checkout-custom"/>
                                        With feedback collected, we have started developing new product propositions.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="products"
                                               defaultChecked={products().includes('PR8')}
                                               value="PR8::With new product propositions, we are ready for substantial growth."/>
                                        <span className="checkout-custom"/>
                                        With new product propositions, we are ready for substantial growth.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="products"
                                               defaultChecked={products().includes('PR9')}
                                               value="PR9::Our product is identified as an industry leader because of our product offerings."/>
                                        <span className="checkout-custom"/>
                                        Our product is identified as an industry leader because of our product offerings.
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

export default Level3;