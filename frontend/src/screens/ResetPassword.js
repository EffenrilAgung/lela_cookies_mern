import React, { useState } from 'react';
import { Container, Form, Col, Row, Button, Alert } from 'react-bootstrap';
import Message from '../Components/message';
import axios from 'axios';

const ResetPassword = (props) => {
  const [hiddenPassword, setHiddenPassword] = useState('password');

  const [password, setPassword] = useState('');
  const [verifikasiPassword, setVerifikasiPassword] = useState('');
  const [errorValidate, setErrorValidate] = useState(false);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (password !== verifikasiPassword) {
      setErrorValidate(true);
    } else {
      setErrorValidate(false);
      const data = {
        password: password,
        token: props.match.params.token,
      };
      axios
        .put(
          `http://localhost:9000/resetpassword/${props.match.params.id}/`,
          data
        )
        .then((res) => {
          if (res) {
            alert('password Berhasil Diganti');
          }
        })
        .catch((error) => {
          alert(error);
        });
      console.log(props);
    }
  };

  console.log(errorValidate);

  const handlerOnChange = (e) => {
    if (e.target.checked) {
      if (hiddenPassword === 'password') {
        setHiddenPassword('text');
      } else {
        setHiddenPassword('password');
      }
    } else {
      if (hiddenPassword === 'text') {
        setHiddenPassword('password');
      } else {
        setHiddenPassword('text');
      }
    }
  };

  return (
    <>
      <Container>
        <Row className="justify-content-md-center">
          <Col md={6}>
            <Form onSubmit={onSubmitHandler}>
              <h2 className="text-center">Masukkan Password Baru</h2>
              {errorValidate && (
                <Message variant="danger">Password Tidak Sam</Message>
              )}
              <Form.Group>
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type={hiddenPassword}
                  placeholder="Masukkan Password Baru"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type={hiddenPassword}
                  placeholder="Masukkan Password Baru"
                  value={verifikasiPassword}
                  onChange={(e) => {
                    setVerifikasiPassword(e.target.value);
                  }}
                ></Form.Control>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    label="Lihat Password"
                    onChange={handlerOnChange}
                  />
                </Form.Group>
              </Form.Group>
              <Button
                type="submit"
                disabled={password !== verifikasiPassword ? true : false}
              >
                Simpan
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ResetPassword;
