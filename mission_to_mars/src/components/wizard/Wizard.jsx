import React, { useContext, useState } from 'react';

import './Wizard.scss';
import WizardContext from '../../context/WizardContext';
import Welcome from './wizardPages/Welcome';

const Wizard = () => {
  const { startWizard, currentPage, displayStep } = useContext(WizardContext);

  return (
    <div className="Wizard">
      {startWizard ? displayStep(currentPage) : <Welcome />}
    </div>
  );
};

export default Wizard;
