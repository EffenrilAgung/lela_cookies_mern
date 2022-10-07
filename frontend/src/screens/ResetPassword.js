import React, { useState } from 'react';
import { Container, Form, Col, Row, Button } from 'react-bootstrap';
import Message from '../Components/message';
import axios from 'axios';

const ResetPassword = (props) => {
  const [hiddenPassword, setHiddenPassword] = useState('password');
  const [alertMessage, setAlertMessage] = useState(false);
  const [errorAlertMessage, setErrorAlertMessage] = useState('');
  const [password, setPassword] = useState('');
  const [verifikasiPassword, setVerifikasiPassword] = useState('');
  const [errorValidate, setErrorValidate] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (password !== verifikasiPassword) {
      setErrorValidate(true);
    } else {
      setErrorValidate(false);
      const data = {
        id: props.match.params.id,
        token: props.match.params.token,
        password: password,
      };

      await axios
        .put(`http://localhost:9000/resetpassword`, data)
        .then((res) => {
          if (res) {
            setAlertMessage(true);
          }
        })
        .catch((err) => {
          if (err) {
            setErrorAlertMessage(err);
          }
        });
    }
    setTimeout(() => {
      setAlertMessage('');
      setErrorAlertMessage('');
    }, 3000);
  };

  console.log(props.match.params.token);

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
      <Container className="container-content-reset-password d-flex justify-content-center align-items-center">
        <Row className="justify-content-md-center">
          <Col>
            <div className="container-div-reset-password">
              <Form
                onSubmit={onSubmitHandler}
                className="container-form-reset-password d-flex flex-column"
              >
                <h2 className="text-center title-reset-password">
                  Reset Password
                </h2>
                {errorValidate && (
                  <Message variant="danger">Password Tidak Sama</Message>
                )}
                {alertMessage && (
                  <Message variant="success">Password berhasil diganti</Message>
                )}
                {errorAlertMessage && (
                  <Message variant="danger">{errorAlertMessage}</Message>
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
                <Form.Group className="mt-3">
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
                  className="btn button-model-submit "
                  disabled={password !== verifikasiPassword ? true : false}
                >
                  Simpan
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ResetPassword;
