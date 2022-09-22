import React from 'react';
import SpanYellow from '../Components/spanYellow';

const MapsScreen = () => {
  return (
    <>
      <h2 className="sub-title text-center">
        <SpanYellow>Temukan</SpanYellow> kami di
      </h2>
      <p className="text-lead text-center">
        Kunjungi toko kami untuk menghemat ongkir
      </p>
      {/* <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7963.496861430996!2d98.73499012215501!3d3.644752947506973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30313360e3321925%3A0x44e821ce8af90978!2sGrosir%20pakaian!5e0!3m2!1sid!2sid!4v1663861855243!5m2!1sid!2sid"
        width="600"
        height="450"
        style="border:0;"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe> */}
    </>
  );
};

export default MapsScreen;
