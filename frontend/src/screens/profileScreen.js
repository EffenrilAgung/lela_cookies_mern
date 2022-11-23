import React, { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Form, Button, Row, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Components/message';
import Loader from '../Components/loader';
import { getUserDetails, updateUserProfile } from '../action/userAction';
import { listMyOrders } from '../action/orderAction';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

const RegisterScreen = ({ history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails('profile'));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Password do not match');
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          name,
          email,
          password,
        })
      );
    }
  };
  return (
    <Container>
      <Row className="py-4">
        <Col md={3}>
          <h2 className="title-profile-screen">Edit Profile</h2>
          {message && <Message variant="primary">{message}</Message>}
          {error && <Message variant="danger">{error}</Message>}
          {success && <Message variant="success">Profile Update</Message>}
          {loading && <Loader />}

          <Form onSubmit={submitHandler}>
            <Form.Group
              controlId="name"
              className="container-form-input-profile-screen"
            >
              <Form.Label> Nama</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control-profile-screen"
              ></Form.Control>
            </Form.Group>

            <Form.Group
              controlId="email"
              className="container-form-input-profile-screen"
            >
              <Form.Label>Alamat Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control-profile-screen"
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group
              controlId="password"
              className="container-form-input-profile-screen"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control-profile-screen"
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group
              controlId="confirmPassword"
              className="container-form-input-profile-screen"
            >
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password "
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="form-control-profile-screen"
                required
              ></Form.Control>
            </Form.Group>

            <Button
              type="submit"
              variant="primary"
              className="mt-3 button-model-submit"
            >
              Update
            </Button>
          </Form>
        </Col>
        <Col md={9}>
          <h2 className="title-profile-screen">My Order</h2>
          {loadingOrders ? (
            <Loader />
          ) : errorOrders ? (
            <Message bvariant="danger">{errorOrders}</Message>
          ) : (
            <Row>
              <Col className="container-table-profile-screen">
                <Table
                  striped
                  bordered
                  hover
                  className="table-sm my-order-profile-screen"
                >
                  <thead>
                    <tr className="w-100">
                      <th className="text-center">ID</th>
                      <th className="text-center">TANGGAL</th>
                      <th className="text-center">JUMLAH</th>
                      <th className="text-center">METODE PEMBAYARAN</th>
                      <th className="text-center">TERBAYAR</th>
                      <th className="text-center">TERKIRIM</th>
                      <th className="text-center">RINCIAN</th>
                    </tr>
                  </thead>
                  {orders.map((order) => (
                    <tbody key={order._id}>
                      <tr>
                        <td>{order._id}</td>
                        <td>{order.create_At}</td>
                        <td>Rp. {order.totalPrice}</td>
                        <td>{order.paymentMethod}</td>
                        <td className="text-center">
                          {order.isPaid ? (
                            order.paidAt
                          ) : (
                            <i
                              className="fas fa-times"
                              style={{ color: 'red' }}
                            ></i>
                          )}
                        </td>

                        <td className="text-center">
                          {order.isDelivered ? (
                            order.deliveredAt
                          ) : (
                            <i
                              className="fas fa-times"
                              style={{ color: 'red' }}
                            ></i>
                          )}
                        </td>
                        <td className="text-center">
                          <LinkContainer to={`/order/${order._id}`}>
                            <Button
                              className="btn-sm button-model-submit"
                              variant="light"
                            >
                              Rincian
                            </Button>
                          </LinkContainer>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </Table>
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterScreen;
