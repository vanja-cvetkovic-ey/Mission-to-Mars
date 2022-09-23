import { Link } from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';

import Logo from '../../assets/Logo';
import './Header.scss';

const Header = () => {
  return (
    <Navbar className="py-3" bg="dark">
      <Container>
        <Link to="/">
          <Logo />
        </Link>
      </Container>
    </Navbar>
  );
};

export default Header;
