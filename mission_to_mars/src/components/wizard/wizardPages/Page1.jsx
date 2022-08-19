import { useContext } from 'react';

import { INFO, WIZARD_PAGE_1, CONTINUE } from '../../../shared/constants';
import WizardContext from '../../../context/WizardContext';

const Page1 = () => {
  const { handleInput, handleValueValidation, formState, handleNextPage } =
    useContext(WizardContext);

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

  const continueBtn =
    page1.title && page1.firstName && page1.lastName && page1.birthDate ? (
      <button
        className="btn-cta"
        onClick={() => handleNextPage(errors_page1, 'page2')}
      >
        {CONTINUE}
      </button>
    ) : (
      <button className="btn-cta" disabled>
        {CONTINUE}
      </button>
    );

  return (
    <>
      <div className="container">
        <div className="header flex-row">
          <h3>{WIZARD_PAGE_1.heading}</h3>
          <div className="info">
            {INFO.form} <span>*</span>
          </div>
        </div>
        <div className="content form">
          <div className="group">
            <div className="row flex-row">
              <div className="row-item">
                <div className="info">
                  <span>*</span> {WIZARD_PAGE_1.title_label}
                </div>
                <select
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
                </select>
                <span className="error-text"></span>
              </div>
            </div>
            <div className="row flex-row">
              <div className="row-item">
                <input
                  className={`error-${!!errors_page1.firstName}`}
                  type="text"
                  name="firstName"
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
                <span className="error-text">{errors_page1.firstName}</span>
              </div>
              <div className="row-item">
                <input
                  className={`error-${!!errors_page1.lastName}`}
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
                <span className="error-text">{errors_page1.lastName}</span>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="row-item">
              <div className="info">
                <span>*</span> {WIZARD_PAGE_1.birthdate_label}
              </div>
              <input
                className={`error-${!!errors_page1.birthDate}`}
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
              <span className="error-text">{errors_page1.birthDate}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <div className="flex-row">
          <button className="btn">Back</button>
          {continueBtn}
        </div>
      </div>
    </>
  );
};

export default Page1;
