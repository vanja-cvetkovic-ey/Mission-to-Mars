import React from 'react';
import { Container } from 'react-bootstrap';

import { PRIVACY_NOTICE } from '../shared/constants';

const PrivacyNotice = () => {
  return (
    <Container className="pt-5 flex-grow-1">
      <h1 className="text-start">{PRIVACY_NOTICE.header}</h1>
      <p className="text-start p-text">{PRIVACY_NOTICE.content[0]}</p>
      <p className="text-start p-text">{PRIVACY_NOTICE.content[1]}</p>
    </Container>
  );
};

export default PrivacyNotice;
