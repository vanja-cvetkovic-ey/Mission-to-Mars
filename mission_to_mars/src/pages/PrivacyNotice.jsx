import React from 'react';

import { PRIVACY_NOTICE } from '../shared/constants';

const PrivacyNotice = () => {
  return (
    <div className="content">
      <h1>{PRIVACY_NOTICE.header}</h1>
      <p className="p-text">{PRIVACY_NOTICE.content[0]}</p>
      <p className="p-text">{PRIVACY_NOTICE.content[1]}</p>
    </div>
  );
};

export default PrivacyNotice;
