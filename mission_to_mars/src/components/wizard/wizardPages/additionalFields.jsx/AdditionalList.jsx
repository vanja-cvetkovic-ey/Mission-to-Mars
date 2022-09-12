import { useContext, useState, useEffect } from 'react';

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
    <>
      {listOfOffenses.map((row, index) => (
        <div className="row flex-row additional" key={index}>
          {/* adress line 1 */}
          <div className="row-item row-item-3">
            <div className="info additional_info">
              <span>*</span> {WIZARD_PAGE_3.convicted_reason}
            </div>
            <input
              className={
                'error-' + !!formState.errors_page3[`convicted_reason-${index}`]
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
            <span className="error-text">
              {formState.errors_page3[`convicted_reason-${index}`]}
            </span>
          </div>

          {/* adress line 2 */}
          <div className="row-item row-item-3">
            <div className="info additional_info">
              <span>*</span> {WIZARD_PAGE_3.convicted_date}
            </div>
            <input
              className={
                'error-' + !!formState.errors_page3[`convicted_date-${index}`]
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
            <span className="error-text">
              {formState.errors_page3[`convicted_date-${index}`]}
            </span>
          </div>
          <div className="row-item row-item-3 btns-group flex-row">
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
          </div>
        </div>
      ))}
    </>
  );
};

export default AdditionalList;
