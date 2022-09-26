import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Carousel from '../../components/carousel/Carousel';
import { HOME } from '../../shared/constants';

import './Home.scss';
const Home = () => {
  return (
    <Container className="g-0  flex-grow-1">
      <Carousel className="mt-5" />

      <Row>
        <Col className="col-8 offset-2 col-sm-10 offset-sm-1 mt-1 text-center">
          <div>{HOME.cta_text}</div>
          <Link to="/applicationprocess" className="btn btn-dark mt-4">
            {HOME.cta_btn_text}
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
