import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Container, Image } from 'react-bootstrap';
import Loader from './loader';
import Message from './message';
import { listTopProducts } from '../action/productActions';
import { useDispatch, useSelector } from 'react-redux';
import SpanYellow from './spanYellow';
import FormatCurrency from './FormatCurrency';

const productCarousel = () => {
  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, error, products } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <Container>
        <h2 className="sub-title text-center">
          Best <SpanYellow>Product</SpanYellow>{' '}
        </h2>
        <Carousel pause="hover" className="bg-dark">
          {products.map((product) => (
            <Carousel.Item key={product._id}>
              <Link to={`/product/${product._id}`} className="d-flex">
                <Image src={product.image} alt={product.name} fluid />
                <Carousel.Caption className="carousel-caption">
                  <h2>
                    {product.name} ({FormatCurrency(product.price)})
                  </h2>
                </Carousel.Caption>
              </Link>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    </>
  );
};

export default productCarousel;
