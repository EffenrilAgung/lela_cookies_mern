import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../Components/FormContainer';
import CheckoutSteps from '../Components/CheckoutSteps';
import { saveShippingAddress } from '../action/cartActions';

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const [recipent, setRecipent] = useState(shippingAddress.recipent);
  const [phoneNumber, setPhoneNumber] = useState(shippingAddress.phoneNumber);
  const [provinsi, setProvinsi] = useState(shippingAddress.provinsi);
  const [kecamatan, setKecamatan] = useState(shippingAddress.kecamatan);
  const [kelurahan, setKelurahan] = useState(shippingAddress.kelurahan);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({
        address,
        city,
        postalCode,
        country,
        recipent,
        phoneNumber,
        provinsi,
        kecamatan,
        kelurahan,
      })
    );
    history.push('/payment');
  };

  return (
    <FormContainer>
      <CheckoutSteps steps1 steps2 />
      <h2>Pengiriman</h2>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label> Alamat Lengkap</Form.Label>
          <Form.Control
            type="text"
            placeholder="Alamat Lengkap"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label> Kota</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="postalCode">
          <Form.Label> Kode Pos</Form.Label>
          <Form.Control
            type="text"
            placeholder="Masukkan Kode Pos"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="country">
          <Form.Label> Negara</Form.Label>
          <Form.Control
            type="text"
            placeholder="Masukkan Nama Negara Tempat Tinggal"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="recipent">
          <Form.Label> Nama Penerima</Form.Label>
          <Form.Control
            type="text"
            placeholder="Masukkan Nama Penerima"
            value={recipent}
            onChange={(e) => setRecipent(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="phoneNumber">
          <Form.Label> Nomor Handphone</Form.Label>
          <Form.Control
            type="number"
            placeholder="Masukkan Nomor Handphone"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="provinsi">
          <Form.Label> Provinsi</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nama Provinsi"
            value={provinsi}
            onChange={(e) => setProvinsi(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="kecamatan">
          <Form.Label> Kecamatan</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nama Kecamatan"
            value={kecamatan}
            onChange={(e) => setKecamatan(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="kelurahan">
          <Form.Label> Kelurahan</Form.Label>
          <Form.Control
            type="text"
            placeholder="Alamat Kelurahan"
            value={kelurahan}
            onChange={(e) => setKelurahan(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
