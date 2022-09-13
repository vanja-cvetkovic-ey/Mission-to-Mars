import React from 'react';

import { TERMS_AND_CONDITIONS } from '../shared/constants';

const TermsAndConditions = () => {
  return (
    <div className="content">
      <h1>{TERMS_AND_CONDITIONS.header}</h1>
      <p className="p-text"> {TERMS_AND_CONDITIONS.content[0]}</p>
      <p className="p-text">{TERMS_AND_CONDITIONS.content[1]}</p>
    </div>
  );
};

export default TermsAndConditions;
