import { Link } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';

const BackToHomeBtn = () => {
  const BTN_TEXT = 'back to Home page';
  return (
    <Link to="/" className="link_icon">
      {<AiOutlineHome />} {BTN_TEXT}
    </Link>
  );
};

export default BackToHomeBtn;
