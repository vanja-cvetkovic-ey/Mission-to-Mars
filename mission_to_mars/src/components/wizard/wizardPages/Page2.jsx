import { useContext, useEffect, useState } from 'react';

import { CONTINUE, INFO, WIZARD_PAGE_2 } from '../../../shared/constants';
import States from './states/States';
import WizardContext from '../../../context/WizardContext';
import axios from 'axios';

const Page2 = () => {
  const {
    formState,
    handleInput,
    disabled,
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

  const [citesOpt, setCitesOpt] = useState([]);
  const [zipOpt, setZipOpt] = useState([]);

  useEffect(() => {
    setOpenPages((prev) => [...prev, PAGE]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDisabledOnChange = (e) => {
    const { disabled, name, value } = e.target;
    if (!disabled) {
      handleInput(name, value, PAGE);
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    const getCitiesOptions = async () => {
      try {
        const { data } = await axios.get(
          `http://det.api.rs.ey.com/api/states/${page2.state[0]}/cities`
        );
        let cities = [];
        console.log(data);
        cities = data.filter((item) => {
          const isDuplicate = cities.find((city) => item.name === city.name);
          if (!isDuplicate) {
            console.log('HELLO');
            cities.push(item);
            return true;
          }
          return false;
        });
        setCitesOpt(cities);
      } catch (error) {
        console.log(error);
      }
    };
    if (page2.state !== '') {
      getCitiesOptions();
      return () => {
        controller.abort();
      };
    }
  }, [page2.state]);

  useEffect(() => {
    const controller = new AbortController();

    const getZipOptions = async () => {
      try {
        const { data } = await axios.get(
          `http://det.api.rs.ey.com/api/states/${page2.state[0]}/cities/${page2.city}/postalcodes`
        );
        setZipOpt(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (page2.state !== '') {
      getZipOptions();
      return () => {
        controller.abort();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page2.city]);

  useEffect(() => {
    handleContinueBtn(errors_page2, page2);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors_page2, page2]);

  const continueBtn = disabledBtn ? (
    <button className="btn-cta" disabled>
      {CONTINUE}
    </button>
  ) : (
    <button className="btn-cta" onClick={handleNextPage}>
      {CONTINUE}
    </button>
  );

  return (
    <>
      {' '}
      <div className="container">
        <div className="header flex-row">
          <h3>{WIZARD_PAGE_2.heading}</h3>
          <div className="info">
            {INFO.form} <span>*</span>
          </div>
        </div>
        <div className="content form">
          <div className="row">
            <div className="row-item">
              <div className="info">
                <span>*</span> {WIZARD_PAGE_2.email_label}
              </div>
              <input
                className={`error-${!!errors_page2.email}`}
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
              <span className="error-text">{errors_page2.email}</span>
            </div>
          </div>
          {/* adress */}
          <div className="row flex-row">
            {/* adress line 1 */}
            <div className="row-item">
              <div className="info">
                <span>*</span> {WIZARD_PAGE_2.adress1_label}
              </div>
              <input
                className={`error-${!!errors_page2.adressLine1}`}
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
              <span className="error-text">{errors_page2.adressLine1}</span>
            </div>
            {/* adress line 2 */}
            <div className="row-item">
              <div className="info">{WIZARD_PAGE_2.adress2_label}</div>
              <input
                className={`error-${!!errors_page2.adressLine2}`}
                type="text"
                placeholder={WIZARD_PAGE_2.adress1_label}
                name="adressLine2"
                value={page2.adressLine2}
                onChange={(e) =>
                  handleInput(e.target.name, e.target.value, PAGE)
                }
              />
              <span className="error-text"></span>
            </div>
          </div>
          <div className="row flex-row">
            <States errors_page2 />
            {/* city */}
            <div className="row-item row-item-3">
              <div className="info">
                <span>*</span> {WIZARD_PAGE_2.city_label}
              </div>
              <select
                name="city"
                value={page2.city}
                disabled={disabled.city}
                onChange={(e) => handleDisabledOnChange(e)}
              >
                {citesOpt.map((city) => (
                  <option key={city.name} value={city.name} disabled={false}>
                    {city.name}
                  </option>
                ))}
              </select>

              <span className="error-text">{errors_page2.city}</span>
            </div>
            {/* postl code */}
            <div className="row-item row-item-3">
              <div className="info">
                <span>*</span> {WIZARD_PAGE_2.zip_label}
              </div>
              <select
                name="zip"
                value={page2.zip}
                disabled={disabled.zip}
                onChange={(e) => handleDisabledOnChange(e)}
              >
                {zipOpt.map((zip) => (
                  <option key={zip.code} value={zip.code} disabled={false}>
                    {zip.code}
                  </option>
                ))}
              </select>

              <span className="error-text">{errors_page2.zip}</span>
            </div>
          </div>
          <div className="row">
            <div className="row-item">
              <div className="info">
                <span>*</span> {WIZARD_PAGE_2.years_label}
              </div>
              <input
                className={`error-${!!errors_page2.years}`}
                type="text"
                placeholder={WIZARD_PAGE_2.years}
                style={{ width: '120px' }}
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
              <span className="error-text">{errors_page2.years}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <div className="flex-row">
          <button className="btn" onClick={handlePrevPage}>
            Back
          </button>
          {continueBtn}
        </div>
      </div>
    </>
  );
};

export default Page2;
