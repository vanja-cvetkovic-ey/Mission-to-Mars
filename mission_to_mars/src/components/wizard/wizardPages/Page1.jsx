import { useContext, useEffect } from 'react';
import { Card, Stack, Row, Form, Col, Button } from 'react-bootstrap';

import { INFO, WIZARD_PAGE_1, CONTINUE } from '../../../shared/constants';
import WizardContext from '../../../context/WizardContext';

const Page1 = () => {
  const {
    handleInput,
    handleValueValidation,
    formState,
    disabledBtn,
    handleContinueBtn,
    handleNextPage,
  } = useContext(WizardContext);

  const { page1, errors_page1 } = formState;

  const PAGE = 'page1';
  const ERRORS_PAGE = 'errors_page1';

  const year = new Date().getFullYear() - 18;
  const month =
    new Date().getMonth() < 10
      ? `0${new Date().getMonth()}`
      : new Date().getMonth();
  const day =
    new Date().getDay() < 10 ? `0${new Date().getDay()}` : new Date().getDay();
  const MAX_DATE = `${year}-${month}-${day}`;

  useEffect(() => {
    handleContinueBtn(errors_page1, page1);
  }, [handleContinueBtn, errors_page1, page1]);

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
          <h3>{WIZARD_PAGE_1.heading}</h3>

          <div className="info ms-auto">
            {INFO.form} <span>*</span>
          </div>
        </Stack>
      </Card.Header>
      <Card.Body className="p-5">
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
              <Form.Label className="text-start">
                <span>*</span> {WIZARD_PAGE_1.title_label}
              </Form.Label>
              <Form.Select
                name="title"
                value={page1.title}
                onChange={(e) =>
                  handleInput(e.target.name, e.target.value, PAGE)
                }
              >
                {WIZARD_PAGE_1.optionsTitle.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                  >
                    {option.label}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6} className="mb-3">
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                type="text"
                name="firstName"
                className={!!errors_page1.firstName && 'border-danger'}
                placeholder={WIZARD_PAGE_1.firstName_placeholder}
                value={page1.firstName}
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
                {errors_page1.firstName}
              </Form.Text>
            </Form.Group>
          </Col>
          <Col md={6} className="mb-3">
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                className={!!errors_page1.lastName && 'border-danger'}
                type="text"
                name="lastName"
                placeholder={WIZARD_PAGE_1.lastName_placeholder}
                value={page1.lastName}
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
                {errors_page1.lastName}
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="text-start mb-3" controlId="formBasicEmail">
              <Form.Label className="text-start">
                <span>*</span> {WIZARD_PAGE_1.birthdate_label}
              </Form.Label>
              <Form.Control
                className={!!errors_page1.birthDate && 'border-danger'}
                type="date"
                name="birthDate"
                max={MAX_DATE}
                value={page1.birthDate}
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
                {errors_page1.birthDate}
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>
      </Card.Body>

      <Card.Footer className="px-5 py-3">
        <Stack direction="horizontal" gap={2}>
          <Button variant="outline-secondary">Back</Button>
          {continueBtn}
        </Stack>
      </Card.Footer>
    </>
  );
};

export default Page1;
