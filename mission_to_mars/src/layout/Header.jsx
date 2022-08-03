import { Link } from 'react-router-dom';
import Logo from '../assets/Logo';

import './Header.scss';

const Header = () => {
  return (
    <div className="Header">
      <div className="navbar flex-row">
        <Link to="/">
          <Logo />
        </Link>
      </div>
    </div>
  );
};

export default Header;
