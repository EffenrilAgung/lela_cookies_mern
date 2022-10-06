import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Components/message';
import Loader from '../Components/loader';
import Paginate from '../Components/Paginate';
import {
  listProducts,
  deleteProduct,
  createProduct,
} from '../action/productActions';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';
import FormatCurrency from '../Components/FormatCurrency';

const ProductListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;

  let x = 1;
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login');
    }
    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts('', pageNumber));
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm('are you sure')) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <>
      <div className="py-2 container">
        <Row className="align-items-center">
          <Col>
            <h2 className="title-product-list-screen">Barang</h2>
          </Col>
          <Col className="d-flex justify-content-end">
            <Button
              className="button-model-submit my-3 button-product-list-screen"
              onClick={createProductHandler}
            >
              <i className="fas fa-plus text-white"></i> Buat Barang Baru
            </Button>
          </Col>
        </Row>
        {loadingDelete && <Loader />}
        {errorDelete && <Message variant="danger">{errorDelete}</Message>}
        {loadingCreate && <Loader />}
        {errorCreate && <Message variant="danger">{errorCreate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            <Table
              striped
              bordered
              hover
              responsive
              className="table-sm table-container table-container-product-list-screen"
            >
              <thead>
                <tr>
                  <th>NO</th>
                  <th>ID</th>
                  <th>NAMA</th>
                  <th>HARGA</th>
                  <th>KATEGORI</th>
                  <th>RASA</th>
                  <th>ACTION</th>
                </tr>
              </thead>

              {products.map((product) => {
                return (
                  <tbody key={product._id}>
                    <tr>
                      <td className="text-center">{x++}</td>
                      <td>{product._id}</td>
                      <td>{product.name}</td>
                      <td>
                        <td> {FormatCurrency(product.price)}</td>
                      </td>
                      <td>{product.category}</td>
                      <td>{product.flavor}</td>
                      <td className="text-center">
                        <LinkContainer
                          to={`/admin/product/${product._id}/edit`}
                        >
                          <Button variant="light" className="btn-sm">
                            <i className="fas fa-edit"></i>
                          </Button>
                        </LinkContainer>
                        <Button
                          variant="danger"
                          className="btn-sm"
                          onClick={() => deleteHandler(product._id)}
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </Table>
            <Paginate pages={pages} page={page} isAdmin={true}></Paginate>
          </>
        )}
      </div>
    </>
  );
};

export default ProductListScreen;
