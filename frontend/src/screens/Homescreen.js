import React, { useEffect } from 'react';
import Meta from '../Components/Meta';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Container } from 'react-bootstrap';
import Message from '../Components/message';
import Loader from '../Components/loader';
import Product from '../Components/Product';
import { listProducts } from '../action/productActions';
import Paginate from '../Components/Paginate';
import ProductCarousel from '../Components/productCarousel';
import JumbotronProduct from '../Components/JumbotronProduct';
import MapsScreen from './MapsScreen';

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
        <>
          <JumbotronProduct />
          <ProductCarousel />
        </>
      ) : (
        <Link to="/" className="btn btn-light">
          {' '}
          Kembali
        </Link>
      )}
      <h2 className="sub-title text-center">
        All<span className="style-font span-main-home">Product</span>
      </h2>
      {loading ? (
        <Loader /> // this loading handling
      ) : error ? (
        <Message variant={'danger'}>{error}</Message> //this Error Handle
      ) : (
        <>
          <Container>
            <Row className="card-product">
              {products &&
                products.map((product) => (
                  <Col
                    className="d-flex justify-content-center"
                    key={product._id}
                    sm={12}
                    md={6}
                    lg={4}
                    xl={3}
                  >
                    <Product product={product} />
                  </Col>
                ))}
            </Row>
            <Paginate
              pages={pages}
              page={page}
              keyword={keyword ? keyword : ''}
            />
            <MapsScreen />
          </Container>
        </>
      )}
    </>
  );
};

export default HomeScreen;
