import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {loader} from "../../../store/actions/loader";
import axiosInstance from "../../../config/axios";
import Token from "../../../utils/Token";
import {decrementCurrentState, incrementCurrentState} from "../../../store/actions/profile";
import ErrorSpan from "../../UI/ErrorSpan";
import StartupProfileHeader from "./StartupProfileHeader";
import {setStartupData} from "../../../store/actions/startupProfile";

export default function ProfileThree({startup}) {
    const dispatch = useDispatch();

    const hasFinance = () => startup.hasOwnProperty('finance') && startup.finance;

    const savedCompanyProfileImage = useSelector(state => state.profile.companyProfileImage)
    const savedCompanyName = useSelector(state => state.profile.companyName)

    const {register, handleSubmit, errors} = useForm();
    const onSubmitHandler = async data => {
        dispatch(loader());
        try {
            const {data: response} = await axiosInstance.post('startups/finance', data, {
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
    }, []);

    return <>
        <section className="startup-levels">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="white-bg">
                            <div className="row">
                                <div className="col-md-9 mx-auto">
                                    <StartupProfileHeader/>

                                    <div className="d-md-none text-center">
                                        <h4>Finance</h4>
                                    </div>

                                    <form onSubmit={handleSubmit(onSubmitHandler)} className="profile-details">
                                        <div className="row">
                                            <div className="col-md-4 profile-pic text-center">
                                                <img className="img-fluid " src={savedCompanyProfileImage || startup.company.logo_url} alt=""/>
                                                <br/>
                                                <h5 className="mt-2">{savedCompanyName || startup.company.name}</h5>
                                            </div>

                                             <div className="col-md-8">
                                                 <div className="input-group-container">
                                                     <select name="revenue_type" ref={register({required: 'This field is required'})} className="mb-0" defaultValue={hasFinance() ? startup.finance.revenue_type : ''}>
                                                         <option value="">Revenue state</option>
                                                         <option value="Post revenue">Post Revenue</option>
                                                         <option value="Pre revenue">Pre Revenue</option>
                                                     </select>
                                                     {errors.revenue_type && <ErrorSpan>{errors.revenue_type.message}</ErrorSpan>}
                                                 </div>

                                                 <div className="input-group-container">
                                                     <select name="capital_needed_for" ref={register({required: 'This field is required'})} className="capital-select"
                                                             defaultValue={hasFinance() ? startup.finance.capital_needed_for : ''}>
                                                         <option value="">Capital Need</option>
                                                         <option value="Proof of concept">Proof of concept</option>
                                                         <option value="Working capital">Working capital</option>
                                                         <option value="Growth capital">Growth capital</option>
                                                         <option value="Bridging Capital">Bridging capital</option>
                                                     </select>
                                                     {errors.capital_needed_for && <ErrorSpan>{errors.capital_needed_for.message}</ErrorSpan>}
                                                 </div>

                                                 <div className="input-group-container">
                                                     <select name="business_size" ref={register({required: 'This field is required'})} defaultValue={hasFinance() ? startup.finance.business_size : ''}>
                                                         <option value="">Business size relative to capital need</option>
                                                         <option value="cannot value">No way to value current business worth</option>
                                                         <option value="less than capital needed">Current business worth less than capital needed</option>
                                                         <option value="more">Current business worth more than capital needed</option>
                                                     </select>
                                                     {errors.business_size && <ErrorSpan>{errors.business_size.message}</ErrorSpan>}
                                                 </div>

                                                 <div className="input-group-container">
                                                     <select name="cash_flow_projection" ref={register({required: 'This field is required'})} defaultValue={hasFinance() ? startup.finance.cash_flow_projection : ''}>
                                                         <option value="">Cash flow projections for investment</option>
                                                         <option value="positive currently">Cash flow positive currently</option>
                                                         <option value="positive during term of investment">Cash flow positive during term of investment</option>
                                                         <option value="uncertain">Very uncertain cashflow</option>
                                                         <option value="no positive cashflow">No projection for positive cashflow</option>
                                                     </select>
                                                     {errors.cash_flow_projection && <ErrorSpan>{errors.cash_flow_projection.message}</ErrorSpan>}
                                                 </div>

                                                 <div className="input-group-container">
                                                     <select name="growth_projection" ref={register({required: 'This field is required'})} defaultValue={hasFinance() ? startup.finance.growth_projection : ''}>
                                                         <option value="">What is your growth projection?</option>
                                                         <option value="No Growth Expected">No Growth Expected</option>
                                                         <option value="Stable Growth">Stable Growth</option>
                                                         <option value="High Growth">High Growth</option>
                                                         <option value="Exponential (J-Growth)">Exponential (J-Growth)</option>
                                                     </select>
                                                     {errors.growth_projection && <ErrorSpan>{errors.growth_projection.message}</ErrorSpan>}
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
            
        `}</style>
    </>
}