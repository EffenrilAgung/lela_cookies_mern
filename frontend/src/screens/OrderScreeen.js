import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Components/message';
import Loader from '../Components/loader';
import { deliverOrder, getOrderDetails, payOrder } from '../action/orderAction';
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from '../constants/orderConstants';
import FormatCurrency from '../Components/FormatCurrency';
import { BrowserView, MobileView } from 'react-device-detect';

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id;

  // paypal SDK Hook
  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // selector Paypal
  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  if (!loading) {
    // Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }
    // Paypal script
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&enable-funding=mybank`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    // closing paypal script
    if (!order || successPay || successDeliver || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });

      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, successPay, successDeliver, order]);

  // handlerButton Paypal
  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <div className="py-5 container">
        <h2 className="title-order-screen">Order {order._id}</h2>
        <Row>
          <Col md={8} className="ps-0">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2 className="title-order-screen">Data Penerima</h2>
                <p className="delivery-title-order-screen">
                  <strong>Name : </strong> {order.user.name}
                </p>
                <p className="delivery-title-order-screen">
                  <strong>Email : </strong>
                  <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                </p>
                <p className="delivery-title-order-screen">
                  <strong>Address : </strong>
                  {order.shippingAddress.recipentName},
                  {order.shippingAddress.phoneNumber},{' '}
                  {order.shippingAddress.provinsi},{order.shippingAddress.city},
                  {order.shippingAddress.kecamatan},
                  {order.shippingAddress.kelurahan},
                  {order.shippingAddress.postalCode},
                  {order.shippingAddress.address},
                </p>
                {order.isDelivered ? (
                  <Message
                    variant="success"
                    className="alert-container-success"
                  >
                    Terkirim Pada {order.deliveredAt}
                  </Message>
                ) : (
                  <Message variant="danger" className="alert-container-fail">
                    Tidak Terkirim
                  </Message>
                )}
              </ListGroup.Item>

              <ListGroup.Item>
                <h2 className="title-order-screen">Metode Pembayaran</h2>
                <p>
                  <strong>Metode : </strong>
                  {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <Message
                    variant="success"
                    className="alert-container-success"
                  >
                    Terbayar {order.paidAt}
                  </Message>
                ) : (
                  <Message variant="danger" className="alert-container-fail">
                    Belum Terbayar
                  </Message>
                )}
              </ListGroup.Item>

              <ListGroup.Item>
                <h2 className="title-order-screen">Order Items</h2>
                {order.orderItems.length === 0 ? (
                  <Message>Order Kosong</Message>
                ) : (
                  <>
                    <BrowserView>
                      <ListGroup variant="flush">
                        {order.orderItems.map((item, index) => (
                          <ListGroup.Item key={index}>
                            <Row>
                              <Col md={1}>
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  fluid
                                  rounded
                                />
                              </Col>
                              <Col>
                                <Link to={`/product/${item.product}`}>
                                  {item.name}
                                </Link>
                              </Col>
                              <Col md={4}>
                                {item.qty} x Rp. {item.price} = Rp.{' '}
                                {item.qty * item.price}
                              </Col>
                            </Row>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </BrowserView>
                    <MobileView>
                      <ListGroup variant="flush">
                        {order.orderItems.map((item, index) => (
                          <ListGroup.Item key={index}>
                            <Row>
                              <Col md={1}>
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  fluid
                                  rounded
                                />
                              </Col>
                              <Col className="name-product-order-screen">
                                <Link to={`/product/${item.product}`}>
                                  {item.name}
                                </Link>
                              </Col>
                              <Col
                                md={4}
                                className="total-product-order-screen"
                              >
                                {item.qty} x Rp. {item.price} = Rp.{' '}
                                {item.qty * item.price}
                              </Col>
                            </Row>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </MobileView>
                  </>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Rigkasan Order</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Jumlah</Col>
                    <Col>{FormatCurrency(order.itemsPrice)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Pengiriman</Col>
                    <Col>{FormatCurrency(order.shippingPrice)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Pajak</Col>
                    <Col>{FormatCurrency(order.taxPrice)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Jumlah</Col>
                    <Col>{FormatCurrency(order.totalPrice)}</Col>
                  </Row>
                </ListGroup.Item>

                {!order.isPaid && (
                  <ListGroup.Item>
                    {loadingPay && <Loader />}
                    {!sdkReady ? (
                      <Loader />
                    ) : (
                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={successPaymentHandler}
                      />
                    )}
                  </ListGroup.Item>
                )}
                {loadingDeliver && <Loader />}
                {userInfo &&
                  userInfo.isAdmin &&
                  order.isPaid &&
                  !order.isDelivered && (
                    <ListGroup.Item>
                      <Button
                        type="button"
                        className="btn btn-block"
                        onClick={deliverHandler}
                      >
                        Tandai Sebagai Terkirim
                      </Button>
                    </ListGroup.Item>
                  )}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default OrderScreen;
