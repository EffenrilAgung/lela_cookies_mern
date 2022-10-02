import React, { useState } from 'react';
import { Container, Form, Col, Row, Button } from 'react-bootstrap';
import axios from 'axios';
import Message from '../Components/message';

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
              {errorMessage ? (
                <Message variant="danger">Email Belum Terdaftar</Message>
              ) : alertMessage ? (
                <Message variant="success">Silahkan Cek Email Anda</Message>
              ) : (
                <>
                  <Form.Group>
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
                </>
              )}

              <Button type="submit">Simpan</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LinkResetPassword;
