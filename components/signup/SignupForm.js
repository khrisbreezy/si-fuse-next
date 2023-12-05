import Link from "next/link";
import {useForm} from "react-hook-form";
import Error from "../UI/ErrorSpan";
import axiosInstance from "../../config/axios";
import {useDispatch} from "react-redux";
import toggleLoading from "../../store/reducers/loader";
import {loader} from "../../store/actions/loader";
import React, {useState} from "react";
import {storeAuth} from "../../store/actions/auth";
import Router from "next/router";
import {showNotifier} from "../../store/actions/notifier";

export default function SignupForm({countries, userTypes, query}) {
    const {register, handleSubmit, errors, watch} = useForm();
    const dispatch = useDispatch();
    const [accountType, setAccountType] = useState(query && query.hasOwnProperty('for') ? (query.for === 'investors' ? 1 : 2) : null);

    const signupHandler = async formData => {
        dispatch(loader());
        try {
            const {data} = await axiosInstance.post('signup', {...formData, user_type_id: accountType});
            dispatch(storeAuth(data))
            dispatch(showNotifier('Account registration successful!'));
            dispatch(loader());
            const redirectToEvent = localStorage.getItem('redirectBackToEvents');
            if (redirectToEvent) {
                localStorage.removeItem('redirectBackToEvents');
                Router.push(redirectToEvent);
                return;
            }
            if (accountType === 2) {
                Router.push('/profile/edit-levels');
            } else {
                Router.push('/profile/edit');
            }
        } catch (e) {
            dispatch(loader());
            dispatch(showNotifier(e.response.data.message, 'danger'));
            throw new Error(e.response.data.message);
        }
    }

    const verifyEmailHandler = async email => {
        try {
            const {data: {email_exists}} = await axiosInstance.post('verify-email', {email});
            return !email_exists || 'Email already exists. Do you want to login instead?';
        } catch (e) {

        }
    }

    const userTypeHandler = userType => {
        const userTypeId = userTypes.find(type => type.user_type === userType).id;
        setAccountType(userTypeId);
    }

    return <>
        {
            !accountType
                ? <div className="signup-content">
                    <h1>Sign Up</h1>
                    <p>Please select your account type to register</p>
                    <div className="image-containers">
                        <a href="#" onClick={() => userTypeHandler('Startup')}>
                            <img src="/images/icon/startup.svg" alt=""/>
                            <h4 className="text-white">STARTUP</h4>
                        </a>
                        <a href="#" onClick={() => userTypeHandler('Investor')}>
                            <img src="/images/icon/investor.svg" alt=""/>
                            <h4 className="text-white">INVESTOR</h4>
                        </a>
                    </div>
                </div>
                : <div className="signup-content mt-5 pt-5">
                    <h1 className="profile-signup">{accountType === 2 && "Startup"} {accountType === 1 && "Investor"} Sign
                        Up</h1>

                    <p className="text-center">
                        <Link href="login">
                            <a className="text-white">Login Instead?</a>
                        </Link>
                    </p>

                    <form className="sign-up" onSubmit={handleSubmit(signupHandler)}>
                        <div className="w-100 d-flex">
                            <div className="signup-input-container">
                                <input ref={register({required: true})} className="m-right signup-input w-100" type="text"
                                       name="first_name"
                                       id="fname" placeholder="First Name"/>
                                {errors.first_name && <Error>First name is required</Error>}
                            </div>

                            <div className="signup-input-container">
                                <input ref={register({required: true})} className="w-100" type="text" name="last_name"
                                       id="lname"
                                       placeholder="Last Name"/>
                                {errors.last_name && <Error>Last name is required</Error>}
                            </div>
                        </div>

                        <input ref={register({
                            required: 'Email is required.',
                            validate: async value => verifyEmailHandler(value)
                        })} className="w-100" type="email" name="email" id="email"
                               placeholder="Email"/>
                        {errors.email && <Error>{errors.email.message}</Error>}

                        {/*<select ref={register({required: true})} className="w-100" name="country_id" id="country">*/}
                        {/*    <option value="">Country</option>*/}
                        {/*    {countries.map(country => <option key={country.id}*/}
                        {/*                                      value={country.id}>{country.country}</option>)}*/}
                        {/*</select>*/}
                        {/*{errors.country_id && <Error>Please select a country</Error>}*/}

                        <input ref={register({required: 'You must specify a password'})} className="w-100" type="password"
                               name="password" id="pwd"
                               placeholder="Password"/>
                        {errors.password && <Error>{errors.password.message}</Error>}

                        <input ref={register({
                            required: 'You must specify a password',
                            validate: value => value === watch('password') || 'The passwords do not match'
                        })} className="w-100" type="password" name="confirm_password"
                               id="pwd_confirm" placeholder="Confirm Password"/>
                        {errors.confirm_password && <Error>{errors.confirm_password.message}</Error>}

                        {
                            accountType === 2 && <>
                                <select ref={register({required: 'This field is required'})} className="w-100 select-opt"
                                        name="startup_type_id">
                                    <option value="">Team Composition</option>
                                    <option value="1">Female Owned</option>
                                    <option value="2">Female Led</option>
                                    <option value="3">Gender Diverse</option>
                                </select>
                                {errors.startup_type_id && <Error>{errors.startup_type_id.message}</Error>}
                            </>
                        }

                        <button type="submit" className="btn btn-white">Sign up</button>

                        <div onClick={() => setAccountType(null)} className="pointer"><img
                            src="images/icon/arrow-left.svg"/> Back to Options
                        </div>
                    </form>
                </div>
        }


        <style jsx>{`
            .signup-input-container {
                display: flex;
                flex-directsion: column;
                margin-bottom: 0;
                width: 50%;
            }
            input, select {
                margin-bottom: 0!important;
                margin-top: 2rem;
            }
            .btn {
                margin-top: 2rem;
            }
        `}</style>
    </>
}