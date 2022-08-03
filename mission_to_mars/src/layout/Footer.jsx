import { Link } from 'react-router-dom';

import './Footer.scss';

const Footer = () => {
  return (
    <div className="Footer">
      <Link to="/privacynotices">Privacy Notice</Link>
      <Link to="/termaandconditions">Terms and Conditions</Link>
    </div>
  );
};

export default Footer;
