import React from "react";

const InfoBox = ({heading, text}) => {
    return <div className="text-center mb-5"><h4>{text}</h4><small>(You can choose more than one option that suits you.)</small></div>;
}

export default InfoBox;