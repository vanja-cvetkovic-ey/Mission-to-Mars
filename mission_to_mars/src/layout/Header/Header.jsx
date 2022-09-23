import { Link } from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';

import Logo from '../../assets/Logo';
import './Header.scss';

const Header = () => {
  return (
    <Navbar bg="dark">
      <Container>
        <Link to="/">
          <Logo />
        </Link>
      </Container>
    </Navbar>
    // <div className="Header">
    //   <div className="navbar flex-row">
    //     <Link to="/">
    //       <Logo />
    //     </Link>
    //   </div>
    // </div>
  );
};

export default Header;
