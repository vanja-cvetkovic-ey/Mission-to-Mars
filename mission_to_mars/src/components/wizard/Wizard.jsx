import React, { useContext } from 'react';
import { Card } from 'react-bootstrap';

// import './Wizard.scss';
import WizardContext from '../../context/WizardContext';
import Welcome from './wizardPages/Welcome';

const Wizard = () => {
  const { startWizard, currentPage, displayStep } = useContext(WizardContext);

  return (
    <Card className=" border">
      {/* {startWizard ? displayStep(currentPage) : <Welcome />} */}
      {displayStep(3)}
    </Card>
  );
};

export default Wizard;
