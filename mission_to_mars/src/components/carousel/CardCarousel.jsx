import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

import './Carousel.scss';

/**
 * single item card in carousel
 * @param {string} url - source url for card image
 * @param {string} name - image title
 * @param {string} explanation - image explanation
 * @returns {JSX} single card with image and text content
 */

const CardCarousel = ({ url, name, explanation, id }) => {
  return (
    // xxs={12} xs={6} sm={4} md={3}>
    <Card style={{ height: '42vh' }} className="">
      <Card.Img
        className="card-img-top "
        style={{ height: '220px', objectFit: 'cover' }}
        src={url}
        alt={name}
      />

      <Card.Body className="overflow-hidden">
        <Card.Title className="mt-1">{name}</Card.Title>
        <Card.Text className="card-p">{explanation}</Card.Text>
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
