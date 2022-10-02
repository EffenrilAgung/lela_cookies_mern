import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Components/message';
import Loader from '../Components/loader';
import { login } from '../action/userAction';
import SpanYellow from '../Components/spanYellow';
import { BrowserView, MobileView } from 'react-device-detect';

const MobileLoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <>
      <BrowserView>
        <div className="row">
          <div className="image-login col col-md-6 vh-100 d-flex justify-content-center align-items-center">
            <div className="col-md-4">
              <h2 className="title-image-login">
                Login With Lela <SpanYellow>Cookies</SpanYellow>
              </h2>
            </div>
          </div>
          <div className="col col-md-6 vh-100 d-flex justify-content-center align-items-start flex-column">
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            <div className="form-right">
              <h2 className="title-login">
                Welcome <SpanYellow>Back</SpanYellow>
              </h2>
              <p className="login-text text-lead">
                Untuk tetap terhubung dengan kami, silakan masuk dengan
                informasi pribadi Anda menggunakan email dan kata sandi
              </p>
              <Form onSubmit={submitHandler}>
                <Form.Group controlId="email" className="group-email ">
                  <i className="icon-email fa-sharp fa-solid fa-envelope"></i>
                  <Form.Label className="label-email text-center">
                    Email Address
                  </Form.Label>
                  <Form.Control
                    className="input-email"
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="password" className="group-password">
                  <i className="icon-password fa-sharp fa-solid fa-key"></i>
                  <Form.Label className="label-password">Password</Form.Label>
                  <Form.Control
                    className="input-password"
                    type="password"
                    placeholder="Enter Password "
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <span className="login-new-user d-block">
                  Pelanggan Baru?{' '}
                  <Link
                    to={
                      redirect ? `/register?redirect=${redirect}` : '/register'
                    }
                  >
                    Daftar
                  </Link>
                </span>
                <Button
                  type="submit"
                  className="button-login"
                  variant="primary"
                >
                  Sign In
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </BrowserView>
      <MobileView>
        <div className="vh-100 d-flex justify-content-center align-items-center flex-column container-mobile">
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}
          <div className="py-5">
            <h2 className="title-login text-center">
              Welcome{' '}
              <SpanYellow className="mobile-yellow-span">Back</SpanYellow>
            </h2>
            <p className="login-text text-lead">
              Untuk tetap terhubung dengan kami, silakan masuk dengan informasi
              pribadi Anda menggunakan email dan kata sandi
            </p>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="email" className="group-email ">
                <i className="icon-email fa-sharp fa-solid fa-envelope"></i>
                <Form.Label className="label-email text-center">
                  Email Address
                </Form.Label>
                <Form.Control
                  className="input-email"
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="password" className="group-password">
                <i className="icon-password fa-sharp fa-solid fa-key"></i>
                <Form.Label className="label-password">Password</Form.Label>
                <Form.Control
                  className="input-password"
                  type="password"
                  placeholder="Enter Password "
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <span className="login-new-user d-block mb-3">
                Pelanggan Baru?{' '}
                <Link
                  style={{ color: 'rgba(255, 203, 8, 1)', fontWeight: '500' }}
                  to={redirect ? `/register?redirect=${redirect}` : '/register'}
                >
                  Daftar
                </Link>
              </span>
              <Button type="submit" className="button-login" variant="primary">
                Sign In
              </Button>
            </Form>
          </div>
        </div>
      </MobileView>
    </>
  );
};

export default MobileLoginScreen;
