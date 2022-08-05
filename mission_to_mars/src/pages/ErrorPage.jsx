import { Link } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';

const Error = () => {
  return (
    <div className="display-center">
      <h2>The page you are look for does not exist</h2>
      <p style={{ margin: '10px 0' }}>
        But you can click the button bellow to go back to the homepage
      </p>
      <Link to="/" className="link_icon">
        {<AiOutlineHome />} back to Home page
      </Link>
    </div>
  );
};

export default Error;
