import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Components/message';
import Loader from '../Components/loader';
import { register } from '../action/userAction';
import { BrowserView, MobileView } from 'react-device-detect';
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
      <BrowserView>
        <div className="row">
          <div className="image-sign-up col col-md-6 vh-100 d-flex justify-content-center align-items-center">
            <h2 className="title-image-sign-up">
              Rasakan kemudahan dalam berbelanja
            </h2>
          </div>
          <div className="col col-md-6 vh-100 d-flex justify-content-center align-items-start flex-column ">
            <div className="container-form-sign-up">
              <h2 className="title-sign-up-form">
                Daf<SpanYellow>tar</SpanYellow>
              </h2>
              <p className="text-sign-up">
                Daftarkan diri anda untuk kemudahan dalam berbelanja
              </p>
              {message && <Message variant="danger">{message}</Message>}

              {error && <Message variant="danger">{error}</Message>}

              {loading && <Loader />}
              <Form onSubmit={submitHandler}>
                <Form.Group controlId="name" className="container-form">
                  <Form.Label className="label-form-sign-up">Nama</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder="Masukkan Nama Legkap"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-input-sign-up"
                    required
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="email" className="container-form">
                  <Form.Label className="label-form-sign-up">
                    Alamat Email
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Masukkan Alamat Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input-sign-up"
                    required
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="password" className="container-form">
                  <Form.Label className="label-form-sign-up">
                    Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input-sign-up"
                    required
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="confirmPassword">
                  <Form.Label className="label-form-sign-up">
                    Confirm Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="form-input-sign-up"
                    required
                  ></Form.Control>
                </Form.Group>
                <div className="link-login">
                  Sudah memiliki akun?{' '}
                  <Link
                    style={{ color: 'rgba(255, 203, 8, 1)', fontWeight: '400' }}
                    to={redirect ? `/login?redirect=${redirect}` : '/login'}
                  >
                    masuk
                  </Link>
                </div>

                <Button type="submit" className="button-sign-up">
                  Daftar
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </BrowserView>
      <MobileView>
        <Container>
          <div className="my-3 d-flex justify-content-center align-items-center flex-column ">
            <div className="container-form-sign-up">
              <h2 className="title-sign-up-form">
                Daf<SpanYellow className="title-font-yellow">tar</SpanYellow>
              </h2>
              <p className="text-sign-up">
                Daftarkan diri anda untuk kemudahan dalam berbelanja
              </p>
              {message && <Message variant="danger">{message}</Message>}

              {error && <Message variant="danger">{error}</Message>}

              {loading && <Loader />}
              <Form onSubmit={submitHandler}>
                <Form.Group controlId="name" className="container-form">
                  <Form.Label className="label-form-sign-up">Nama</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder="Masukkan Nama Legkap"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-input-sign-up"
                    required
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="email" className="container-form">
                  <Form.Label className="label-form-sign-up">
                    Alamat Email
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Masukkan Alamat Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input-sign-up"
                    required
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="password" className="container-form">
                  <Form.Label className="label-form-sign-up">
                    Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input-sign-up"
                    required
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="confirmPassword">
                  <Form.Label className="label-form-sign-up">
                    Confirm Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="form-input-sign-up"
                    required
                  ></Form.Control>
                </Form.Group>
                <div className="link-login">
                  Sudah memiliki akun?{' '}
                  <Link
                    style={{ color: 'rgba(255, 203, 8, 1)', fontWeight: '400' }}
                    to={redirect ? `/login?redirect=${redirect}` : '/login'}
                  >
                    masuk
                  </Link>
                </div>

                <Button type="submit" className="button-sign-up">
                  Daftar
                </Button>
              </Form>
            </div>
          </div>
        </Container>
      </MobileView>
    </>
  );
};

export default RegisterScreen;
