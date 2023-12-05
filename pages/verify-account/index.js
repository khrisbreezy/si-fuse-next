import Layout from "../../components/layout";
import Head from "next/head";
import {withoutAuth} from "../../components/hoc/auth";
import React from 'react';
import ResetPasswordForm from "../../components/resetPassword/ResetPasswordForm";
import axiosInstance from "../../config/axios";
import VerifyAccountComponent from "../../components/VerifyAccountComponent";
// import

const VerifyAccount = ({tokenIsValid, reason, token}) => {
    return <Layout headerContent={<VerifyAccountComponent tokenIsValid={tokenIsValid} reason={reason} token={token} />} page="Reset-Password" headerClass="signup" footer={false}>
        <Head>
            <title>Reset Password</title>
        </Head>
    </Layout>
}

VerifyAccount.getInitialProps = async ({query}) => {
    if (!query.hasOwnProperty('token')) {
        return {
            tokenIsValid: false,
            reason: null
        }
    }
    try {
        const {data: response} = await axiosInstance.post(`validate-verification-token`, query)
        console.log(response);
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

export default VerifyAccount;