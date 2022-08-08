import { Link } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';

import { BACKTOHOME } from '../../shared/constants';

const BackToHomeBtn = () => {
  return (
    <Link to="/" className="link_icon">
      {<AiOutlineHome />} {BACKTOHOME}
    </Link>
  );
};

export default BackToHomeBtn;
