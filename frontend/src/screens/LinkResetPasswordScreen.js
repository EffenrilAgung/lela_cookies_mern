import React, { useState } from 'react';
import { Container, Form, Col, Row, Button } from 'react-bootstrap';
import axios from 'axios';
import Message from '../Components/message';
import imagePassword from '../Components/ImagesComponent/forgot-password.svg';
import emailSend from '../Components/ImagesComponent/mail-send.svg';

const LinkResetPassword = () => {
  const [email, setEmail] = useState('');
  const [alertMessage, setAlertMessage] = useState(false);
  const [errorMessage, setErorrMessage] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    await axios
      .put('http://localhost:4000/forgotpassword', { email: email })
      .then((res) => {
        if (res) {
          setAlertMessage(true);
        }
      })
      .catch((error) => {
        if (error) {
          setErorrMessage(true);
        }
      });
    setTimeout(() => {
      setAlertMessage('');
      setErorrMessage('');
    }, 3000);
  };

  return (
    <>
      <Container>
        <Row className="justify-content-md-center">
          <Col md={6}>
            <Form onSubmit={onSubmitHandler}>
              <h2 className="text-center">Masukkan Email Terdaftar</h2>
              <div className="text-contruction-reset-password d-flex justify-content-center">
                <p>
                  Jangan khawatir kami akan mengirimkan anda link reset password
                </p>
              </div>
              {errorMessage ? (
                <>
                  <div className="email-not-register">
                    <div className="image-container-link-reset-password d-flex justify-content-center">
                      <img
                        src={imagePassword}
                        alt="forgot password"
                        className="image-link-reset-password"
                      />
                    </div>
                    <Message variant="danger">Email Belum Terdaftar</Message>
                  </div>
                </>
              ) : alertMessage ? (
                <div className="email-register">
                  <div className="image-container-link-reset-password d-flex justify-content-center">
                    <img
                      src={emailSend}
                      alt="forgot password"
                      className="image-link-reset-password"
                    />
                  </div>
                  <Message variant="success">Silahkan Cek Email Anda</Message>
                </div>
              ) : (
                <>
                  <Form.Group className="container-form-link-reset-password">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Masukkan Email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      required
                    ></Form.Control>
                  </Form.Group>
                  <Button type="submit" className="btn button-effect-mod">
                    Kirim
                  </Button>
                </>
              )}
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LinkResetPassword;
