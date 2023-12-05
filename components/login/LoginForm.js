import Link from "next/link";
import {useDispatch} from "react-redux";
import {useForm} from "react-hook-form";
import {loginAsync} from "../../store/actions/auth";
import Error from "../UI/ErrorSpan";
import Router from "next/router";
import Cookies from 'js-cookie';
import {showNotifier, toggleNotifier} from "../../store/actions/notifier";
import React from "react";
import {User} from "../../utils/User";

import {ReCaptcha} from "react-recaptcha-google";

export default function LoginForm() {
    const dispatch = useDispatch();

    const {register, handleSubmit, errors} = useForm({
        validateCriteriaMode: "all"
    });

    const loginHandler = async data => {
        try {
            await dispatch(loginAsync(data));
            dispatch(showNotifier('Logged In'));
            const redirectToEvent = localStorage.getItem('redirectBackToEvents');
            if (redirectToEvent) {
                localStorage.removeItem('redirectBackToEvents');
                Router.push(redirectToEvent);
                return;
            }
            if (User() && User().user_type.user_type === 'Investor') {
                Router.push('/timeline');
            } else {
                Router.push('/profile');
            }
            // Router.push(Cookies.get('redirectIntended') || '/');
            Cookies.remove('redirectIntended');
        } catch (e) {
            console.log(e, 'the error');
        }
    };



    return <>
        <div className="signup-content">
            <h1>Login</h1>
            <p className="text-center">
                <Link href="signup">
                    <a className="text-white">Signup Instead?</a>
                </Link>
            </p>

            <form className="sign-up w-100" onSubmit={handleSubmit(loginHandler)}>
                <input ref={register({required: true})} className="w-100 login-input" type="email" name="email"
                       id="email" placeholder="Email"/>
                {errors.email && <Error>Email field is required!</Error>}

                <input ref={register({required: true})} className="w-100 login-input" type="password" name="password"
                       id="pwd" placeholder="Password"/>
                {errors.password && <Error>Password field is required!</Error>}

                <button type="submit" className="btn btn-white">Login</button>
                {/*<button className="g-recaptcha" data-sitekey="your_site_key" data-callback='onSubmit'>Submit</button>*/}

            </form>
            <p className="text-center">Forgot Password? <Link href="/forgot-password"><a className="text-white">Click here</a></Link></p>
        </div>
        <style jsx>{`
            .login-input {
                margin-bottom: 0;
                margin-top: 2rem;
            }
            .btn {
                margin-top: 2rem;
            }
        `}</style>
    </>
}