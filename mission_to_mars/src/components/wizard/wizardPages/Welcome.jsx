import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  PRIVACY_NOTICE,
  TERMS_AND_CONDITIONS,
  WIZARD_WELCOME,
} from '../../../shared/constants';
import WizardContext from '../../../context/WizardContext';

const Welcome = () => {
  const { setStartWizard } = useContext(WizardContext);

  const [checkRead, setCheckRead] = useState(false);
  const [checkAgree, setCheckAgree] = useState(false);

  const handleChangeRead = () => {
    setCheckRead((prev) => !prev);
  };

  const handleChangeAgree = () => {
    setCheckAgree((prev) => !prev);
  };

  const handleStartWizard = () => {
    setStartWizard(true);
  };

  const proceedBtn =
    checkRead && checkAgree ? (
      <button className="btn-cta" onClick={handleStartWizard}>
        {[WIZARD_WELCOME.button]}
      </button>
    ) : (
      <button className="btn-cta" disabled>
        {[WIZARD_WELCOME.button]}
      </button>
    );

  return (
    <>
      <div className="container">
        <h3>{WIZARD_WELCOME.headign}</h3>
        <p className="p-text">
          {WIZARD_WELCOME.text[0]}
          <Link to="/privacynotices">{PRIVACY_NOTICE.header}</Link> and{' '}
          <Link to="/termaandconditions">{TERMS_AND_CONDITIONS.header}</Link>{' '}
          {[WIZARD_WELCOME.text[1]]}
        </p>
      </div>
      <div className="footer">
        <div className="flex-row">
          <div className="col flex-column">
            <label className="checkbox">
              <input
                type="checkbox"
                checked={checkRead}
                onChange={handleChangeRead}
              />
              {[WIZARD_WELCOME.checkbox[0]]}
            </label>
            <label className="checkbox">
              <input
                type="checkbox"
                checked={checkAgree}
                onChange={handleChangeAgree}
              />
              {[WIZARD_WELCOME.checkbox[1]]}
            </label>
          </div>
          <div className="col flex-center">{proceedBtn}</div>
        </div>
      </div>
    </>
  );
};

export default Welcome;
