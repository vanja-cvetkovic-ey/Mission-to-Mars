import { useContext, useEffect, useState, useMemo } from 'react';
import axios from 'axios';

import { WIZARD_PAGE_2, URL } from '../../../../shared/constants';
import WizardContext from '../../../../context/WizardContext';
import { FaTimes } from 'react-icons/fa';
import './customDropdown.scss';

const controller = new AbortController();

const States = ({ errors_page2, page2 }) => {
  const { handleInput, handleValueValidation } = useContext(WizardContext);
  const [allStates, setAllStates] = useState([]);
  const [inputValue, setInputValue] = useState(
    page2.state !== '' ? page2.state : ''
  );
  const [searchResults, setSearchResults] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [icon, setIcon] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [focusStyle, setFocusStyle] = useState(false);

  useEffect(() => {
    const getStates = async () => {
      try {
        const { data } = await axios.get(URL.states);
        setAllStates(data);
      } catch (error) {
        handleValueValidation('state', true, errors_page2);
      }
    };
    getStates();
    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputValueChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (toggle) {
      setFocusStyle(true);
    } else {
      setFocusStyle(false);
    }
  }, [toggle]);

  const handleInputValueDelete = () => {
    if (page2.state === '') {
      setToggle(false);
      setIcon(false);
      setReadOnly(false);
    } else {
      setInputValue('');
      handleInput('state', '', 'page2');
      handleInput('city', '', 'page2');
      setToggle(true);
      setReadOnly(false);
    }

    if (!filteredResults.length) {
      setInputValue('');
      setToggle(true);
    }

    setSearchResults(allStates);
  };

  const filteredResults = useMemo(() => {
    return allStates.filter((state) =>
      state.name.toLowerCase().includes(inputValue.toLowerCase())
    );
  }, [allStates, inputValue]);

  useEffect(() => {
    setSearchResults(filteredResults);

    if (inputValue === '') {
      handleInput('state', '', 'page2');
      handleInput('city', '', 'page2');
      handleInput('zip', '', 'page2');
      setIcon(false);
    }
  }, [inputValue, filteredResults, handleInput]);

  const handleState = (value) => {
    setInputValue(value[1]);
    handleInput('state', value, 'page2');
    setToggle(false);
    setFocusStyle(false);
    setIcon(true);
    setReadOnly(true);
  };

  const onFocus = () => {
    if (!page2.state) {
      setToggle(true);
    }
    if (!readOnly) {
      setFocusStyle(true);
    }

    setIcon(true);
  };

  return (
    <div className="row-item row-item-3 states-row-item">
      <div className="info">
        <span>*</span> {WIZARD_PAGE_2.state_label}
      </div>
      <div className={`customDropdown  focus-${focusStyle}`}>
        <input
          className={`error-${!!errors_page2.state}`}
          type="text"
          placeholder={WIZARD_PAGE_2.state_label}
          name="state"
          value={inputValue}
          autoComplete="off"
          onChange={(e) => handleInputValueChange(e)}
          onFocus={onFocus}
          readOnly={readOnly}
        />
        <div className="icon">
          {icon && <FaTimes onClick={handleInputValueDelete} />}
        </div>
      </div>
      {toggle && (
        <div className="list">
          {searchResults.map((state) => (
            <div
              key={state.tla}
              className="item"
              onClick={() => handleState([state.tla, state.name])}
            >
              {state.name}
            </div>
          ))}
        </div>
      )}

      <span className="error-text">{errors_page2.state}</span>
    </div>
  );
};

export default States;
