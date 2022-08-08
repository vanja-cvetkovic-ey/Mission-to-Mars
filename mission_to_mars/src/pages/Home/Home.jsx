import { Link } from 'react-router-dom';

import Carousel from '../../components/carousel/Carousel';

import './Home.scss';
const Home = () => {
  const CTA_TEXT =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi nostrum praesentium recusandae quidem quasi eaque, expedita tenetur exercitationem quam sed doloribus porro asperiores corporis laudantium aliquid aperiam id quisquam aut.';
  const CTA_BTN_TEXT = 'Start Application Process';
  return (
    <div className="home">
      <Carousel />
      <div className="callToAction">
        <div className="p-text">{CTA_TEXT}</div>
        <Link to="/applicationprocess" className="btn btn-cta">
          {CTA_BTN_TEXT}
        </Link>
      </div>
    </div>
  );
};

export default Home;
