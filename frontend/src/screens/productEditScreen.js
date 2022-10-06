import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Components/message';
import Loader from '../Components/loader';
import FormContainer from '../Components/FormContainer';
import { listProductDetails, updateProduct } from '../action/productActions';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [flavor, setFlavor] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push('/admin/productlist');
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setFlavor(product.flavor);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, history, productId, product, successUpdate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/upload', formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        flavor,
        category,
        description,
        countInStock,
      })
    );
  };

  return (
    <>
      <Container className="py-5">
        <Link to="/admin/productlist" className="btn btn-light my-3">
          Kembali
        </Link>
        <FormContainer>
          <h2 className="title-product-edit-scren">Edit Produk</h2>
          {loadingUpdate && <Loader />}
          {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <Form
              onSubmit={submitHandler}
              className="constainer-form-product-edit-screen"
            >
              <Form.Group controlId="name">
                <Form.Label className="mt-2">Nama</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="price">
                <Form.Label className="mt-2">Harga</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="image">
                <Form.Label className="mt-2">Upload Gambar</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter image url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="image-file">
                <Form.Label className="mt-2">
                  Upload Image From Computer
                </Form.Label>
                <Form.Control
                  type="file"
                  onChange={uploadFileHandler}
                  custom="true"
                />
                {uploading && <Loader />}
              </Form.Group>

              <Form.Group controlId="brand">
                <Form.Label className="mt-2">Rasa</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Masukkan Nama Merk Barang"
                  value={flavor}
                  onChange={(e) => setFlavor(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="countInStock">
                <Form.Label className="mt-2">Jumlah Stock Barang</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Jumlah Stock Barang"
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="category">
                <Form.Label className="mt-2">Kategori</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Masukkan Kategori Barang"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="description">
                <Form.Label className="mt-2">Deskripsi</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Masukkan Deskripsi Barang"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button type="submit" className="btn button-model-submit mt-2">
                Simpan
              </Button>
            </Form>
          )}
        </FormContainer>
      </Container>
    </>
  );
};

export default ProductEditScreen;
