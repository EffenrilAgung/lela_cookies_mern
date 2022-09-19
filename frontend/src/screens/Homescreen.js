import React, { useEffect } from 'react';
import Meta from '../Components/Meta';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Message from '../Components/message';
import Loader from '../Components/loader';
import Product from '../Components/Product';
import { listProducts } from '../action/productActions';
import Paginate from '../Components/Paginate';
import ProductCarousel from '../Components/productCarousel';

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light">
          {' '}
          Go Back
        </Link>
      )}
      <h1>Lates Product</h1>
      {loading ? (
        <Loader /> // this loading handling
      ) : error ? (
        <Message variant={'danger'}>{error}</Message> //this Error Handle
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
