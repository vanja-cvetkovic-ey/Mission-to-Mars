import { Container } from 'react-bootstrap';

import { ERROR } from '../shared/constants';
import BackToHomeBtn from '../components/shared/BackToHomeBtn';

const Error = () => {
  return (
    <Container>
      <div className="display-center">
        <h2>{ERROR.heading}</h2>
        <p style={{ margin: '10px 0' }}>{ERROR.text}</p>
        <BackToHomeBtn />
      </div>
    </Container>
  );
};

export default Error;
