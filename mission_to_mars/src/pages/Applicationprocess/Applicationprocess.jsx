import { APPLICATIONPROCESS } from '../../shared/constants';

import './Applicationprocess.scss';
import { WizardProvider } from '../../context/WizardContext';
import ProgressBar from '../../components/wizard/progressBar/ProgressBar';
import Wizard from '../../components/wizard/Wizard';

const Applicationprocess = () => {
  return (
    <div className="Application-page content">
      <h2>{APPLICATIONPROCESS.heading}</h2>
      <div className="display-center">
        <WizardProvider>
          <ProgressBar />
          <Wizard />
        </WizardProvider>
      </div>
    </div>
  );
};

export default Applicationprocess;
