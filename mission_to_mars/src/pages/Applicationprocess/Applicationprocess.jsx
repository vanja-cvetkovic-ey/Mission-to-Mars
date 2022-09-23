import { Container, Row, Col } from 'react-bootstrap';

import { APPLICATIONPROCESS } from '../../shared/constants';
import './Applicationprocess.scss';
import { WizardProvider } from '../../context/WizardContext';
import ProgressBar from '../../components/wizard/progressBar/ProgressBar';
import Wizard from '../../components/wizard/Wizard';

const Applicationprocess = () => {
  return (
    <div className="">
      <h2 className="text-start">{APPLICATIONPROCESS.heading}</h2>

      <Row>
        <WizardProvider>
          <Col
            className="my-5"
            md={{ span: 12, offset: 0 }}
            lg={{ span: 10, offset: 1 }}
            xl={{ span: 8, offset: 2 }}
          >
            <ProgressBar />
            <Wizard />
          </Col>
        </WizardProvider>
      </Row>
    </div>
  );
};

export default Applicationprocess;
