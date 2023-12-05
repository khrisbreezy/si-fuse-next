import Head from "next/head";
import Layout from "../../components/layout";
import React from "react";
import axiosInstance from "../../config/axios";

const Disclaimer = ({settings}) => {
    const createMarkup = val => ({__html: val});

    return <Layout headerContent={<h1>Disclaimer</h1>} page="Disclaimer" headerClass="page-header disclaimer" whiteAccount>
        <Head>
            <title>Disclaimer</title>
        </Head>

        <section className="faqs">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="white-bg">
                            <div className="row">
                                <div className="col-md-9 mx-auto">
                                    {settings && <div dangerouslySetInnerHTML={createMarkup(settings.disclaimer)}/>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </Layout>
}

Disclaimer.getInitialProps = async () => {
    const {data: {data: settings}} = await axiosInstance.get('settings');

    return {
        settings
    }
}

export default Disclaimer;