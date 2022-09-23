import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

// import './Carousel.scss';

/**
 * single item card in carousel
 * @param {string} url - source url for card image
 * @param {string} name - image title
 * @param {string} explanation - image explanation
 * @returns {JSX} single card with image and text content
 */

const CardCarousel = ({ url, name, explanation, id }) => {
  return (
    <Card style={{ flex: 1, height: '37vh' }} className="mx-sm-5 mx-md-1">
      <Card.Img
        className="card-img-top "
        style={{ minHeight: '180px', objectFit: 'cover' }}
        src={url}
        alt={name}
      />

      <Card.Body className="overflow-hidden">
        <Card.Title>{name}</Card.Title>
        <Card.Text className="overflow-hidden" style={{ height: '70%' }}>
          {explanation}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

CardCarousel.propTypes = {
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  explanation: PropTypes.string.isRequired,
};

export default CardCarousel;
