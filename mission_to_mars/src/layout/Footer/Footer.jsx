import { Link } from 'react-router-dom';

import './Footer.scss';

const Footer = () => {
  const PRIVACY_NOTICE = 'Privacy Notice';
  const TERMS_CONDITIONS = 'Terms and Conditions';

  return (
    <div className="Footer">
      <Link to="/privacynotices">{PRIVACY_NOTICE}</Link>
      <Link to="/termaandconditions">{TERMS_CONDITIONS}</Link>
    </div>
  );
};

export default Footer;
