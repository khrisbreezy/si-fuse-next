import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {loader} from "../../../store/actions/loader";
import axiosInstance from "../../../config/axios";
import Token from "../../../utils/Token";
import {decrementCurrentState, incrementCurrentState} from "../../../store/actions/profile";
import StartupProfileHeader from "./StartupProfileHeader";
import ErrorSpan from "../../UI/ErrorSpan";
import AutoNumeric from 'autonumeric';
import {setStartupData} from "../../../store/actions/startupProfile";

export const ProfileFour = ({startup}) => {
    const dispatch = useDispatch();

    const hasFinance = () => startup.hasOwnProperty('finance') && startup.finance;

    const savedCompanyProfileImage = useSelector(state => state.profile.companyProfileImage)
    const savedCompanyName = useSelector(state => state.profile.companyName)

    const {register, handleSubmit, errors} = useForm();
    const onSubmitHandler = async data => {
        dispatch(loader());
        try {
            const {data: response} = await axiosInstance.post('startups/finance', {...data, profile_stage: 5}, {
                headers: {
                    Authorization: `Bearer ${Token()}`
                }
            });
            dispatch(setStartupData(response.data));
            dispatch(loader());
            dispatch(incrementCurrentState());
        } catch (e) {
            console.log(e);
            dispatch(loader());
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        new AutoNumeric('#invested-funding', {decimalPlaces: 0});
    }, []);

    const isNumberKey = evt => {
        const charCode = (evt.which) ? evt.which : evt.keyCode;
        if (charCode !== 46 && charCode > 31 && (charCode < 48 || charCode > 57))
            return false;
        return true;
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

                                    <div className="numbers d-md-none num-alone">
                                        <h4 className="text-center mb-3">Funding</h4>
                                    </div>

                                    <form onSubmit={handleSubmit(onSubmitHandler)} className="profile-details">
                                        <div className="row">
                                            <div className="col-md-4 text-center profile-pic">
                                                <img className="img-fluid "
                                                     src={savedCompanyProfileImage || startup.company.logo_url} alt=""/>
                                                <br/>
                                                <h5 className="mt-2">{savedCompanyName || startup.company.name}</h5>
                                            </div>

                                            <div className="col-md-8">
                                                <div className="input-group-container">
                                                    <div className="currency-input">
                                                        <input ref={register({required: 'This field is required'})}
                                                               // onKeyPress={isNumberKey}
                                                               defaultValue={hasFinance() ? startup.finance.invested_funding : ''}
                                                               className="full-width" type="text"
                                                               name="invested_funding" id="invested-funding"
                                                               placeholder="Investment amount till date"/>
                                                        {errors.invested_funding &&
                                                        <ErrorSpan>{errors.invested_funding.message}</ErrorSpan>}
                                                    </div>
                                                </div>

                                                {/*<div className="input-group-container">*/}
                                                {/*    <div className="currency-input">*/}
                                                {/*        <input ref={register} className="full-width" type="text" name="funding_needed" id=""*/}
                                                {/*               defaultValue={hasFinance() ? startup.finance.funding_needed : ''}*/}
                                                {/*               placeholder="What is your ask?"/>*/}
                                                {/*    </div>*/}
                                                {/*</div>*/}

                                                <div className="input-group-container">
                                                    <select name="funding_stage"
                                                            ref={register({required: 'This field is required'})}
                                                            defaultValue={hasFinance() ? startup.finance.funding_stage : ''}>
                                                        <option value="">What is your current funding stage?</option>
                                                        <option value="Ideation">Ideation</option>
                                                        <option value="Seed stage">Seed stage</option>
                                                        <option value="Early stage">Early stage</option>
                                                        <option value="Late stage">Late stage</option>
                                                    </select>
                                                    {errors.funding_stage &&
                                                    <ErrorSpan>{errors.funding_stage.message}</ErrorSpan>}
                                                </div>

                                                <div className="input-group-container">
                                                    <select name="investment_ask"
                                                            ref={register({required: 'This field is required'})}
                                                            defaultValue={hasFinance() ? startup.finance.investment_ask : ''}>
                                                        <option value="">What is your investment ask?</option>
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
                                                    {errors.investment_ask &&
                                                    <ErrorSpan>{errors.investment_ask.message}</ErrorSpan>}
                                                </div>

                                                <div className="input-group-container">
                                                    <select name="geographical_focus" id=""
                                                            ref={register({required: 'This field is required'})}
                                                            defaultValue={hasFinance() ? startup.finance.geographical_focus : ''}>
                                                        <option value="">Geographical focus</option>
                                                        <option value="North Africa">North Africa</option>
                                                        <option value="East Africa">East Africa</option>
                                                        <option value="South Africa">South Africa</option>
                                                        <option value="West Africa">West Africa</option>
                                                        <option value="Central Africa">Central Africa</option>
                                                    </select>
                                                    {errors.geographical_focus &&
                                                    <ErrorSpan>{errors.geographical_focus.message}</ErrorSpan>}
                                                </div>

                                                <div className="input-group-container">
                                                    <select name="investor_type" id=""
                                                            ref={register({required: 'This field is required'})}
                                                            defaultValue={hasFinance() ? startup.finance.investor_type : ''}>
                                                        <option value="">What type of Investor are you looking for?
                                                        </option>
                                                        <option value="Any">Any</option>
                                                        <option value="Venture Capital">Venture Capital</option>
                                                        <option value="Angel Investor">Angel Investor</option>
                                                        <option value="Private Equity">Private Equity</option>
                                                        <option value="Financial Institute">Financial Institute</option>
                                                        <option value="Crowd Funding">Crowd Funding</option>
                                                    </select>
                                                    {errors.investor_type &&
                                                    <ErrorSpan>{errors.investor_type.message}</ErrorSpan>}
                                                </div>

                                                <div className="input-group-container">
                                                    <select name="interested_in_mentor" id=""
                                                            ref={register({required: 'This field is required'})}
                                                            defaultValue={hasFinance() ? startup.finance.interested_in_mentor : ''}>
                                                        <option value="">Are you interested in a mentor?</option>
                                                        <option value="yes">Yes</option>
                                                        <option value="no">No</option>
                                                    </select>
                                                    {errors.interested_in_mentor &&
                                                    <ErrorSpan>{errors.interested_in_mentor.message}</ErrorSpan>}
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

        <style jsx>{`
            .capital-select {
                margin-top: 4rem;
            }
        `}</style>
    </>
}