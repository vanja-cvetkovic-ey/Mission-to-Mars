import { useContext, useEffect, useState, useMemo } from 'react';
import axios from 'axios';

import { WIZARD_PAGE_2, URL } from '../../../../shared/constants';
import WizardContext from '../../../../context/WizardContext';
import { FaTimes } from 'react-icons/fa';
import './States.scss';

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

  const handleInputValueDelete = () => {
    setInputValue('');
    handleInput('state', '', 'page2');
    handleInput('city', '', 'page2');
    setToggle(true);
    setIcon(false);
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
      setIcon(false);
    }
  }, [inputValue, filteredResults, handleInput]);

  const handleState = (value) => {
    setInputValue(value[1]);
    handleInput('state', value, 'page2');
    setToggle(false);
    setIcon(true);
  };

  const onFocus = () => {
    setToggle(true);
    setIcon(true);
  };

  return (
    <div className="row-item row-item-3 states-row-item">
      <div className="info">
        <span>*</span> {WIZARD_PAGE_2.state_label}
      </div>
      <div className="states">
        <input
          className={`error-${!!errors_page2.state}`}
          type="text"
          placeholder={WIZARD_PAGE_2.state_label}
          name="state"
          value={inputValue}
          autoComplete="off"
          onChange={(e) => handleInputValueChange(e)}
          onFocus={onFocus}
        />
        <div className="icon">
          {icon && <FaTimes onClick={handleInputValueDelete} />}
        </div>
      </div>

      {((!!inputValue && !!searchResults.length && toggle) ||
        (!inputValue && !!searchResults && toggle)) && (
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
