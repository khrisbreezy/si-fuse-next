import React, {useState} from "react";
import Layout from "../../components/layout";
import Head from "next/head";
import Link from "next/link";
import axiosInstance from "../../config/axios";
import Axios from "axios";
import {useDispatch} from "react-redux";
import {loader} from "../../store/actions/loader";

const Blog = ({data: {latest, blogs: {current_page, last_page, data: allBlogs, next_page_url}}}) => {

    const [theBlogs, setAllBlogs] = useState(allBlogs);
    const [currentPage, setCurrentPage] = useState(current_page);
    const [lastPage, setLastPage] = useState(last_page);
    const [nextPageUrl, setNextPageUrl] = useState(next_page_url);

    const dispatch = useDispatch();

    const loadMoreHandler = async (e) => {
        e.preventDefault();
        dispatch(loader());

        try {
            const {data: response} = await Axios.get(nextPageUrl, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setCurrentPage(response.blogs.current_page);
            setLastPage(response.blogs.last_page);
            setNextPageUrl(response.blogs.next_page_url);
            setAllBlogs(state => state.concat(response.blogs.data));
            dispatch(loader());
        } catch (e) {
            console.log(e);
            dispatch(loader());
        }
    }

    return <Layout headerContent={<h1>Blog</h1>} page="Blog" headerClass="page-header blog">
        <Head>
            <title>Blog</title>
        </Head>

        <section className="events blog">
            <div className="container">
                <div className="row">
                    {
                        latest.map(({image, id, slug, title, date_formatted, estimated_reading_time}) => <div className="col-md-6" key={id}>
                            <Link href="blog/[slug]" as={`blog/${slug}`}>
                                <a className="blog-post">
                                    <div className="position-relative">
                                        <img src={image} className="img-fluid card-img-top"/>
                                        <span className="view">view <img src="images/icon/right.png" alt=""/></span>
                                    </div>

                                    <div className="meta">
                                        <p>{estimated_reading_time} min. read</p>
                                        <p>{date_formatted}</p>
                                    </div>

                                    <h5>{title}</h5>
                                </a>
                            </Link>
                        </div>)
                    }
                </div>

                <div className="row">
                    {
                        theBlogs.map(({image, id, slug, title, date_formatted, estimated_reading_time}) => <div className="col-md-4" key={id}>
                            <Link href="blog/[slug]" as={`blog/${slug}`}>
                                <a className="blog-post">
                                    <div className="position-relative">
                                        <img src={image} className="img-fluid card-img-top"/>
                                        <span className="view">view <img src="images/icon/right.png" alt=""/></span>
                                    </div>

                                    <div className="meta">
                                        <p>{estimated_reading_time} min. read</p>
                                        <p>{date_formatted}</p>
                                    </div>

                                    <h5>{title}</h5>
                                </a>
                            </Link>
                        </div>)
                    }
                </div>

                {
                    currentPage < lastPage
                        ? <div className="text-center button">
                            <a href="#" className="btn" onClick={loadMoreHandler}>Load more</a>
                        </div>
                        : null
                }

            </div>
        </section>
    </Layout>
};

Blog.getInitialProps = async ctx => {
    const {data} = await axiosInstance.get('blogs-page');
    return {
        data
    }
}

export default Blog;