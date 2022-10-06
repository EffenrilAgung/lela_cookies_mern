import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Container,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Components/message';
import CheckoutSteps from '../Components/CheckoutSteps';
import { createOrder } from '../action/orderAction';
import FormatCurrency from '../Components/FormatCurrency';
import { BrowserView, MobileView } from 'react-device-detect';

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  //   Calculate Prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
    // eslint-disable-next-line
  }, [history, success]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsprice: cart.itmesPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };
  return (
    <>
      <Container className="py-3">
        <CheckoutSteps steps1 steps2 steps3 step4 />
        <BrowserView>
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2 className="title-place-order-screen">Pengiriman</h2>
                  <div className="container-sub-title-place-order-screen">
                    <p>
                      <strong>Alamat : </strong>
                      {cart.shippingAddress.recipentName},
                      {cart.shippingAddress.phoneNumber},{' '}
                      {cart.shippingAddress.provinsi},
                      {cart.shippingAddress.city},
                      {cart.shippingAddress.kecamatan},
                      {cart.shippingAddress.kelurahan},
                      {cart.shippingAddress.postalCode},
                      {cart.shippingAddress.address},
                    </p>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2 className="title-place-order-screen second-title mt-4">
                    Metode Pembayaran
                  </h2>
                  <div className="sub-title-place-order-screen">
                    <strong>Metode : </strong>
                    {cart.paymentMethod}
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2 className="title-place-order-screen mt-4">Pesanan</h2>
                  {cart.cartItems.length === 0 ? (
                    <Message>Keranjang Masih Kosong</Message>
                  ) : (
                    <ListGroup>
                      {cart.cartItems.map((item, index) => (
                        <ListGroup.Item
                          key={index}
                          className="mb-3 border-1  rounded-1 "
                        >
                          <Row className="col-place-order-screen p-2 ">
                            <Col md={2} className="p-0">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fluid
                                rounded
                                className="image-place-order-screen"
                              />
                            </Col>
                            <Col className="my-0 d-flex align-items-center">
                              <Link
                                className="link-product"
                                to={`/product/${item.product}`}
                              >
                                {item.name}
                              </Link>
                            </Col>
                            <Col
                              md={4}
                              className="total-order-place-order-screen p-0 d-flex align-items-center"
                            >
                              {item.qty} X {FormatCurrency(item.price)} =
                              {item.qty * item.price}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h2>Rigkasan Pesanan</h2>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col className="order-summary-place-order-screen">
                        Jumlah
                      </Col>
                      <Col>{FormatCurrency(cart.itemsPrice)}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col className="order-summary-place-order-screen">
                        Pengiriman
                      </Col>
                      <Col>{FormatCurrency(cart.shippingPrice)}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col className="order-summary-place-order-screen">
                        Pajak
                      </Col>
                      <Col>{FormatCurrency(cart.taxPrice)}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col className="order-summary-place-order-screen">
                        Jumlah
                      </Col>
                      <Col>{FormatCurrency(cart.totalPrice)}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    {error && <Message variant="danger">{error}</Message>}
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-center">
                    <Button
                      type="button"
                      className="btn w-100 d-flex justify-content-center button-effect-mod"
                      disabled={cart.cartItems === 0}
                      onClick={placeOrderHandler}
                    >
                      Bayar Pesanan
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </BrowserView>
        <MobileView>
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2 className="title-place-order-screen">Pengiriman</h2>
                  <div className="container-sub-title-place-order-screen">
                    <p>
                      <strong>Alamat : </strong>
                      {cart.shippingAddress.address},{' '}
                      {cart.shippingAddress.city},{' '}
                      {cart.shippingAddress.postalCode},{' '}
                      {cart.shippingAddress.country},{' '}
                      {cart.shippingAddress.phoneNumber},{' '}
                      {cart.shippingAddress.provinsi},{' '}
                      {cart.shippingAddress.kecamatan},{' '}
                      {cart.shippingAddress.kelurahan}
                    </p>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2 className="title-place-order-screen second-title mt-4">
                    Metode Pembayaran
                  </h2>
                  <div className="sub-title-place-order-screen">
                    <strong>Metode : </strong>
                    {cart.paymentMethod}
                  </div>
                </ListGroup.Item>
                <ListGroup.Item className="px-0">
                  <h2 className="title-place-order-screen mt-4">Pesanan</h2>
                  {cart.cartItems.length === 0 ? (
                    <Message>Keranjang Masih Kosong</Message>
                  ) : (
                    <ListGroup>
                      {cart.cartItems.map((item, index) => (
                        <ListGroup.Item
                          key={index}
                          className="mb-3 border-1  rounded-1 px-0"
                        >
                          <Row className="col-place-order-screen px-0 ">
                            <Col className="p-0 d-flex justify-content-center">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fluid
                                rounded
                                className="image-place-order-screen"
                              />
                            </Col>
                            <Col className="my-0 d-flex align-items-center">
                              <Link
                                className="link-product"
                                to={`/product/${item.product}`}
                              >
                                {item.name}
                              </Link>
                            </Col>
                            <Col className="total-order-place-order-screen p-0 d-flex align-items-center">
                              {item.qty} X {FormatCurrency(item.price)} =
                              {item.qty * item.price}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h2>Rigkasan Pesanan</h2>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col className="order-summary-place-order-screen">
                        Jumlah
                      </Col>
                      <Col>{FormatCurrency(cart.itemsPrice)}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col className="order-summary-place-order-screen">
                        Pengiriman
                      </Col>
                      <Col>{FormatCurrency(cart.shippingPrice)}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col className="order-summary-place-order-screen">
                        Pajak
                      </Col>
                      <Col>{FormatCurrency(cart.taxPrice)}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col className="order-summary-place-order-screen">
                        Jumlah
                      </Col>
                      <Col>{FormatCurrency(cart.totalPrice)}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    {error && <Message variant="danger">{error}</Message>}
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-center">
                    <Button
                      type="button"
                      className="btn w-100 d-flex justify-content-center button-effect-mod"
                      disabled={cart.cartItems === 0}
                      onClick={placeOrderHandler}
                    >
                      Bayar Pesanan
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </MobileView>
      </Container>
    </>
  );
};

export default PlaceOrderScreen;
