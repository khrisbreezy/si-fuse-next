import Router from "next/router";
import React, {useEffect, useState} from "react";
import {getFairness, startupLevel} from "../../helpers";
import axiosInstance from "../../config/axios";
import Token from "../../utils/Token";
import {showNotifier} from "../../store/actions/notifier";

const StartupCard = ({startup: {company, finance, level, profile, slug, rating, comments}}) => {
    const {team, products, investor_exit, vision, scale, business_model, market, problem} = startupLevel(level);

    const [starRating, setStarRating] = useState(rating || {formatted_rating: 0, overall_rating: 0, total_rating: 0});

    useEffect(() => {
        const options = {
            max_value: 5,
            step_size: 1,
            initial_value: 1,
            change_once: true,
            cursor: 'default',
            readonly: true
        }

        setTimeout(() => {
            $(".rater-js").rate(options);
        }, 1000);
    }, []);

    const getClientsServiced = clientsServiced => {
        if (clientsServiced) {
            let clients = JSON.parse(clientsServiced);
            return clients.join(', ');
        }
        return '';
    }

    return <div className="row mb-5 pointer" onClick={() => Router.push('/startups/[id]', `/startups/${slug}`)}>
        <div className="col">
            <article>
                <div className="row">
                    <div className="col-md-2 text-center text-sm-left">
                        <div>
                            <img className="img-fluid startcard-logo" src={company.logo_url} alt="" />
                        </div>
                    </div>
                    <div className="col-md-10">
                        <h3>{company.name}</h3>
                        <div className="d-flex flex-wrap align-items-center">
                            <p className="rating-star-text d-flex mr-4"><img className="img-fluid" src="/images/icon/rating-star.svg" alt=""/>Rating {starRating.formatted_rating} ({starRating.total_rating} {starRating.total_rating > 0 ? 'Ratings' : 'Rating'})</p>
                            <p className="rating-star-text d-flex"><img className="img-fluid" src="/images/icon/comments-orange.svg" alt=""/>{comments.length} {comments.length === 1 ? 'comment' : "comments"}</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-9 mt-5">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="card-level">
                                    <div className={`${getFairness(team)}`}></div>
                                    <p><img src="images/icon/team-icon-img.svg" alt="" className="img-fluid mr-2"/>Team</p>
                                    <p className="mb-2">{`${getFairness(team)}`}</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card-level">
                                    <div className={`${getFairness(problem)}`}></div>
                                    <p><img src="images/icon/problem-icon-img.svg" alt="" className="img-fluid mr-2" />Problem</p>
                                    <p className="mb-2">{`${getFairness(problem)}`}</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card-level">
                                    <div className={`${getFairness(vision)}`}></div>
                                    <p><img src="images/icon/value-icon-img.svg" alt="" className="img-fluid mr-2" />Value prop.</p>
                                    <p className="mb-2">{`${getFairness(vision)}`}</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card-level">
                                    <div className={`${getFairness(market)}`}></div>
                                    <p><img src="images/icon/market-img-icon.svg" alt="" className="img-fluid mr-2" />Market</p>
                                    <p className="mb-2">{`${getFairness(market)}`}</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card-level">
                                    <div className={`${getFairness(business_model)}`}></div>
                                    <p><img src="images/icon/model-icon-img.svg" alt="" className="img-fluid mr-2" />Model</p>
                                    <p className="mb-2">{`${getFairness(business_model)}`}</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card-level">
                                    <div className={`${getFairness(scale)}`}></div>
                                    <p><img src="images/icon/scale-icon-img.svg" alt="" className="img-fluid mr-2" />Scale</p>
                                    <p className="mb-2">{`${getFairness(scale)}`}</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card-level">
                                    <div className={`${getFairness(vision)}`}></div>
                                    <p><img src="images/icon/vision-icon-img.svg" alt="" className="img-fluid mr-2" />Vision</p>
                                    <p className="mb-2">{`${getFairness(vision)}`}</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card-level">
                                    <div className={`${getFairness(investor_exit)}`}></div>
                                    <p><img src="images/icon/strategy-icon-img.svg" alt="" className="img-fluid mr-2" />Exit Strategy</p>
                                    <p className="mb-2">{`${getFairness(investor_exit)}`}</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card-level">
                                    <div className={`${getFairness(products)}`}></div>
                                    <p><img src="images/icon/product-icon-img.svg" alt="" className="img-fluid mr-2" />Product</p>
                                    <p className="mb-2">{`${getFairness(products)}`}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-md-3 mt-5">
                        <ul className="tags-container">
                            {company.industry && <li className="tags">{company.industry}</li>}
                            {finance.capital_needed_for &&
                                <li className="tags">{finance.capital_needed_for}</li>}
                            {finance.funding_stage && <li className="tags">{finance.funding_stage}</li>}
                            {finance.geographical_focus &&
                                <li className="tags">{finance.geographical_focus}</li>}
                            {finance.revenue_type && <li className="tags">{finance.revenue_type}</li>}
                            {finance.growth_projection && <li className="tags">{finance.growth_projection}</li>}
                            {(company.clients_serviced && company.clients_serviced !== 'null') && <li className="tags">{getClientsServiced(company.clients_serviced)}</li>}
                            {finance.investor_type && <li className="tags">{finance.investor_type}</li>}
                            {/* {finance.funding_stage && <li className="tags">{finance.funding_stage}</li>} */}
                        </ul>
                    </div>
                </div>
            </article>
        </div>
    </div>
}

export default StartupCard;