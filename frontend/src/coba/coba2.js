import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../Components/FormContainer';
import CheckoutSteps from '../Components/CheckoutSteps';
import { saveShippingAddress } from '../action/cartActions';
import axios from 'axios';

const Coba2 = ({ history }) => {
  const [apiLoad, setApiLoade] = useState(false);
  const [getApiProvinsi, setApiProvinsi] = useState([]);
  const [getApiKota, setApiKota] = useState([]);
  const [getApiKecamata, setApiKecamatan] = useState([]);
  const [getApiKelurahan, setApiKelurahan] = useState([]);

  const [catchApiProvinsi, setCatchApiProvinsi] = useState();
  const [catchApiKota, setCatchApiKota] = useState(``);

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [provinsi, setProvinsi] = useState(shippingAddress.provinsi);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const [recipent, setRecipent] = useState(shippingAddress.recipent);
  const [phoneNumber, setPhoneNumber] = useState(shippingAddress.phoneNumber);
  const [kecamatan, setKecamatan] = useState(shippingAddress.kecamatan);
  const [kelurahan, setKelurahan] = useState(shippingAddress.kelurahan);

  const dispatch = useDispatch();

  const saveApiProvinsi = () => {
    axios
      .get(
        `https://effenrilagung.github.io/api-wilayah-indonesia/api/provinces.json`
      )
      .then((result) => {
        setApiProvinsi(result.data);
      });
  };
  const saveApiKota = () => {
    if (apiLoad === false) {
      console.log(`api kosong`);
    } else {
      axios
        .get(
          `https://effenrilagung.github.io/api-wilayah-indonesia/api/regencies/${catchApiProvinsi}.json`
        )
        .then((result) => {
          setApiKota(result.data);
          console.log(result.data, `api ada`);
        });
    }
  };
  const saveApiKecamatan = async () => {};
  const saveApiKelurahan = async () => {};

  useEffect(() => {
    saveApiProvinsi();
    saveApiKota();
    saveApiKecamatan();
    saveApiKelurahan();
  }, []);

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

  const handleChange = (e) => {
    e.preventDefault();
    const data = JSON.parse(e.target.value);
    setProvinsi(data.name);
    setCatchApiProvinsi(parseInt(data.id));
    setApiLoade(true);
    console.log(provinsi, catchApiProvinsi);
  };

  return (
    <FormContainer>
      <div className="py-5 container">
        <CheckoutSteps steps1 steps2 />
        <h2>Pengiriman</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="provinsi" className="mt-2">
            <Form.Label> Provinsi</Form.Label>
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => {
                handleChange(e);
              }}
            >
              <option></option>
              {getApiProvinsi.map((prov, index) => {
                // console.log(prov.id);
                return (
                  <option key={index} value={JSON.stringify(prov)}>
                    {prov.name}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="city" className="mt-2">
            <Form.Label> Kota</Form.Label>
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => {
                handleChange(e);
              }}
            >
              <option>Pilih Kota</option>
              {getApiKota.map((kota, index) => {
                // console.log(prov.id);
                return (
                  <option key={index} value={JSON.stringify(kota)}>
                    {kota.name}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>

          {/* <Form.Group controlId="kecamatan" className="mt-2">
            <Form.Label> Kecamatan</Form.Label>
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => setAddress(e.target.value)}
            >
              {getApiKecamata.map((kecamatan) => {
                return (
                  <option key={kecamatan.id} value={kecamatan.name}>
                    {kecamatan.name}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="kelurahan" className="mt-2">
            <Form.Label> Kelurahan</Form.Label>
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => setAddress(e.target.value)}
            >
              {getApiKelurahan.map((kelurahan) => {
                return (
                  <option key={kelurahan.id} value={kelurahan.name}>
                    {kelurahan.name}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="country" className="mt-2">
            <Form.Label> Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Masukkan Nama Negara Tempat Tinggal"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            ></Form.Control>
          </Form.Group> */}

          <Form.Group controlId="postalCode" className="mt-2">
            <Form.Label> Kode Pos</Form.Label>
            <Form.Control
              type="text"
              placeholder="Masukkan Kode Pos"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="recipent" className="mt-2">
            <Form.Label> Nama Penerima</Form.Label>
            <Form.Control
              type="text"
              placeholder="Masukkan Nama Penerima"
              value={recipent}
              onChange={(e) => setRecipent(e.target.value)}
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

          <Button type="submit" className="button-model-submit mt-2">
            Continue
          </Button>
        </Form>
      </div>
    </FormContainer>
  );
};

export default Coba2;
