import Layout from "../../components/layout";
import Head from "next/head";
import {withoutAuth} from "../../components/hoc/auth";
import React from 'react';
import ForgotPasswordForm from "../../components/forgotPassword/ForgotPasswordForm";

const Forgot = () => {

    return <Layout headerContent={<ForgotPasswordForm />} page="Forgot-Password" headerClass="signup" footer={false}>
        <Head>
            <title>Reset Password</title>
        </Head>
    </Layout>
}

export default withoutAuth(Forgot);