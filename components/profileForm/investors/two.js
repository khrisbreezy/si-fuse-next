import {useForm} from "react-hook-form";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loader} from "../../../store/actions/loader";
import axiosInstance from "../../../config/axios";
import Token from "../../../utils/Token";
import {decrementCurrentState, incrementCurrentState} from "../../../store/actions/profile";
import ErrorSpan from "../../UI/ErrorSpan";
import InvestorProfileHeader from "./InvestorProfileHeader";
import Select from "react-select";
import {setInvestorProfile} from "../../../store/actions/investorProfile";

const InvestorPreference = ({investor, industries, stages}) => {
    console.log(investor);
    const interests = investor.interests;

    const {register, handleSubmit, errors} = useForm();

    const dispatch = useDispatch();

    const gFocus = [
        {value: 'North Africa', label: 'North Africa'},
        {value: 'East Africa', label: 'East Africa'},
        {value: 'South Africa', label: 'South Africa'},
        {value: 'West Africa', label: 'West Africa'},
        {value: 'Central Africa', label: 'Central Africa'}
    ];

    const socialDistancingOptions = [
        {value: 'Online events & demo days', label: 'Online events & demo days'},
        {value: 'Crunchbase', label: 'Crunchbase'},
        {value: 'Linkedin', label: 'Linkedin'},
        {value: 'Referrals', label: 'Referrals'},
        {value: 'Investor network', label: 'Investor network'},
        {value: 'Business Angel networks like ABAN', label: 'Business Angel networks like ABAN'},
        {value: 'Existing channels', label: 'Existing channels'},
    ];

    const investmentTypeOptions = [
        {value: 'Equity', label: 'Equity'},
        {value: 'SAFE', label: 'SAFE'},
        {value: 'Debt Financing', label: 'Debt Financing'},
        {value: 'Convertible Notes', label: 'Convertible Notes'},
        {value: 'Grants', label: 'Grants'},
    ];

    const defaultSocialDistancing = (interests && JSON.parse(interests.dealflow_channel)) ? JSON.parse(interests.dealflow_channel)
        .map(df => socialDistancingOptions.find(sdo => sdo.value === df)) : [];
    const defaultInvestmentType = (interests && JSON.parse(interests.investment_type)) ? JSON.parse(interests.investment_type)
        .map(df => investmentTypeOptions.find(sdo => sdo.value === df)) : [];
    const defaultGeographicalFocus = (interests && JSON.parse(interests.geographical_focus)) ? JSON.parse(interests.geographical_focus)
        .map(df => gFocus.find(sdo => sdo.value === df)) : [];
    const defaultStartupStage = (interests && JSON.parse(interests.investment_stage_id)) ? JSON.parse(interests.investment_stage_id)
        .map(df => {
            const theStage = stages.find(stage => stage.id == df);
            return {label: theStage.stage, value: theStage.id}
        }) : [];
    const defaultIndustryFocus = (interests && JSON.parse(interests.industry_ids)) ? JSON.parse(interests.industry_ids)
        .map(df => {
            const gf = industries.find(industry => industry.id == df);
            return {label: gf.industry, value: gf.id}
        }) : [];

    const savedInvestorProfileImage = useSelector(state => state.profile.investorProfileImage);
    const savedInvestorProfileName = useSelector(state => state.profile.investorProfileName);
    const [industryFocus, setIndustryFocus] = useState(interests ? (JSON.parse(interests.industry_ids) || []): []);
    const [industryError, setIndustryError] = useState('');
    const [geographyFocus, setGeographyFocus] = useState(interests ? (JSON.parse(interests.geographical_focus) || []): []);
    const [geographyError, setGeographyError] = useState('');
    const [startupStage, setStartupStage] = useState(interests ? (JSON.parse(interests.investment_stage_id) || []): []);
    const [startupStageError, setStartupStageError] = useState('');
    const [socialDistancingChannels, setSocialDistancingChannels] = useState(interests ? (JSON.parse(interests.dealflow_channel) ||[]): []);
    const [socialDistancingChannelsError, setSocialDistancingChannelsError] = useState('');
    const [investmentTypes, setInvestmentTypes] = useState(interests ? (JSON.parse(interests.investment_type) || []): []);
    const [investmentTypesError, setInvestmentTypesError] = useState('');

    const onSubmitHandler = async data => {
        setIndustryError('');
        setGeographyError('');
        setStartupStageError('');
        setSocialDistancingChannelsError('');
        setInvestmentTypesError('');

        if (industryFocus.length === 0) {
            setIndustryError('This field is required');
            return;
        }
        if (geographyFocus.length === 0) {
            setGeographyError('This field is required');
            return;
        }
        if (startupStage.length === 0) {
            setStartupStageError('This field is required');
            return;
        }
        if (socialDistancingChannels.length === 0) {
            setSocialDistancingChannelsError('This field is required');
            return;
        }
        if (investmentTypes.length === 0) {
            setInvestmentTypesError('This field is required');
            return;
        }

        data = {...data, industry_ids: industryFocus, geographical_focus: geographyFocus, investment_stage_id: startupStage, dealflow_channel: socialDistancingChannels, investment_type: investmentTypes};

        dispatch(loader());
        try {
            const {data: response} = await axiosInstance.post('investors/interest', data, {
                headers: {
                    Authorization: `Bearer ${Token()}`
                }
            });
            dispatch(setInvestorProfile(response.data));
            dispatch(loader());
            dispatch(incrementCurrentState());
        } catch (e) {
            dispatch(loader());
            console.log(e);
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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
                                        <h4 className="text-center mb-3">Investment Composition</h4>
                                    </div>

                                    <form onSubmit={handleSubmit(onSubmitHandler)} className="profile-details">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <img className="img-fluid" src={savedInvestorProfileImage || (investor.profile ? investor.profile.profile_pic_url : '')} alt=""/>
                                                <br/>
                                                <h5 className="mt-2 text-center">{savedInvestorProfileName || (investor.profile ? (investor.profile.user.first_name + ' ' + investor.profile.user.last_name) : '')}</h5>
                                            </div>

                                            <div className="col-md-8">
                                                <div className="input-group-container">
                                                    <Select
                                                        className="multi-select"
                                                        placeholder="Industry Focus"
                                                        options={industries.map(({industry, id}) => ({value: id, label: industry}))}
                                                        defaultValue={defaultIndustryFocus}
                                                        onChange={(val) => setIndustryFocus(val ? val.map(v => v.value) : [])}
                                                        isMulti
                                                    />
                                                    {industryError && <ErrorSpan>{industryError}</ErrorSpan>}
                                                </div>

                                                <div className="input-group-container">
                                                    <select name="investor_type"
                                                            defaultValue={hasInterests() ? investor.interests.investor_type : ''}
                                                            ref={register}>
                                                        <option value="">What kind of investor are you?</option>
                                                        <option value="Any">Any</option>
                                                        <option value="Venture Capital">Venture Capital</option>
                                                        <option value="Angel Investor">Angel Investor</option>
                                                        <option value="Private Equity">Private Equity</option>
                                                        <option value="Financial Institute">Financial Institute</option>
                                                        <option value="Crowd Funding">Crowd Funding</option>
                                                    </select>
                                                </div>

                                                <div className="input-group-container">
                                                    <Select
                                                        className="multi-select"
                                                        placeholder="Geographical Focus"
                                                        options={gFocus}
                                                        defaultValue={defaultGeographicalFocus}
                                                        onChange={(val) => setGeographyFocus(val ? val.map(v => v.value) : [])}
                                                        isMulti
                                                    />
                                                    {geographyError && <ErrorSpan>{geographyError}</ErrorSpan>}
                                                </div>

                                                <div className="input-group-container">
                                                    <Select
                                                        className="multi-select"
                                                        placeholder="Target Startup Stage"
                                                        options={stages.map(({stage, id}) => ({label: stage, value: id}))}
                                                        defaultValue={defaultStartupStage}
                                                        onChange={(val) => setStartupStage(val ? val.map(v => v.value) : [])}
                                                        isMulti
                                                    />
                                                    {startupStageError && <ErrorSpan>{startupStageError}</ErrorSpan>}
                                                </div>

                                                <div className="input-group-container">
                                                    <select name="covid_impact"
                                                            className="covid-impact"
                                                            defaultValue={hasInterests() ? investor.interests.covid_impact : ''} ref={register}>
                                                        <option value="">COVID-19 impact on investments</option>
                                                        <option value="negative">Negative</option>
                                                        <option value="positive">Positive</option>
                                                        <option value="no impact at all">No impact at all</option>
                                                    </select>
                                                </div>

                                                <div className="input-group-container">
                                                    <select name="investor_objective"
                                                            defaultValue={hasInterests() ? investor.interests.investor_objective : ''}
                                                            ref={register}>
                                                        <option value="">Your aim when meeting a startup</option>
                                                        <option value="Get to know the business opportunities">Get to know the business
                                                            opportunities
                                                        </option>
                                                        <option value="Get to know the person">Get to know the person</option>
                                                        <option value="Learn about the product and services">Learn about the product and
                                                            services
                                                        </option>
                                                        <option value="Build Relationship">Build Relationship</option>
                                                        <option value="Learn more about the specific sector">Learn more about the specific
                                                            sector
                                                        </option>
                                                        <option value="Understanding the team and culture">Understanding the team and culture
                                                        </option>
                                                    </select>
                                                </div>

                                                <div className="input-group-container">
                                                    <select name="decision_time"
                                                            defaultValue={hasInterests() ? investor.interests.decision_time : ''}
                                                            ref={register}>
                                                        <option value="">Investment decision duration</option>
                                                        <option value="< 1 Month">&lt; 1 Month</option>
                                                        <option value="1 - 3 Months">1 - 3 Months</option>
                                                        <option value="3 - 6 Months">3 - 6 Months</option>
                                                        <option value="> 6 Months">&gt; 6 Months</option>
                                                    </select>
                                                </div>

                                                <div className="input-group-container">
                                                    <select name="critical_decision_factor"
                                                            defaultValue={hasInterests() ? investor.interests.critical_decision_factor : ''}
                                                            ref={register}>
                                                        <option value="">Most critical decision factor?</option>
                                                        <option value="Founder’s ability to adapt into this new situation">Founder’s ability to
                                                            adapt into this new situation
                                                        </option>
                                                        <option value="The likeability of the founder(s)">The likeability of the founder(s)
                                                        </option>
                                                        <option value="Sales or growth projections">Sales or growth projections</option>
                                                        <option value="Shareholder and investor references">Shareholder and investor
                                                            references
                                                        </option>
                                                        <option value="Traction">Traction</option>
                                                        <option value="Good quality materials">Good quality materials</option>
                                                        <option value="Due diligence">Due diligence</option>
                                                        <option value="Online demo">Online demo</option>
                                                    </select>
                                                </div>

                                                <div className="input-group-container">
                                                    <Select
                                                        className="multi-select"
                                                        placeholder="Social distancing dealflow channels?"
                                                        options={socialDistancingOptions}
                                                        defaultValue={defaultSocialDistancing}
                                                        onChange={(val) => setSocialDistancingChannels(val ? val.map(v => v.value) : [])}
                                                        isMulti
                                                    />
                                                    {socialDistancingChannelsError && <ErrorSpan>{socialDistancingChannelsError}</ErrorSpan>}
                                                </div>

                                                <div className="input-group-container">
                                                    <select name="investment_range"
                                                            defaultValue={hasInterests() ? investor.interests.investment_range : ''}
                                                            ref={register}>
                                                        <option value="">Investment Range</option>
                                                        <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                                                        <option value="$10,000 - $50,000">$10,000 - $50,000</option>
                                                        <option value="$50,000 - $100,000">$50,000 - $100,000</option>
                                                        <option value="$100,000 - $250,000">$100,000 - $250,000</option>
                                                        <option value="$250,000 - $1,000,000">$250,000 - $1,000,000</option>
                                                        <option value="$1,000,000 - $2,000,000">$1,000,000 - $2,000,000</option>
                                                        <option value="$2,000,000 and above">$2,000,000 and above</option>
                                                    </select>
                                                </div>

                                                <div className="input-group-container">
                                                    <Select
                                                        className="multi-select"
                                                        placeholder="Investment Type"
                                                        options={investmentTypeOptions}
                                                        defaultValue={defaultInvestmentType}
                                                        onChange={(val) => setInvestmentTypes(val ? val.map(v => v.value) : [])}
                                                        isMulti
                                                    />
                                                    {investmentTypesError && <ErrorSpan>{investmentTypesError}</ErrorSpan>}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-flex">
                                            <button className="btn prev mr-auto" onClick={() => dispatch(decrementCurrentState())} type="button">
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
            // .input-group-container {
            //     display: flex;
            //     flex-direction: column;
            //     margin-bottom: 0;
            // }
            // input, select, textarea {
            //     margin-bottom: 0!important;
            //     margin-top: 4rem;
            // }
            // .btn {
            //     margin-top: 4rem;
            // }
            // input.country-code {
            //     width: 90%;
            // }
            // .industry-label, about-label {
            //     margin-top: 4rem;
            // }
            // .profile-pic {
            //     cursor:pointer;
            //     width: 300px;
            // }
        `}</style>
    </>

}

export default InvestorPreference;
