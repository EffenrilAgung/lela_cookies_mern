import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../Components/FormContainer';
import CheckoutSteps from '../Components/CheckoutSteps';
import { saveShippingAddress } from '../action/cartActions';
import { BrowserView, MobileView } from 'react-device-detect';

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [phoneNumber, setPhoneNumber] = useState(shippingAddress.phoneNumber);
  const [provinsi, setProvinsi] = useState(shippingAddress.provinsi);
  const [city, setCity] = useState(shippingAddress.city);
  const [kecamatan, setKecamatan] = useState(shippingAddress.kecamatan);
  const [kelurahan, setKelurahan] = useState(shippingAddress.kelurahan);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [address, setAddress] = useState(shippingAddress.address);
  const [recipentName, setRecipentName] = useState(shippingAddress.recipent);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({
        address,
        city,
        postalCode,
        recipentName,
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
      <BrowserView>
        <div className="py-5 container">
          <CheckoutSteps steps1 steps2 />
          <h2 className="title-shipping">Tambah Alamat Pengiriman</h2>
          <Form onSubmit={submitHandler}>
            <div className="d-flex flex-column">
              <Row>
                <Col>
                  {' '}
                  <Form.Group controlId="recipent" className="mt-2">
                    <Form.Label> Nama Penerima</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Masukkan Nama Penerima"
                      value={recipentName}
                      onChange={(e) => setRecipentName(e.target.value)}
                      required
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="phoneNumber" className="mt-2">
                    <Form.Label> Nomor Handphone</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Masukkan Nomor Handphone"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group controlId="provinsi" className="mt-3">
                <Form.Label> Provinsi</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nama Provinsi"
                  value={provinsi}
                  onChange={(e) => setProvinsi(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="city" className="mt-3">
                <Form.Label> Kota/Kabupaten</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="kecamatan" className="mt-3">
                <Form.Label> Kecamatan</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nama Kecamatan"
                  value={kecamatan}
                  onChange={(e) => setKecamatan(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="kelurahan" className="mt-3">
                <Form.Label> Kelurahan</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Alamat Kelurahan"
                  value={kelurahan}
                  onChange={(e) => setKelurahan(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="postalCode" className="mt-3">
                <Form.Label> Kode Pos</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Masukkan Kode Pos"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="address" className="mt-3">
                <Form.Label> Alamat Lengkap</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Alamat Lengkap"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>

              <Button type="submit" className="button-model-submit mt-5">
                Lanjutkan
              </Button>
            </div>
          </Form>
        </div>
      </BrowserView>
      <MobileView>
        <div className="py-5 container">
          <CheckoutSteps steps1 steps2 />
          <h2 className="title-shipping">Tambah Alamat Pengiriman</h2>
          <Form onSubmit={submitHandler}>
            <div className="d-flex flex-column">
              {' '}
              <Form.Group controlId="recipent" className="mt-2">
                <Form.Label> Nama Penerima</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Masukkan Nama Penerima"
                  value={recipentName}
                  onChange={(e) => setRecipentName(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="phoneNumber" className="mt-2">
                <Form.Label> Nomor Handphone</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Masukkan Nomor Handphone"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="provinsi" className="mt-3">
                <Form.Label> Provinsi</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nama Provinsi"
                  value={provinsi}
                  onChange={(e) => setProvinsi(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="city" className="mt-3">
                <Form.Label> Kota/Kabupaten</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="kecamatan" className="mt-3">
                <Form.Label> Kecamatan</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nama Kecamatan"
                  value={kecamatan}
                  onChange={(e) => setKecamatan(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="kelurahan" className="mt-3">
                <Form.Label> Kelurahan</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Alamat Kelurahan"
                  value={kelurahan}
                  onChange={(e) => setKelurahan(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="postalCode" className="mt-3">
                <Form.Label> Kode Pos</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Masukkan Kode Pos"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="address" className="mt-3">
                <Form.Label> Alamat Lengkap</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Alamat Lengkap"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>
              <Button type="submit" className="button-model-submit mt-5">
                Lanjutkan
              </Button>
            </div>
          </Form>
        </div>
      </MobileView>
    </FormContainer>
  );
};

export default ShippingScreen;
