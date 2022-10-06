import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../Components/FormContainer';
import CheckoutSteps from '../Components/CheckoutSteps';
import { savePaymentMethod } from '../action/cartActions';

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress.address) {
    history.push('/shipping');
  }

  //   Hook payment method

  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const dispatch = useDispatch();

  // Payment Method
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeorder');
  };

  return (
    <FormContainer>
      <div className="mt-5">
        <CheckoutSteps step1 step2 step3 />
      </div>
      <h2 className="title-payment-method">Metode Pembayaran</h2>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend" className="sub-title-method-payment">
            Pilih Metode Pembayaran
          </Form.Label>
          <Col className="form-check-method-payment">
            <Form.Check
              className="my-2"
              type="radio"
              label="PayPal or Credit Card"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
            {/* <Form.Check
              type="radio"
              label="Stripe"
              id="Stripe"
              name="paymentMethod"
              value="Stripe"
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>*/}
          </Col>
        </Form.Group>

        <Button type="submit" className="button-model-submit button-effect-mod">
          Lanjutkan
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
