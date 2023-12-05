import Head from "next/head";
import Layout from "../../components/layout";
import React from "react";
import Error from "../../components/UI/ErrorSpan";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {loader} from "../../store/actions/loader";
import {User} from "../../utils/User";
import axiosInstance from "../../config/axios";
import Token from "../../utils/Token";
import {showNotifier} from "../../store/actions/notifier";

const ContactUs = ({user}) => {

    const dispatch = useDispatch();
    const {handleSubmit, register, errors, reset} = useForm();

    const loginHandler = async data => {
        dispatch(loader());
        try {
            await axiosInstance.post('contact', data, {
                headers: {
                    Authorization: `Bearer ${Token()}`
                }
            });
            reset();
            dispatch(showNotifier('Message sent successfully. We\'ll be in touch shortly!'));
            dispatch(loader());
        } catch (e) {
            console.log(e.response.data.message);
            dispatch(loader());
        }
    }
    return <Layout headerContent={<h1>Contact Us</h1>} page="Contact Us" headerClass="page-header contact-us" whiteAccount>
        <Head>
            <title>Contact Us</title>
        </Head>

        <section className="contact-us">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="white-bg">
                            <div className="row">
                                <div className="col-md-9 mx-auto">
                                    <h4 className="text-center mb-0">Get in touch with us or send any enquiries.</h4>

                                    <form className="recovery-pwd" onSubmit={handleSubmit(loginHandler)}>
                                        <div className="d-flex">
                                            <div className="d-flex flex-column mr-md-3 flex-grow-1">
                                                <input ref={register({required: true})} className="w-100" type="text"
                                                       name="first_name"
                                                       placeholder="First Name" defaultValue={user && user.first_name}/>
                                                {errors.first_name && <Error>This field is required!</Error>}
                                            </div>

                                            <div className="d-flex flex-column ml-md-3 flex-grow-1">
                                                <input ref={register({required: true})} className="w-100" type="text"
                                                       name="last_name"
                                                       placeholder="Last Name" defaultValue={user && user.last_name}/>
                                                {errors.last_name && <Error>This field is required!</Error>}
                                            </div>
                                        </div>

                                        <input ref={register({required: true})} className="w-100" type="email"
                                               name="email"
                                               placeholder="Email Address" defaultValue={user && user.email}/>
                                        {errors.email && <Error>This field is required!</Error>}

                                        <textarea ref={register({required: true})} className="w-100" rows="5"
                                                  name="message"
                                                  placeholder="Message"/>
                                        {errors.message && <Error>This field is required!</Error>}

                                        <button type="submit"
                                                className="btn m-bottom w-100">
                                            send
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </Layout>
}

ContactUs.getInitialProps = ctx => {
    return {
        user: User(ctx)
    }
}

export default ContactUs;