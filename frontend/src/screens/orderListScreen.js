import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Components/message';
import Loader from '../Components/loader';
import { listOrders } from '../action/orderAction';

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo]);

  return (
    <>
      <div className="py-2 container">
        <h1>Order</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>PELANGGAN</th>
                <th>TANGGAL</th>
                <th>TOTAL</th>
                <th>TERBAYAR</th>
                <th>TERKIRIM</th>
                <th>DETAIL</th>
              </tr>
            </thead>
            {orders.map((order) => {
              console.log(order);
              return (
                <tbody key={order._id}>
                  <tr>
                    <td>{order._id}</td>
                    <td>{order.user && order.user.name}</td>
                    <td>{order.create_At}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: 'red' }}
                        ></i>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: 'red' }}
                        ></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button variant="light" className="btn-sm">
                          Rincian
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </Table>
        )}
      </div>
    </>
  );
};

export default OrderListScreen;
