import Layout from "../../components/layout";
import Head from "next/head";
import React, {useEffect, useState} from "react";
import axiosInstance from "../../config/axios";
import Disqus from "disqus-react";
import {TwitterShareButton, TwitterIcon, FacebookShareButton, FacebookIcon, LinkedinIcon, LinkedinShareButton, TelegramIcon, TelegramShareButton, WhatsappIcon, WhatsappShareButton} from "react-share";


export default function SingleBlog({blog}) {

    const createMarkup = () => ({__html: blog.content});
    const [windowLocation, setWindowLocation] = useState(null);

    const disqusShortName = 'si-fuse';
    const disqusConfig = {
        url: "http://sifuse.com",
        identifier: blog.id,
        title: blog.title
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setWindowLocation(window.location.href);
        }
    }, [])

    return <Layout page="SingleBlog" headerContent={null} headerClass="page-header no-bg" redBar>
        <Head>
            <title>{blog.title}</title>
        </Head>

        <section className="single-post">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="white-bg">
                            <img src={blog.image} alt="" className="img-fluid blog-image"/>

                            <div className="row">
                                <div className="col-md-9 mx-auto">
                                    <div className="content">
                                        <h1>{blog.title}</h1>

                                        <div className="category">
                                            <p>{blog.category.name}</p>
                                            <p>{blog.estimated_reading_time} min. read</p>
                                            <p>{blog.date_formatted_alt}</p>
                                        </div>

                                        <div dangerouslySetInnerHTML={createMarkup()}/>

                                        <div className="social-share">
                                            <p>Share:</p>

                                            <TwitterShareButton url={windowLocation} title={blog.title}><TwitterIcon /></TwitterShareButton>
                                            <FacebookShareButton url={windowLocation} title={blog.title}><FacebookIcon /></FacebookShareButton>
                                            <LinkedinShareButton url={windowLocation} title={blog.title}><LinkedinIcon /></LinkedinShareButton>
                                            <TelegramShareButton url={windowLocation} title={blog.title}><TelegramIcon /></TelegramShareButton>
                                            <WhatsappShareButton url={windowLocation} title={blog.title}><WhatsappIcon /></WhatsappShareButton>

                                        </div>
                                        <Disqus.DiscussionEmbed shortname={disqusShortName} config={disqusConfig}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </Layout>
}

export async function getStaticPaths() {
    const {data: response} = await axiosInstance.get('blogs-slugs');
    const slugs = response.map(slug => ({
        params: {
            slug: slug.slug
        }
    }));
    return {
        paths: slugs,
        fallback: false
    }
}

export async function getStaticProps({params}) {
    const slug = params.slug;

    const {data: {data: blog}} = await axiosInstance.get(`blogs/${slug}`);

    return {
        props: {
            blog
        }
    }
}