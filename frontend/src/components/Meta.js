import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({ title, description, keyword }) => {
    return (
        <div>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="keywords" content={keyword} />
            </Helmet>
        </div>
    );
};

Meta.defaultProps = {
    title: "welcome to eSHOP",
    keyword: "electronics",
    description: "we sell best product",
};

export default Meta;
