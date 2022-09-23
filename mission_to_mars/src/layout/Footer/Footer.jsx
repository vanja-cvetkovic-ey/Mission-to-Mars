import { Container, Nav, Navbar, Stack } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

// import './Footer.scss';

const Footer = () => {
  let { pathname } = useLocation();

  const PRIVACY_NOTICE = 'Privacy Notice';
  const TERMS_CONDITIONS = 'Terms and Conditions';

  return (
    <Navbar bg="dark" variant="dark" className="pt-3">
      <Container>
        <Stack direction="horizontal" gap={2}>
          {pathname !== '/applicationprocess' ? (
            <>
              <Link className="text-light" to="/privacynotices">
                {PRIVACY_NOTICE}
              </Link>
              <Link className="text-light" to="/termaandconditions">
                {TERMS_CONDITIONS}
              </Link>
            </>
          ) : (
            <>
              <p className="text-light">{PRIVACY_NOTICE}</p>
              <p className="text-light">{TERMS_CONDITIONS}</p>
            </>
          )}
        </Stack>
      </Container>
    </Navbar>
  );
};

export default Footer;
