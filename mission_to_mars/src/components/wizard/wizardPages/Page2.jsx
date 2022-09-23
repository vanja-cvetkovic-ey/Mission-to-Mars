import { useContext, useEffect, useCallback } from 'react';
import { Card, Stack, Row, Form, Col, Button } from 'react-bootstrap';

import { CONTINUE, INFO, WIZARD_PAGE_2 } from '../../../shared/constants';
import WizardContext from '../../../context/WizardContext';
import SelectField from './selectFields/SelectField';
import States from './customDropdown/States';
import Zip from './customDropdown/Zip';

const Page2 = () => {
  const {
    formState,
    handleInput,
    disabledBtn,
    setOpenPages,
    handleValueValidation,
    handleContinueBtn,
    handlePrevPage,
    handleNextPage,
  } = useContext(WizardContext);

  const { page2, errors_page2 } = formState;
  const PAGE = 'page2';
  const ERRORS_PAGE = 'errors_page2';

  const pageOpened = useCallback(() => {
    setOpenPages((prev) => [...prev, PAGE]);
  }, [setOpenPages]);

  useEffect(() => {
    pageOpened();
  }, [pageOpened]);

  const handleDisabledOnChange = (e) => {
    const { disabled, name, value } = e.target;
    if (!disabled) {
      handleInput(name, value, PAGE);
    }
  };

  useEffect(() => {
    handleContinueBtn(errors_page2, page2);
  }, [handleContinueBtn, errors_page2, page2]);

  const continueBtn = disabledBtn ? (
    <Button variant="dark" className="ms-auto" disabled>
      {CONTINUE}
    </Button>
  ) : (
    <Button variant="dark" className=" ms-auto" onClick={handleNextPage}>
      {CONTINUE}
    </Button>
  );

  return (
    <>
      <Card.Header className="px-5 py-4 bg-transparent">
        <Stack direction="horizontal" gap={2}>
          <h3>{WIZARD_PAGE_2.heading}</h3>

          <div className="info ms-auto">
            {INFO.form} <span>*</span>
          </div>
        </Stack>
      </Card.Header>
      <Card.Body className="p-5">
        <Row className="mb-3">
          <Col md={12} lg={6}>
            <Form.Group className="text-start">
              <Form.Label>
                <span>*</span> {WIZARD_PAGE_2.email_label}
              </Form.Label>
              <Form.Control
                className={!!errors_page2.email && 'border-danger'}
                type="email"
                placeholder={WIZARD_PAGE_2.email_placeholder}
                name="email"
                value={page2.email}
                onChange={(e) =>
                  handleInput(e.target.name, e.target.value, PAGE)
                }
                onBlur={(e) =>
                  handleValueValidation(
                    e.target.name,
                    e.target.value,
                    ERRORS_PAGE
                  )
                }
              />
              <Form.Text className="text-danger">
                {errors_page2.email}
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>

        {/* adress */}
        <Row className="mb-3">
          <Col md={12} lg={6}>
            <Form.Group className="text-start">
              <Form.Label>
                <span>*</span> {WIZARD_PAGE_2.adress1_label}
              </Form.Label>
              <Form.Control
                className={!!errors_page2.adressLine1 && 'border-danger'}
                type="text"
                placeholder={WIZARD_PAGE_2.adress1_label}
                name="adressLine1"
                value={page2.adressLine1}
                onChange={(e) =>
                  handleInput(e.target.name, e.target.value, PAGE)
                }
                onBlur={(e) =>
                  handleValueValidation(
                    e.target.name,
                    e.target.value,
                    ERRORS_PAGE
                  )
                }
              />
              <Form.Text className="text-danger">
                {errors_page2.adressLine1}
              </Form.Text>
            </Form.Group>
          </Col>
          <Col md={12} lg={6}>
            <Form.Group className="text-start">
              <Form.Label>{WIZARD_PAGE_2.adress2_label}</Form.Label>
              <Form.Control
                className={!!errors_page2.adressLine2 && 'border-danger'}
                type="text"
                placeholder={WIZARD_PAGE_2.adress2_label}
                name="adressLine1"
                value={page2.adressLine2}
                onChange={(e) =>
                  handleInput(e.target.name, e.target.value, PAGE)
                }
                onBlur={(e) =>
                  handleValueValidation(
                    e.target.name,
                    e.target.value,
                    ERRORS_PAGE
                  )
                }
              />
              <Form.Text className="text-danger">
                {errors_page2.adressLine2}
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col md={12} lg={4} className="text-start">
            <States page2={page2} errors_page2={errors_page2} />
          </Col>
          <Col md={12} lg={4} className="text-start">
            <SelectField
              prevInfo={page2.state}
              fieldName="city"
              handleDisabledOnChange={handleDisabledOnChange}
              page2={page2}
              errors_page2={errors_page2}
            />
          </Col>
          <Col md={12} lg={4} className="text-start">
            <Zip page2={page2} errors_page2={errors_page2} />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={12} lg={6}>
            <Form.Group className="text-start">
              <Form.Label>
                <span>*</span> {WIZARD_PAGE_2.years_label}
              </Form.Label>
              <Form.Control
                className={!!errors_page2.years && 'border-danger'}
                style={{ width: '200px' }}
                type="text"
                placeholder={WIZARD_PAGE_2.years_label}
                name="years"
                value={page2.years}
                onChange={(e) =>
                  handleInput(e.target.name, e.target.value, PAGE)
                }
                onBlur={(e) =>
                  handleValueValidation(
                    e.target.name,
                    e.target.value,
                    ERRORS_PAGE
                  )
                }
              />
              <Form.Text className="text-danger">
                {errors_page2.years}
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>
      </Card.Body>

      <Card.Footer className="px-5 py-3">
        <Stack direction="horizontal">
          <Button variant="outline-secondary">Back</Button>
          {continueBtn}
        </Stack>
      </Card.Footer>
    </>
  );
};

export default Page2;
