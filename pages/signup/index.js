import Layout from "../../components/layout";
import Head from "next/head";
import React from "react";
import SignupForm from "../../components/signup/SignupForm";
import axiosInstance from "../../config/axios";
import {withoutAuth} from "../../components/hoc/auth";

const SignUp = ({countries, user_types, query}) => {
    return <Layout headerContent={<SignupForm countries={countries} userTypes={user_types} query={query} />} page="Signup" headerClass="signup" footer={false}>
        <Head>
            <title>Signup</title>
        </Head>
    </Layout>
}

SignUp.getInitialProps = async ({query}) => {
    try {
        const {data: {countries, user_types}} = await axiosInstance.get('login-content');

        return {
            countries,
            user_types,
            query
        }
    } catch (e) {

    }

}

export default withoutAuth(SignUp);