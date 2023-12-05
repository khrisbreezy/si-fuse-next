// import axiosInstance from "../../config/axios";
// import Layout from "../../components/layout";
// import Head from "next/head";
// import React from "react";
// import Error from "../../components/UI/ErrorSpan";
// import {useForm} from "react-hook-form";
// import {useDispatch} from "react-redux";
// import {loader} from "../../store/actions/loader";
// import {showNotifier} from "../../store/actions/notifier";
// import Router from "next/router";
//
// const ResetPassword = ({tokenIsValid, reason, token = null}) => {
//     const dispatch = useDispatch();
//
//     const {errors, register, handleSubmit, watch} = useForm();
//
//     const resetPasswordHandler = async data => {
//         dispatch(loader());
//
//         try {
//             await axiosInstance.post(`change-password`, {password: data.password, token});
//             dispatch(showNotifier('Password updated!'));
//             dispatch(loader());
//
//             Router.push('/login');
//         } catch (e) {
//             dispatch(showNotifier(e.response.data.message, 'danger'));
//             dispatch(loader());
//             console.log(e);
//         }
//     }
//     return <Layout page="resetPassword" headerContent={null} headerClass="page-header no-bg" redBar>
//         <Head>
//             <title>Reset Password</title>
//         </Head>
//
//         <section className="reset-password">
//             <div className="container">
//                 <div className="row">
//                     <div className="col-md-8 col-12 mx-auto bg-white">
//                         {tokenIsValid
//                             ? <form className="profile-details" onSubmit={handleSubmit(resetPasswordHandler)}>
//                                 <input ref={register({required: 'This field is required'})} type="password"
//                                        className="full-width mb-0" id="password" name="password"
//                                        placeholder="New Password"/>
//                                 {errors.password && <Error>{errors.password.message}</Error>}
//
//                                 <input ref={register({
//                                     required: 'This field is required',
//                                     validate: value => value === watch('password') || 'The passwords do not match'
//                                 })} type="password"
//                                        className="full-width mb-0 mt-4" id="confirm-password" name="confirm_password"
//                                        placeholder="Re enter Password"/>
//                                 {errors.confirm_password && <Error>{errors.confirm_password.message}</Error>}
//
//                                 <button className="btn btn-sm w-100 mt-5" type={"submit"}>RESET</button>
//                             </form>
//                             : <>
//                                 <div className="reset-password-message">
//                                     {
//                                         reason === 'token expired'
//                                             ? <>
//                                                 <p>Token Expired</p>
//                                                 <p>The link you supplied has expired. Please generate another link to reset
//                                                     your password.</p>
//                                             </>
//                                             : <>
//                                                 <p className="p-head">Wrong Link</p>
//
//                                                 <p>
//                                                     You have clicked on an invalid link. Please make sure that you have
//                                                     typed the
//                                                     link
//                                                     correctly.
//                                                     If are
//                                                     copying this link from a mail reader please ensure that you have copied
//                                                     all the
//                                                     lines in the
//                                                     link.
//                                                 </p>
//                                             </>
//                                     }
//                                 </div>
//                             </>}
//                     </div>
//                 </div>
//             </div>
//         </section>
//     </Layout>
// }
//
// ResetPassword.getInitialProps = async ({query}) => {
//     if (!query.hasOwnProperty('token')) {
//         return {
//             tokenIsValid: false,
//             reason: null
//         }
//     }
//     try {
//         const {data: response} = await axiosInstance.post(`validate-reset-token`, query)
//
//         return {
//             token: query.token,
//             tokenIsValid: response.message === 'token confirmed',
//             reason: null
//         }
//
//     } catch (e) {
//         return {
//             tokenIsValid: false,
//             reason: e.response.data.message
//         }
//     }
// }
//
// export default ResetPassword;

import Layout from "../../components/layout";
import Head from "next/head";
import {withoutAuth} from "../../components/hoc/auth";
import React from 'react';
import ResetPasswordForm from "../../components/resetPassword/ResetPasswordForm";
import axiosInstance from "../../config/axios";

const Forgot = ({tokenIsValid, reason, token}) => {
    return <Layout headerContent={<ResetPasswordForm tokenIsValid={tokenIsValid} reason={reason} token={token} />} page="Reset-Password" headerClass="signup" footer={false}>
        <Head>
            <title>Reset Password</title>
        </Head>
    </Layout>
}

Forgot.getInitialProps = async ({query}) => {
    console.log(query);
    if (!query.hasOwnProperty('token')) {
        return {
            tokenIsValid: false,
            reason: null
        }
    }
    try {
        const {data: response} = await axiosInstance.post(`validate-reset-token`, query)
        return {
            token: query.token,
            tokenIsValid: response.message === 'token confirmed',
            reason: null
        }

    } catch (e) {
        return {
            tokenIsValid: false,
            reason: e.response.data.message
        }
    }
}

export default withoutAuth(Forgot);