import { React, useState } from 'react';
import { Container, Form } from 'react-bootstrap';
const [resetPassword, setResetPassword] = useState({});

const submitHandler = (e) => {
  console.log(e);
};
const forgotPassword = () => {
  return (
    <Container>
      <Form onSubmit={submitHandler}>
        <h2 className="text-center">Masukkan Password Baru</h2>
        <Form.Group>
          <Form.Label>Password Baru</Form.Label>
          <Form.Control
            type="password"
            placeholder="Masukkan Password Baru"
            onChange={(e) => setResetPassword('email', e.target.value)}
          ></Form.Control>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default forgotPassword;
