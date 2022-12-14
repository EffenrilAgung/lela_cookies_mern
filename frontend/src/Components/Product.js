import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import FormatCurrency from './FormatCurrency';
import { Card } from 'react-bootstrap';

const Product = ({ product }) => {
  return (
    <>
      <Card className="card-product-homescreen" style={{ width: '18rem' }}>
        <Link to={`/product/${product._id}`}>
          <Card.Img
            src={product.image}
            variant="top"
            className="card-image"
            fluid
          />

          <Card.Body>
            <Card.Title className="cardProduct">{product.name}</Card.Title>

            <Card.Text className="my-3">
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </Card.Text>

            <Card.Text as="h3"> {FormatCurrency(product.price)}</Card.Text>
          </Card.Body>
        </Link>
      </Card>
    </>
  );
};

export default Product;
