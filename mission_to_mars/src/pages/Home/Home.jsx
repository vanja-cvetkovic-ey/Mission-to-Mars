import { Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Carousel from '../../components/carousel/Carousel';
import { HOME } from '../../shared/constants';

import './Home.scss';
const Home = () => {
  return (
    <div className="home">
      <Container>
        <Row>
          <Carousel />
        </Row>
        <Row>
          <div className="p-text">{HOME.cta_text}</div>
          <Link to="/applicationprocess" className="btn-cta">
            {HOME.cta_btn_text}
          </Link>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
