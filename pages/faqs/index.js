import Head from "next/head";
import Layout from "../../components/layout";
import React from "react";
import axiosInstance from "../../config/axios";

const Faqs = ({faqs}) => {
    return <Layout headerContent={<h1>FAQS</h1>} page="FAQs" headerClass="page-header faqs">
        <Head>
            <title>FAQS</title>
        </Head>


        <section className="faqs">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="white-bg">
                            <div className="row">
                                <div className="col-md-9 mx-auto">
                                    {
                                        faqs.map(
                                            ({question, answer, id}) => <article key={id}>
                                                <h4>
                                                    {question}
                                                </h4>

                                                <p>{answer}</p>
                                            </article>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </Layout>
}

Faqs.getInitialProps = async ctx => {
    const {data: {data: faqs}} = await axiosInstance.get('faqs');

    return {
        faqs
    }
}

export default Faqs;