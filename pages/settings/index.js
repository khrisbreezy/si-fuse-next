import Layout from "../../components/layout";
import Head from "next/head";
import React, {useState} from "react";
import {User} from "../../utils/User";
import ErrorSpan from "../../components/UI/ErrorSpan";
import {useDispatch} from "react-redux";
import {loader} from "../../store/actions/loader";
import axiosInstance from "../../config/axios";
import Token from "../../utils/Token";
import {useForm} from "react-hook-form";
import {storeUser} from "../../store/actions/auth";

export default function Settings({user}) {
    const [passwordError, setPasswordError] = useState(false);
    const [passwordConfirmError, setPasswordConfirmError] = useState(false);
    const [passwordField, setPasswordField] = useState('');
    const [showForm, setShowForm] = useState(false);
    const {errors, handleSubmit, register} = useForm();

    const dispatch = useDispatch();

    const updateFormHandler = async data => {
        setPasswordConfirmError(false);
        if (data.password && data.password !== data.password_confirmation) {
            return setPasswordConfirmError(true);
        }
        dispatch(loader());
        try {
            const {data: response} = await axiosInstance.patch(`user`, data, {
                headers: {
                    Authorization: `Bearer ${Token()}`
                }
            });
            const user = response.user;
            console.log(user);
            dispatch(storeUser(user));
            dispatch(loader());
        } catch (e) {
            dispatch(loader());
            console.log(e.response.data.message);
        }
    }

    const validatePasswordHandler = async () => {
        setPasswordError(false);
        if (!passwordField) {
            return setPasswordError(true);
        }

        try {
            dispatch(loader());
            const {data: {message}} = await axiosInstance.post(`validate-password`, {password: passwordField}, {
                headers: {
                    Authorization: `Bearer ${Token()}`
                }
            });
            if (message === 'correct') {
                setShowForm(true);
            }
            dispatch(loader());
        } catch (e) {
            setShowForm(false);
            console.log(e.response.data.message);
            dispatch(loader());
        }
    }

    return <>
        <Layout page="Settings" headerContent={null} isLoggedIn headerClass="page-header no-bg" redBar>
            <Head><title>Settings</title></Head>

            <section className="single-post">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <form className="recovery-pwd" onSubmit={handleSubmit(updateFormHandler)}>
                                <div className="d-flex multi">
                                    <div className={`half-width ${!showForm ? 'faded' : ''}`}>
                                        <label htmlFor="email">Email</label>
                                        <input className="full-width half-width" type="text" name="email" ref={register({required: 'This field is required'})}
                                               placeholder="currentEmail@startup.com" defaultValue={user.email}/>
                                        {errors.email && <ErrorSpan>{errors.email.message}</ErrorSpan>}
                                    </div>

                                    <div className={`half-width ${!showForm ? 'faded' : ''}`}>
                                        <label htmlFor="phone" className="phone-label">Phone</label>
                                        <input className="full-width half-width" type="number" name="phone" ref={register({required: 'This field is required'})}
                                               placeholder="080 XXX XXX XX" defaultValue={user.phone}/>
                                        {errors.phone && <ErrorSpan>{errors.phone.message}</ErrorSpan>}
                                    </div>
                                </div>

                                <div className="d-flex mtop multi">
                                    <div className={`half-width ${!showForm ? 'faded' : ''}`}>
                                        <label htmlFor="password">Change password</label>
                                        <input className="full-width half-width" name="password" type="password" ref={register()}
                                               placeholder="New Password"/>
                                        {errors.password && <ErrorSpan>{errors.password.message}</ErrorSpan>}
                                    </div>

                                    <div className={`half-width ${!showForm ? 'faded' : ''}`}>
                                        <label className="d-none d-sm-block">&nbsp;</label>
                                        <input className="full-width half-width phone-label" name="password_confirmation" type="password" ref={register()}
                                               placeholder="Confirm Password"/>
                                        {passwordConfirmError && <ErrorSpan>Passwords doesn't match!</ErrorSpan>}
                                    </div>
                                </div>

                                {/*<div className={`half-width mtop ${!showForm ? 'faded' : ''}`}>*/}
                                {/*    <label>Account</label>*/}
                                {/*    <button className="del">Delete my account</button>*/}
                                {/*</div>*/}

                                {
                                    !showForm &&   <div className="d-flex">
                                        <div className="half-width m-bottom mtop">
                                            <label>Enter Current password to edit account</label>
                                            <input type="password" placeholder="Current Password" defaultValue={passwordField} onChange={($event) => {
                                                setPasswordField($event.target.value)
                                            }} className="full-width"/>
                                            {passwordError &&
                                            <ErrorSpan>Please enter your password to continue.</ErrorSpan>}
                                        </div>
                                        <div className="half-width">
                                            &nbsp;
                                        </div>
                                    </div>
                                }


                                <div className="text-center">
                                    {
                                        showForm
                                            ? <button type="submit"
                                                      className="btn m-bottom mt-5">
                                                SAVE CHANGES
                                            </button>
                                            : <button type="button" onClick={validatePasswordHandler}
                                                      className="btn m-bottom">
                                                Edit
                                            </button>
                                    }
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
        <style jsx>{`
            input {
                margin-bottom: 0!important
            }
            .mtop {
                margin-top: 4rem;
            }
        `}</style>
    </>
}

Settings.getInitialProps = ctx => {
    return {
        user: User(ctx)
    }
}