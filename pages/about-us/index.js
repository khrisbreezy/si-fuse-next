import Head from "next/head";
import Layout from "../../components/layout";
import React from "react";
import Link from "next/link";

const aboutUs = () => {
    return <Layout headerContent={<h1>About Us</h1>} page="About" headerClass="page-header about" whiteAccount="false">
        <Head>
            <title>About Us</title>
        </Head>

        <section className="about">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="white-bg">
                            <div className="row">
                                <div className="col-md-9 mx-auto">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <img src="/images/about-us-1.jpg"/>
                                        </div>

                                        <div className="col-md-6">
                                            <h5>
                                                To create a community full of opportunities where African female
                                                entrepreneurs can thrive.
                                            </h5>

                                            <p>
                                                The gap between entrepreneurs and investors has been an age long
                                                problem. We are passionate about promoting innovation on the continent
                                                and so, this platform was created for investors and female entrepreneurs
                                                to leverage on. We are here to serve as an intermediary, guiding the
                                                process from ideation to established success.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="row mt-5">
                                        <div className="col-md-6 d-block d-md-none">
                                            <img src="/images/about-us-2.jpg"/>
                                        </div>

                                        <div className="col-md-6 text-md-right">
                                            <h5>
                                                To bridge the gap between female entrepreneurs and investors and foster
                                                innovation across the continent.
                                            </h5>

                                            <p className="mb-4">
                                                We enable all types of investors to invest in businesses they believe in
                                                and enable all types of growth-focused businesses and ideas to raise
                                                capital and a community in the process.
                                            </p>

                                            <div className="d-block d-md-none text-center mb-3">
                                                <Link href="/faqs">
                                                    <a className="btn">Questions?</a>
                                                </Link>
                                            </div>

                                            <div className="d-none d-md-block">
                                                <Link href="/faqs">
                                                    <a className="btn">Questions?</a>
                                                </Link>
                                            </div>
                                        </div>

                                        <div className="col-md-6 d-none d-md-flex">
                                            <img className="img-fluid" src="/images/about-us-2.jpg"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row about-story">
                    <div className="col">
                        <div className="red-bg">
                            <div className="row">
                                <div className="col-md-8 offset-md-2 d-flex flex-column justify-content-center">
                                    <h3 className="mb-3 text-black text-center">Our Story As Told By The Founder</h3>

                                    <img className="text-center mb-5" src="/images/about-us-3.svg"/>

                                    <p className="text-black">
                                        Our dream is to bridge the growing gap between female-led startups and
                                        investors, over some past few years there has been an increase in investments in Africa
                                        especially female-led tech startups. We are creating a platform where startups and
                                        investors can interact to foster a higher level of innovation and make great social impact on
                                        the continent. We are creating a support ecosystem to accelerate and optimize talent
                                        development in a developing continent.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    </Layout>;
}

export default aboutUs;