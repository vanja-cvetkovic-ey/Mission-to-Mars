import { Link } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';

import BackToHomeBtn from '../components/shared/BackToHomeBtn';

const Applicationprocess = () => {
  const HEADING = 'Application will be opening soon';

  return (
    <div className="display-center">
      <h2>{HEADING}</h2>
      <BackToHomeBtn />
    </div>
  );
};

export default Applicationprocess;
