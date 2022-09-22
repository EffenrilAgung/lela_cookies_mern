import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import FormatCurrency from './FormatCurrency';
import { Card } from 'react-bootstrap';

const Product = ({ product }) => {
  console.log(FormatCurrency(product.price));
  console.log(product);
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img
        src={product.image}
        variant="top"
        className="card-image"
        fluid
      />

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title className="cardProduct">{product.name}</Card.Title>
        </Link>

        <Card.Text className="my-3">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as="h3"> {FormatCurrency(product.price)}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
