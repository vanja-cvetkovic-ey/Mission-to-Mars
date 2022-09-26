import React, { useContext } from 'react';
import { Card } from 'react-bootstrap';

// import './Wizard.scss';
import WizardContext from '../../context/WizardContext';
import Welcome from './wizardPages/Welcome';

const Wizard = () => {
  const { startWizard, currentPage, displayStep } = useContext(WizardContext);

  return (
    <Card className=" border mt-3 shadow-sm">
      {startWizard ? displayStep(currentPage) : <Welcome />}
    </Card>
  );
};

export default Wizard;
