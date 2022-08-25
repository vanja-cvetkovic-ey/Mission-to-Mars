import { useContext, useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { INFO, WIZARD_PAGE_3 } from '../../../shared/constants';
import WizardContext from '../../../context/WizardContext';
import AdditionalList from './additionalFields.jsx/AdditionalList';
import axios from 'axios';

const Page3 = () => {
  const {
    formState,
    handleInput,
    handlePrevPage,
    disabled,
    setOpenPages,
    handleValueValidation,
  } = useContext(WizardContext);
  const [metalWorks_arr, setMetalWorks_arrs] = useState([]);
  const [disableSubmitBtn, setDisableSubmitBtn] = useState(true);
  const [additionalFilled, setAdditionalFilled] = useState(false);
  const textareaRef = useRef();
  let navigate = useNavigate();

  const { page3, errors_page3 } = formState;

  const PAGE = 'page3';
  const ERRORS_PAGE = 'errors_page3';
  const DB = process.env.REACT_APP_DB;

  useEffect(() => {
    setOpenPages((prev) => [...prev, PAGE]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async () => {
    const submitedValues = { ...formState.page1, ...formState.page2, ...page3 };
    try {
      const { response } = await axios.post(
        `${DB}/
        applications-to-mars.json`,
        submitedValues
      );
      navigate('/', { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteDisabledField = (disabledFied, name, value, PAGE) => {
    if (disabledFied === 'metalWork_selected') {
      setMetalWorks_arrs([]);
    } else {
      handleInput(disabledFied, '', PAGE);
    }

    handleInput(name, value, PAGE);
  };

  const handleDisabledOnChange = (field, disabled, checked, value) => {
    if (!disabled) {
      switch (field) {
        case 'agricultureSkills_describe':
          handleInput(
            'agricultureSkills_describe',
            textareaRef.current.value,
            PAGE
          );
          break;
        case 'metalWork_selected':
          if (checked) {
            setMetalWorks_arrs((prev) => [value, ...prev]);
          }
          if (!checked) {
            let rest_arr = metalWorks_arr.filter((item) => item !== value);
            setMetalWorks_arrs(rest_arr);
          }
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    handleInput('metalWork_selected', metalWorks_arr, PAGE);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metalWorks_arr]);

  useEffect(() => {
    const hasNoError = (element) => element === '';
    if (
      (!page3.agricultureSkills ||
        (page3.agricultureSkills && page3.agricultureSkills_describe)) &&
      (!page3.metalWork || (page3.metalWork && !!metalWorks_arr.length)) &&
      (!page3.convicted ||
        (page3.convicted && !!page3.convicted_reason_date.length)) &&
      Object.values(errors_page3).every(hasNoError)
    ) {
      setDisableSubmitBtn(true);
    } else {
      setDisableSubmitBtn(false);
    }
  }, [page3]);

  const submitBtn = disableSubmitBtn ? (
    <button className="btn-cta" onClick={() => handleSubmit()}>
      submit
    </button>
  ) : (
    <button className="btn-cta" disabled>
      submit
    </button>
  );
  return (
    <>
      {' '}
      <div className="container">
        <div className="header flex-row">
          <h3>{WIZARD_PAGE_3.heading}</h3>
          <div className="info">
            {INFO.form} <span>*</span>
          </div>
        </div>

        <div className="content form">
          <div className="row">
            <div className="info">
              <span>*</span> {WIZARD_PAGE_3.agriculture}
            </div>
            <div className="radio-input">
              <div className="row-item">
                <input
                  type="radio"
                  name="agricultureSkills"
                  value={false}
                  checked={!page3.agricultureSkills}
                  onChange={(e) =>
                    handleDeleteDisabledField(
                      'agricultureSkills_describe',
                      e.target.name,
                      e.target.value,
                      PAGE
                    )
                  }
                />
                {WIZARD_PAGE_3.no}
              </div>
              <div className="row-item">
                <input
                  type="radio"
                  name="agricultureSkills"
                  value={true}
                  checked={page3.agricultureSkills}
                  onChange={(e) =>
                    handleInput(e.target.name, e.target.value, PAGE)
                  }
                />
                {WIZARD_PAGE_3.yes}
              </div>
            </div>
          </div>

          {page3.agricultureSkills && (
            <div className="row">
              <div className="info">
                <span>*</span> {WIZARD_PAGE_3.agriculture_describe}
              </div>
              <textarea
                rows={10}
                ref={textareaRef}
                name="agricultureSkills_describe"
                disabled={disabled.agriculture}
                onChange={(e) =>
                  handleDisabledOnChange(e.target.name, disabled.agriculture)
                }
              />
            </div>
          )}

          <div className="row">
            <div className="info">
              <span>*</span> {WIZARD_PAGE_3.metalwork}
            </div>
            <div className="radio-input">
              <div className="row-item">
                <input
                  type="radio"
                  name="metalWork"
                  value={false}
                  checked={!page3.metalWork}
                  onChange={(e) =>
                    handleDeleteDisabledField(
                      'metalWork_selected',
                      e.target.name,
                      e.target.value,
                      PAGE
                    )
                  }
                />
                No
              </div>
              <div className="row-item">
                <input
                  type="radio"
                  name="metalWork"
                  value={true}
                  onChange={(e) =>
                    handleInput(e.target.name, e.target.value, PAGE)
                  }
                  checked={page3.metalWork}
                />
                Yes
              </div>
            </div>
          </div>

          {page3.metalWork && (
            <div className="row">
              <div className="info">
                <span>*</span> {WIZARD_PAGE_3.metalwork_set}
              </div>

              <div
                className={`checkboxes error-${!!errors_page3.metalWork_selected}`}
              >
                {WIZARD_PAGE_3.checkboxes_MetalWorks.map((metalwork) => (
                  <div key={metalwork.value} className="row-item">
                    <input
                      type="checkbox"
                      value={metalwork.value}
                      disabled={disabled.metalwork}
                      onClick={(e) =>
                        handleDisabledOnChange(
                          'metalWork_selected',
                          e.target.disabled,
                          e.target.checked,
                          e.target.value
                        )
                      }
                    />
                    {metalwork.label}
                  </div>
                ))}
              </div>
              <span className="error-text">
                {errors_page3.metalWork_selected}
              </span>
            </div>
          )}
          {/* convicted */}

          <div className="row ">
            <div className="info">
              <span>*</span> {WIZARD_PAGE_3.convicted}
            </div>
            <div className="radio-input">
              <div className="row-item">
                <input
                  type="radio"
                  name="convicted"
                  value={false}
                  checked={!page3.convicted}
                  onChange={(e) =>
                    handleDeleteDisabledField(
                      'convicted_reason_date',
                      e.target.name,
                      e.target.value,
                      PAGE
                    )
                  }
                />
                {WIZARD_PAGE_3.no}
              </div>
              <div className="row-item">
                <input
                  type="radio"
                  name="convicted"
                  value={true}
                  checked={page3.convicted}
                  onChange={(e) =>
                    handleInput(e.target.name, e.target.value, PAGE)
                  }
                />
                {WIZARD_PAGE_3.yes}
              </div>
            </div>
          </div>
          {page3.convicted && (
            <div className="group">
              <AdditionalList
                disabled={disabled.convicted}
                setDisableSubmitBtn={setDisableSubmitBtn}
              />
            </div>
          )}

          <div className="row ">
            <div className="info">
              <span>*</span>
              {WIZARD_PAGE_3.airplane}
            </div>
            <div className="radio-input">
              <div className="row-item">
                <input
                  type="radio"
                  name="airplane"
                  value={false}
                  checked={!page3.airplane}
                  onChange={(e) =>
                    handleInput(e.target.name, e.target.value, PAGE)
                  }
                />
                {WIZARD_PAGE_3.no}
              </div>
              <div className="row-item">
                <input
                  type="radio"
                  name="airplane"
                  value={true}
                  checked={page3.airplane}
                  onChange={(e) =>
                    handleInput(e.target.name, e.target.value, PAGE)
                  }
                />
                {WIZARD_PAGE_3.yes}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="info">
              <span>*</span> {WIZARD_PAGE_3.car}
            </div>
            <div className="radio-input">
              <div className="row-item">
                <input
                  type="radio"
                  name="car"
                  value={false}
                  checked={!page3.car}
                  onChange={(e) =>
                    handleInput(e.target.name, e.target.value, PAGE)
                  }
                />
                {WIZARD_PAGE_3.no}
              </div>
              <div className="row-item">
                <input
                  type="radio"
                  name="car"
                  value={true}
                  checked={page3.car}
                  onChange={(e) =>
                    handleInput(e.target.name, e.target.value, PAGE)
                  }
                />
                {WIZARD_PAGE_3.yes}
              </div>
            </div>
          </div>

          <div className="row ">
            <div className="info">
              <span>*</span> {WIZARD_PAGE_3.bicycle}
            </div>
            <div className="radio-input">
              <div className="row-item">
                <input
                  type="radio"
                  name="bicycle"
                  value={false}
                  checked={!page3.bicycle}
                  onChange={(e) =>
                    handleInput(e.target.name, e.target.value, PAGE)
                  }
                />
                {WIZARD_PAGE_3.no}
              </div>
              <div className="row-item">
                <input
                  type="radio"
                  name="bicycle"
                  value={true}
                  checked={page3.bicycle}
                  onChange={(e) =>
                    handleInput(e.target.name, e.target.value, PAGE)
                  }
                />
                {WIZARD_PAGE_3.yes}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <div className="flex-row">
          <button className="btn" onClick={handlePrevPage}>
            Back
          </button>
          {submitBtn}
        </div>
      </div>
    </>
  );
};

export default Page3;
