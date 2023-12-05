import Layout from "../../components/layout";
import LoginForm from "../../components/login/LoginForm";
import Head from "next/head";
import {withoutAuth} from "../../components/hoc/auth";
import React, {useEffect} from 'react';


const Login = () => {
    useEffect(() => {

    }, []);
    return <Layout headerContent={<LoginForm />} page="Login" headerClass="signup" footer={false}>
        <Head>
            <title>Login</title>
            <script src="https://www.google.com/recaptcha/api.js" async defer/>
        </Head>
    </Layout>
}

export default withoutAuth(Login);