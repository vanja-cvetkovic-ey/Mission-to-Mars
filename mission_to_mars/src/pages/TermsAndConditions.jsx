import { Container } from 'react-bootstrap';

import { TERMS_AND_CONDITIONS } from '../shared/constants';

const TermsAndConditions = () => {
  return (
    <Container className="pt-5 flex-grow-1">
      <h1 className="text-start">{TERMS_AND_CONDITIONS.header}</h1>
      <p className="text-start p-text"> {TERMS_AND_CONDITIONS.content[0]}</p>
      <p className="text-start p-text">{TERMS_AND_CONDITIONS.content[1]}</p>
    </Container>
  );
};

export default TermsAndConditions;
