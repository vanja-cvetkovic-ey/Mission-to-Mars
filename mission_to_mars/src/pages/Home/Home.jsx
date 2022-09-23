import { Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Carousel from '../../components/carousel/Carousel';
import { HOME } from '../../shared/constants';

import './Home.scss';
const Home = () => {
  return (
    <>
      <Row style={{ height: '42vh' }}>
        <Carousel className="mb-5" />
      </Row>

      <div className="p-text">{HOME.cta_text}</div>
      <Link to="/applicationprocess" className="btn btn-dark ">
        {HOME.cta_btn_text}
      </Link>
    </>
  );
};

export default Home;
