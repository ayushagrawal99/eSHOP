import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Product from "../components/Product";
import { listProducts } from "../actions/productactions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";

const HomeScreen = ({ match }) => {
    const keyword = match.params.keyword;
    const pageNumber = match.params.pageNumber || 1;

    // use for dispatch action - mapDispatchToProps
    const dispatch = useDispatch();

    // get the state - mapStateToProps
    const productList = useSelector((state) => state.productList);

    // get whatever data we want
    const { loading, error, products } = productList;

    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber));
    }, [dispatch, keyword, pageNumber]);

    return (
        <div>
            <Meta title="eSHOP" />
            {!keyword ? (
                <ProductCarousel />
            ) : (
                <Link to="/" className="btn btn-light">
                    Go Back
                </Link>
            )}
            <h1>Latest Product</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Row>
                    {products.map((product) => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
};

export default HomeScreen;
