import { Link } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';

import BackToHomeBtn from '../components/shared/BackToHomeBtn';
import { ERROR } from '../shared/constants';

const Error = () => {
  return (
    <div className="display-center">
      <h2>{ERROR.heading}</h2>
      <p style={{ margin: '10px 0' }}>{ERROR.text}</p>
      <BackToHomeBtn />
    </div>
  );
};

export default Error;
