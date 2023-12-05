import Link from "next/link";
import React from "react";

const StartupComponent = ({user: {company_logo, company_name, funding_stage, location, user_id, slug}, key}) => {
    return <div className="col-md-3" key={key}>
        <Link href="startups/[id]" as={`startups/${slug}`}>
            <a className="card">
                <div className="img-wrapper">
                    <img className="card-img-top img-fluid" src={company_logo}/>
                    <span className="view">view <img src="images/icon/right.png"/></span>
                </div>

                <div className="background-text">
                    <p>{company_name}</p>
                    <p>{funding_stage}</p>
                </div>

                <div className="event-tag-location">
                    <p className="align-self-start">Fintech</p>
                    <p>{location.country}</p>
                </div>
            </a>

        </Link>
    </div>
}

export default StartupComponent;