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

export default function ResetPasswordForm({tokenIsValid, reason, token = null}) {
    // const {register, handleSubmit, errors} = useForm();
    //
    // const [showForm, setShowForm] = useState(true);
    // const [showResetMessage, setShowResetMessage] = useState(false);
    // const [email, setEmail] = useState('');

    const dispatch = useDispatch();

    const {errors, register, handleSubmit, watch} = useForm();

    const newPasswordHandler = async data => {
        dispatch(loader());

        try {
            await axiosInstance.post(`change-password`, {password: data.password, token});
            dispatch(showNotifier('Password updated!'));
            dispatch(loader());

            Router.push('/login');
        } catch (e) {
            dispatch(showNotifier(e.response.data.message, 'danger'));
            dispatch(loader());
            console.log(e);
        }
    }

    return <>
        <div className="signup-content mt-5 pt-5">
            <h1>New Password</h1>

            {/*<p className="text-center">*/}
            {/*    <Link href="login">*/}
            {/*        <a className="text-white"><img src="images/icon/arrow-left.svg"/> &nbsp; Back to Login</a>*/}
            {/*    </Link>*/}
            {/*</p>*/}

            {tokenIsValid
                ? <form className="sign-up" onSubmit={handleSubmit(newPasswordHandler)}>
                    <input ref={register({required: 'This field is required'})} type="password"
                           className="w-100 mb-0" id="password" name="password"
                           placeholder="New Password"/>
                    {errors.password && <Error>{errors.password.message}</Error>}

                    <input ref={register({
                        required: 'This field is required',
                        validate: value => value === watch('password') || 'The passwords do not match'
                    })} type="password"
                           className="w-100 mb-0 mt-4" id="confirm-password" name="confirm_password"
                           placeholder="Re enter Password"/>
                    {errors.confirm_password && <Error>{errors.confirm_password.message}</Error>}

                    <button className="btn btn-white w-100 mt-5" type={"submit"}>RESET</button>
                </form>
                : <>
                    <div className="reset-password-message text-center">
                        {
                            reason === 'token expired'
                                ? <>
                                    <h4>Token Expired</h4>
                                    <p>The link you supplied has expired. Please generate another link to reset your password.</p>
                                </>
                                : <>
                                    <h4>Wrong Link</h4>
                                    <p>
                                        You have clicked on an invalid link. Please make sure that you have typed the link correctly.
                                        If are copying this link from a mail reader please ensure that you have copied all the lines in the link.
                                    </p>
                                </>
                        }
                    </div>
                </>}
        </div>
    </>
}