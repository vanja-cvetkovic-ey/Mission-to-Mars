import React from 'react';
import PropTypes from 'prop-types';

import './Carousel.scss';

/**
 * single item card in carousel
 * @param {string} url - source url for card image
 * @param {string} name - image title
 * @param {string} explanation - image explanation
 * @returns {JSX} single card with image and text content
 */

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

CardCarousel.propTypes = {
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  explanation: PropTypes.string.isRequired,
};

export default CardCarousel;
