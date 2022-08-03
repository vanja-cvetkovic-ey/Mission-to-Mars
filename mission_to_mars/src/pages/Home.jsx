import { Link } from 'react-router-dom';

import Carousel from '../components/carousel/Carousel';

import './Home.scss';
const Home = () => {
  return (
    <div className="home">
      <Carousel />
      <div className="callToAction">
        <div className="p-text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
          nostrum praesentium recusandae quidem quasi eaque, expedita tenetur
          exercitationem quam sed doloribus porro asperiores corporis laudantium
          aliquid aperiam id quisquam aut.
        </div>
        <Link to="/applicationprocess" className="btn btn-cta">
          Start Application Process
        </Link>
      </div>
    </div>
  );
};

export default Home;
