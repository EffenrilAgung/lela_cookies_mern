import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Components/message';
import Loader from '../Components/loader';
import { getUserDetails, updateUser } from '../action/userAction';
import { USER_UPDATE_RESET } from '../constants/userConstants';

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push('/admin/userList');
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, history, userId, user, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  };

  return (
    <>
      <Container>
        <Link to="/admin/userList" className="btn btn-light my-3">
          Kembali
        </Link>
        <div className="py-2">
          <h2 className="title-user-edit-screen">Edit Pengguna</h2>
          {loadingUpdate && <Loader />}
          {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <Row className="d-flex justify-content-center">
              <Col md={5}>
                <Form onSubmit={submitHandler}>
                  <Form.Group controlId="name">
                    <Form.Label className="form-label-user-edit-screen">
                      Nama
                    </Form.Label>
                    <Form.Control
                      type="name"
                      placeholder="Enter name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="input-form-user-edit-screen"
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId="email" className="mt-3">
                    <Form.Label className="form-label-user-edit-screen">
                      Alamat Email
                    </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input-form-user-edit-screen"
                    ></Form.Control>
                  </Form.Group>

                  <Form.Check
                    className="font-weight-bold"
                    type="switch"
                    id="custom-switch"
                    label="Jadikan Sebagai Admin"
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}
                  />

                  <Button
                    type="submit"
                    variant="primary"
                    className="btn mt-2 button-model-submit"
                  >
                    Simpan
                  </Button>
                </Form>
              </Col>
            </Row>
          )}
        </div>
      </Container>
    </>
  );
};

export default UserEditScreen;
