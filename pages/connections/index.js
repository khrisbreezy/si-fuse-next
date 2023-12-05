import Layout from "../../components/layout";
import Head from "next/head";
import React from "react";
import axiosInstance from "../../config/axios";
import Token from "../../utils/Token";
import StartupCard from "../../components/startups/startupCard";
import Link from 'next/link';

export default function Connections({connections}) {

    return <Layout isLoggedIn whiteAccount headerContent={<h1>Connections</h1>} headerClass="page-header discover"
                   page="Connections">
        <Head>
            <title>Connections</title>
            <script src="/js/rater.min.js"/>
        </Head>

        <section className="connections">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                    </div>
                </div>

                {
                    connections.length > 0 && <div className="row">
                        {
                            connections.map(user => {
                                return <StartupCard key={user.id} startup={user}/>
                            })
                        }
                    </div>
                }

                {
                    connections.length === 0 && <p>
                        Hi there, you currently don't have any connections. Over time this would change and you would be prompted when you have a new connection request. <Link href="/discover"><a>Click here</a></Link> to add startups to your connections.
                    </p>
                }

                {/*<div class="text-center button mt-5">*/}
                {/*    <a href="#" class="btn">Load more</a>*/}
                {/*</div>*/}
            </div>
        </section>
    </Layout>
}

Connections.getInitialProps = async ctx => {
    const {data: {data: connections}} = await axiosInstance.get('investors/follows', {
        headers: {
            Authorization: `Bearer ${Token(ctx)}`
        }
    });

    return {
        connections
    }
}