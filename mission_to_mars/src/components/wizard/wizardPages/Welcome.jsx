import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  PRIVACY_NOTICE,
  TERMS_AND_CONDITIONS,
  WIZARD_WELCOME,
} from '../../../shared/constants';
import WizardContext from '../../../context/WizardContext';
import { Col, Container, Row, Card, Button, Form } from 'react-bootstrap';

const Welcome = () => {
  const { setStartWizard } = useContext(WizardContext);

  const [checkRead, setCheckRead] = useState(false);
  const [checkAgree, setCheckAgree] = useState(false);

  const handleChangeRead = () => {
    setCheckRead((prev) => !prev);
  };

  const handleChangeAgree = () => {
    setCheckAgree((prev) => !prev);
  };

  const handleStartWizard = () => {
    setStartWizard(true);
  };

  const proceedBtn =
    checkRead && checkAgree ? (
      <Button variant="dark" onClick={handleStartWizard}>
        {[WIZARD_WELCOME.button]}
      </Button>
    ) : (
      <Button variant="dark" disabled>
        {[WIZARD_WELCOME.button]}
      </Button>
    );

  return (
    <>
      <Card.Header className="px-5 py-4" as="h3">
        {WIZARD_WELCOME.headign}
      </Card.Header>
      <Card.Body className="px-5 py-2">
        <p className="p-text">
          {WIZARD_WELCOME.text[0]}
          <Link to="/privacynotices">{PRIVACY_NOTICE.header}</Link> and{' '}
          <Link to="/termaandconditions">{TERMS_AND_CONDITIONS.header}</Link>{' '}
          {[WIZARD_WELCOME.text[1]]}
        </p>
      </Card.Body>
      <Card.Footer className="px-5 py-3">
        <Row>
          <Col xs={12} lg={9} className="py-1">
            <Form.Group className="mb-1">
              <Form.Check
                type="checkbox"
                label={[WIZARD_WELCOME.checkbox[0]]}
                checked={checkRead}
                onChange={handleChangeRead}
              />
            </Form.Group>

            <Form.Group className="mb-1">
              <Form.Check
                type="checkbox"
                label={[WIZARD_WELCOME.checkbox[1]]}
                checked={checkAgree}
                onChange={handleChangeAgree}
              />
            </Form.Group>
          </Col>
          <Col xs={12} lg={3} className="py-2 my-auto">
            <div className="d-grid">{proceedBtn}</div>
          </Col>
        </Row>
      </Card.Footer>
    </>
  );
};

export default Welcome;
