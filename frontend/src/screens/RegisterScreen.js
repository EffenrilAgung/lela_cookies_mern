import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Components/message';
import Loader from '../Components/loader';
import { register } from '../action/userAction';
import SpanYellow from '../Components/spanYellow';
const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <>
      {/* <div className="row">
        <div className="image-sign-in col col-md-6 vh-100 d-flex justify-content-center align-items-center">
          <div className="col-md-4">
            <h2 className="title-image-login">
              Login With Lela <SpanYellow>Cookies</SpanYellow>
            </h2>
          </div>
        </div>
        <div className="col col-md-6 vh-100 d-flex justify-content-center align-items-start flex-column">
          <h1>Sign Up</h1>
          {message && <Message variant="danger">{message}</Message>}
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Nama</Form.Label>
              <Form.Control
                type="name"
                placeholder="Masukkan Nama Legkap"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Alamat Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Masukkan Alamat Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            Sudah memiliki akun?{' '}
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
              masuk
            </Link>
            <Button type="submit" variant="primary">
              Daftar
            </Button>
          </Form>
        </div>
      </div> */}
    </>
  );
};

export default RegisterScreen;
