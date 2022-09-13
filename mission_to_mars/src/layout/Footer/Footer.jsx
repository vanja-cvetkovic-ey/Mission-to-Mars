import { Link, useLocation } from 'react-router-dom';

import './Footer.scss';

const Footer = () => {
  let { pathname } = useLocation();

  const PRIVACY_NOTICE = 'Privacy Notice';
  const TERMS_CONDITIONS = 'Terms and Conditions';

  return (
    <div className="Footer">
      {pathname !== '/applicationprocess' ? (
        <>
          <Link to="/privacynotices">{PRIVACY_NOTICE}</Link>
          <Link to="/termaandconditions">{TERMS_CONDITIONS}</Link>
        </>
      ) : (
        <>
          <p>{PRIVACY_NOTICE}</p>
          <p>{TERMS_CONDITIONS}</p>
        </>
      )}
    </div>
  );
};

export default Footer;
