import { useContext, useState, useEffect } from 'react';
import { Row, Col, Form, Stack, Button } from 'react-bootstrap';

import './AdditionalList.scss';
import WizardContext from '../../../../context/WizardContext';
import { WIZARD_PAGE_3 } from '../../../../shared/constants';

const AdditionalList = ({ disabled, setDisableSubmitBtn }) => {
  const { handleInput, handleValueValidation, formState } =
    useContext(WizardContext);
  const [listOfOffenses, setListOfOffenses] = useState([
    { forWhat: '', convictionDate: '' },
  ]);
  const [disabledBtn, setDisabledBtn] = useState(false);

  const handleOffenseChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...listOfOffenses];
    list[index][name] = value;
    setListOfOffenses(list);
    handleInput('convicted_reason_date', list, 'page3');
  };

  const year = new Date().getFullYear();
  const month =
    new Date().getMonth() < 10
      ? `0${new Date().getMonth()}`
      : new Date().getMonth();
  const day =
    new Date().getDay() < 10 ? `0${new Date().getDay()}` : new Date().getDay();
  const MAX_DATE = `${year}-${month}-${day}`;

  const handleOffenseAdd = () => {
    if (listOfOffenses.at(-1).forWhat && listOfOffenses.at(-1).convictionDate) {
      setListOfOffenses([
        ...listOfOffenses,
        { forWhat: '', convictionDate: '' },
      ]);
    }
  };
  const handleOffenseRemove = (index) => {
    const list = [...listOfOffenses];
    list.splice(index, 1);
    setListOfOffenses(list);
    handleInput('convicted_reason_date', list, 'page3');
  };

  useEffect(() => {
    if (listOfOffenses.at(-1).forWhat && listOfOffenses.at(-1).convictionDate) {
      setDisabledBtn(true);
      setDisableSubmitBtn(true);
    } else {
      setDisabledBtn(false);
      setDisableSubmitBtn(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled, listOfOffenses, formState.errors_page3]);

  return (
    <Row>
      {listOfOffenses.map((row, index) => (
        <Row key={index} className="my-1">
          {/* adress line 1 */}
          <Col xs={12} lg={5}>
            <Form.Group className="text-start">
              <Form.Label>
                <span className="text-danger">*</span>{' '}
                {WIZARD_PAGE_3.convicted_reason}
              </Form.Label>
              <Form.Control
                className={
                  !!formState.errors_page3[`convicted_reason-${index}`] &&
                  'border-danger'
                }
                name="forWhat"
                value={row.forWhat}
                onChange={(e) => handleOffenseChange(e, index)}
                onBlur={(e) =>
                  handleValueValidation(
                    `convicted_reason-${index}`,
                    e.target.value,
                    'errors_page3'
                  )
                }
              />
              <Form.Text className="text-danger">
                {formState.errors_page3[`convicted_reason-${index}`]}
              </Form.Text>
            </Form.Group>
          </Col>
          {/*  */}
          <Col xs={12} lg={5}>
            <Form.Group className="text-start">
              <Form.Label>
                <span className="text-danger">*</span>
                {WIZARD_PAGE_3.convicted_date}
              </Form.Label>
              <Form.Control
                className={
                  !!formState.errors_page3[`convicted_date-${index}`] &&
                  'border-danger'
                }
                type="date"
                name="convictionDate"
                max={MAX_DATE}
                value={row.convictionDate}
                onChange={(e) => handleOffenseChange(e, index)}
                onBlur={(e) =>
                  handleValueValidation(
                    `convicted_date-${index}`,
                    e.target.value,
                    'errors_page3'
                  )
                }
              />
              <Form.Text className="text-danger">
                {formState.errors_page3[`convicted_date-${index}`]}
              </Form.Text>
            </Form.Group>
          </Col>
          <Col sm={12} md={2} className="my-auto">
            <Form.Label></Form.Label>
            <Row>
              <Stack
                direction="horizontal"
                className="align-items-start"
                gap={3}
              >
                {listOfOffenses.length !== 1 ? (
                  <Button
                    className="border"
                    variant="light"
                    onClick={() => handleOffenseRemove(index)}
                    disabled={!listOfOffenses.length}
                  >
                    -
                  </Button>
                ) : (
                  <Button variant="light" disabled>
                    -
                  </Button>
                )}
                {listOfOffenses.length - 1 === index ? (
                  <Button
                    className="border"
                    variant="light"
                    onClick={handleOffenseAdd}
                  >
                    +
                  </Button>
                ) : (
                  <Button className="mx-auto " variant="light" disabled>
                    +
                  </Button>
                )}
              </Stack>
            </Row>
          </Col>

          {/* adress line 2 */}

          {/* <div className="row-item row-item-3 btns-group flex-row">
            {listOfOffenses.length !== 1 ? (
              <div
                className="btn-form display-center"
                onClick={() => handleOffenseRemove(index)}
              >
                -
              </div>
            ) : (
              <div className="btn-form false"></div>
            )}
            {listOfOffenses.length - 1 === index ? (
              <div
                className={`btn-form display-center btn-${disabledBtn}`}
                onClick={handleOffenseAdd}
              >
                +
              </div>
            ) : (
              <div className="btn-form false"></div>
            )}
          </div> */}
        </Row>
      ))}
    </Row>
  );
};

export default AdditionalList;
