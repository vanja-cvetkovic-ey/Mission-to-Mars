import { Link } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';

const Applicationprocess = () => {
  return (
    <div className="display-center">
      <h2>Application will be opening soon</h2>
      <Link to="/" className="link_icon">
        {<AiOutlineHome />} back to Home page
      </Link>
    </div>
  );
};

export default Applicationprocess;
