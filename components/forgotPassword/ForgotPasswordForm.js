import Link from "next/link";
import {useDispatch} from "react-redux";
import {useForm} from "react-hook-form";
import React, {useState} from "react";
import {loginAsync} from "../../store/actions/auth";
import Error from "../UI/ErrorSpan";
import {loader} from "../../store/actions/loader";
import Router from "next/router";
import Cookies from 'js-cookie';
import axiosInstance from "../../config/axios";
import {showNotifier, toggleNotifier} from "../../store/actions/notifier";
import {User} from "../../utils/User";

export default function ForgotPasswordForm() {
    // const dispatch = useDispatch();
    //
    // const {register, handleSubmit, errors} = useForm({
    //     validateCriteriaMode: "all"
    // });
    //
    // const resetHandler = async data => {
    //     try {
    //         await dispatch(loginAsync(data));
    //         dispatch(showNotifier('Logged In'));
    //         if (User() && User().user_type.user_type === 'Investor') {
    //             Router.push('/timeline');
    //         } else {
    //             Router.push('/profile');
    //         }
    //         // Router.push(Cookies.get('redirectIntended') || '/');
    //         Cookies.remove('redirectIntended');
    //     } catch (e) {
    //         console.log(e, 'the error');
    //     }
    // };

    const {register, handleSubmit, errors} = useForm();

    const [showForm, setShowForm] = useState(true);
    const [showResetMessage, setShowResetMessage] = useState(false);
    const [email, setEmail] = useState('');

    const dispatch = useDispatch();

    const resetPasswordHandler = async data => {
        dispatch(loader());

        try {
            const {data: response} = await axiosInstance.post('forgot-password', data);
            if (response.message && response.message === 'sent') {
                setEmail(data.email);
                setShowForm(false);
                setShowResetMessage(true);
            }
            dispatch(loader());
            dispatch(showNotifier('Email Sent'));
        } catch (e) {
            // console.log(e);
            dispatch(showNotifier(e.response.data.message, 'danger'));
            // console.log(e);
            dispatch(loader());
        }
    }

    const verifyEmailHandler = async email => {
        try {
            const {data: {email_exists}} = await axiosInstance.post('verify-email', {email});
            return !email_exists && 'Email does not exists!';
        } catch (e) {

        }
    }

    return <>
        <div className="signup-content mt-5 pt-5">
            <h1 className="mb-5">Reset Password</h1>

            {
                showForm &&
                <form className="sign-up w-100" onSubmit={handleSubmit(resetPasswordHandler)}>
                    {/*<label htmlFor="email">Enter Email Address to reset password</label>*/}
                    <input ref={register({required: 'Email is required!'})} type="email" className="w-100" id="email" name="email" placeholder="Enter Your Email address"/>
                    {errors.email && <Error>{errors.email.message}</Error>}

                    <button className="btn btn-white" type={"submit"}>RESET</button>
                </form>
            }

            {
                showResetMessage && <p className="reset-password-message text-center">An email has been sent to <strong>{email}</strong>, check your inbox and click on the link provided.</p>
            }

            <p>
                <Link href="login">
                    <a className="text-white"><img src="images/icon/arrow-left.svg"/> &nbsp; Back to Login</a>
                </Link>
            </p>
        </div>
    </>
}