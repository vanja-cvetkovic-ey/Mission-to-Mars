import { useContext, useState, useEffect } from 'react';

import './AdditionalList.scss';
import WizardContext from '../../../../context/WizardContext';
import { WIZARD_PAGE_3 } from '../../../../shared/constants';

const AdditionalList = ({ disabled }) => {
  const { handleInput } = useContext(WizardContext);
  const [listOfOffenses, setListOfOffenses] = useState([
    { reason: '', date: '' },
  ]);
  const [disabledBtn, setDisabledBtn] = useState(false);

  const handleOffenseChange = (e, index) => {
    if (!disabled) {
      const { name, value } = e.target;
      const list = [...listOfOffenses];
      list[index][name] = value;
      setListOfOffenses(list);
      handleInput('convicted_reason_date', list, 'page3');
    }
  };

  useEffect(() => {
    if (listOfOffenses.at(-1).reason && listOfOffenses.at(-1).date)
      setDisabledBtn(true);
    else setDisabledBtn(false);
  }, [listOfOffenses]);

  const handleOffenseAdd = () => {
    if (listOfOffenses.at(-1).reason && listOfOffenses.at(-1).date) {
      setListOfOffenses([...listOfOffenses, { reason: '', date: '' }]);
    }
  };
  const handleOffenseRemove = (index) => {
    const list = [...listOfOffenses];
    list.splice(index, 1);
    setListOfOffenses(list);
    handleInput('convicted_reason_date', list, 'page3');
  };

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
              name="reason"
              value={row.reason}
              disabled={disabled}
              onChange={(e) => handleOffenseChange(e, index)}
            />
          </div>

          {/* adress line 2 */}
          <div className="row-item row-item-3">
            <div className="info additional_info">
              <span>*</span> {WIZARD_PAGE_3.convicted_date}
            </div>
            <input
              type="date"
              name="date"
              disabled={disabled}
              value={row.date}
              onChange={(e) => handleOffenseChange(e, index)}
            />
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
