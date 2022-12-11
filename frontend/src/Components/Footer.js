import React from 'react';
import { Container } from 'react-bootstrap';

const componentDidMount = () => {
  let now = new Date();
  let year = now.getFullYear();
  return year;
};

const Footer = () => {
  return (
    <>
      <footer>
        <div className="container-footer">
          <Container>
            <div className="row">
              <div className="col-md-4">
                <div className="d-flex justify-content-center flex-column"></div>
                <h2 className="name-title-owner">
                  lela <span className="style-font span-footer">Cookies</span>
                </h2>
                <p className="story-owner">
                  Lela cookies adalah home industry yang bergerak dalam bidang
                  pembuatan kue kering dengan menggunakan handmade
                </p>
                <p className="name-owner ">~ Nur Lela, Pemilik</p>
              </div>
              <div className="col-md-4">
                <div className="d-flex container-keep-connect justify-content-center flex-column">
                  <h2 className="title-share-media-social">keep connect</h2>
                  <div className="d-flex  container-icon">
                    <div className="icons8-instagram"></div>
                    <div className="name-social-media">instagram</div>
                  </div>
                  <div className="d-flex  container-icon">
                    <div className="icons8-facebook"></div>
                    <div className="name-social-media">facebook</div>
                  </div>
                  <div className="d-flex  container-icon">
                    <div className="icons8-whatsapp"></div>
                    <div className="name-social-media">whatsapp</div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="d-flex container-keep-connect justify-content-center flex-column">
                  <h2 className="title-share-media-social">keep connect</h2>
                  <div className="d-flex  container-icon">
                    <div className="icons8-home"></div>
                    <div className="name-social-media">
                      Sei mati batang kilat lingkungan III, kec. Medan Labuhan
                    </div>
                  </div>
                  <div className="d-flex  container-icon">
                    <div className="icons-whatsapp"></div>
                    <div className="name-social-media">085362731358</div>
                  </div>
                </div>
              </div>
            </div>
          </Container>

          <div className="text-center m-0 footer-note">
            Built with |{' '}
            <img
              src="https://www.malasngoding.com/wp-content/uploads/2020/04/malas-ngoding-tutorial-pemrograman-terlengkap-bahasa-indonesia-untuk-pemula-sampai-mahir.gif"
              alt="heart gif"
            />{' '}
            copyright © lela cookies {componentDidMount()}{' '}
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
