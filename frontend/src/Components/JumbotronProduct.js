import React from 'react';
import { Button, Container } from 'react-bootstrap';
import SpanYellow from './spanYellow';

const JumbotronProduct = () => {
  function handleClick() {
    window.scrollBy(0, 1500);
  }
  return (
    <>
      <div className="jumbotron vh-100 vw-100 my-0 mt-0 align-items-center d-flex">
        <Container>
          <div className="d-flex flex-column px-0">
            <h1 className="jumbotron-h1 col-md-7">
              Rasakan Produk Kue Lokal Berkualitas HandMade Lela
              <SpanYellow>Cookies</SpanYellow>
            </h1>
            <p className="jumbotron-lead lead col-md-5">
              Kami percaya, kenikmatan kue kering dihasilkan dari penggunaan
              bahan-bahan halal dan berkualitas.
            </p>
          </div>
          <div className="col col-md-12"></div>
          <Button className="button-jumbotron" onClick={handleClick}>
            Belanja Sekarang
          </Button>
        </Container>
      </div>
    </>
  );
};

export default JumbotronProduct;
