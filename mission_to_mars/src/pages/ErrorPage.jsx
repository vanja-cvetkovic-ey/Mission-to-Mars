import { Link } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';

import BackToHomeBtn from '../components/shared/BackToHomeBtn';

const Error = () => {
  const HEADING = 'The page you are look for does not exist';
  const TEXT = 'But you can click the button bellow to go back to the homepage';
  return (
    <div className="display-center">
      <h2>{HEADING}</h2>
      <p style={{ margin: '10px 0' }}>{TEXT}</p>
      <BackToHomeBtn />
    </div>
  );
};

export default Error;
