import React from 'react';

import './Carousel.scss';

const CardCarousel = ({ url, name, explanation }) => {
  return (
    <div className="CardCarousel">
      <div className="card-img">
        <img src={url} alt="" />
      </div>
      <div className="cart-text">
        <p className="title">{name}</p>
        <div className="description">{explanation}</div>
      </div>
    </div>
  );
};

export default CardCarousel;
