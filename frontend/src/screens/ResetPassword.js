import React, { useState } from 'react';
import { Container, Form, Col, Row, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import imageSucess from '../Components/ImagesComponent/success.svg';

const ResetPassword = (props) => {
  const [hiddenPassword, setHiddenPassword] = useState('password');
  const [password, setPassword] = useState('');
  const [verifikasiPassword, setVerifikasiPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState(false);
  const [errorAlertMessage, setErrorAlertMessage] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const data = {
      password: password,
      token: props.match.params.token,
    };
    console.log(data.password);

    axios
      .put(`/resetpassword`, data)
      .then((res) => {
        if (res) {
          setAlertMessage('true');
        }
      })
      .catch((err) => {
        if (err) {
          setErrorAlertMessage('Tidak valid');
        }
      });
  };

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

  setTimeout(() => {
    setAlertMessage(false);
    setErrorAlertMessage(false);
  }, 10000);

  console.log('env', process.env.REACT_APP_BASE_URL);

  return (
    <>
      <Container className="container-content-reset-password d-flex justify-content-center align-items-center">
        <Row className="justify-content-md-center">
          <Col>
            <div className="container-div-reset-password">
              {alertMessage ? (
                <>
                  <Alert variant="success">Password Berhasil Diganti</Alert>
                  <img
                    src={imageSucess}
                    fluid
                    width="200px"
                    height="300px"
                    alt={imageSucess}
                  />
                </>
              ) : (
                <>
                  <Form
                    onSubmit={onSubmitHandler}
                    className="container-form-reset-password d-flex flex-column"
                  >
                    <h2 className="text-center title-reset-password">
                      Reset Password
                    </h2>

                    {errorAlertMessage && (
                      <Alert variant="danger">Tidak Valid</Alert>
                    )}

                    <Form.Group>
                      <Form.Label>New Password</Form.Label>
                      <Form.Control
                        type={hiddenPassword}
                        placeholder="Masukkan Password Baru"
                        value={password}
                        required
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
                        required
                        onChange={(e) => {
                          setVerifikasiPassword(e.target.value);
                        }}
                      ></Form.Control>
                      {password !== verifikasiPassword && (
                        <Form.Text className="text-danger">
                          password tidak sama.
                        </Form.Text>
                      )}
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="formBasicCheckbox">
                      <Form.Check
                        type="checkbox"
                        label="Lihat Password"
                        onChange={handlerOnChange}
                      />
                    </Form.Group>
                    <Button
                      type="submit"
                      className="btn button-model-submit "
                      disabled={password !== verifikasiPassword ? true : false}
                    >
                      Simpan
                    </Button>
                  </Form>
                </>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ResetPassword;
