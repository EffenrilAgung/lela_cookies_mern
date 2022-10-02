import React, { useState } from 'react';
import { Container, Form, Col, Row, Button } from 'react-bootstrap';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [verifikasiPassword, setVerifikasiPassword] = useState('');

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (password !== verifikasiPassword) {
      console.log('tidak sama');
    } else {
      console.log('sama');
    }
  };

  return (
    <>
      <Container>
        <Row className="justify-content-md-center">
          <Col md={6}>
            <Form onSubmit={onSubmitHandler}>
              <h2 className="text-center">Masukkan Password Baru</h2>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Masukkan Password Baru"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Masukkan Kembali Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Masukkan Password Baru"
                  value={verifikasiPassword}
                  onChange={(e) => {
                    setVerifikasiPassword(e.target.value);
                  }}
                ></Form.Control>
              </Form.Group>
              <Button type="submit">Simpan</Button>
            </Form>
            <h1>Berhasil</h1>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ResetPassword;
