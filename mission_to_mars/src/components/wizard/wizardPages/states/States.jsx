import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import { WIZARD_PAGE_2 } from '../../../../shared/constants';
import WizardContext from '../../../../context/WizardContext';
import { FaTimes } from 'react-icons/fa';
import './States.scss';

const States = ({ errors_page2 }) => {
  const { handleInput } = useContext(WizardContext);
  const [allStates, setAllStates] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const getStates = async () => {
      try {
        const { data } = await axios.get('http://det.api.rs.ey.com/api/states');
        setAllStates(data);
      } catch (error) {
        console.log(error);
      }
    };
    getStates();
    return () => {
      controller.abort();
    };
  }, []);

  const handleInputValueChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputValueDelete = () => {
    setInputValue('');
    handleInput('state', '', 'page2');
    handleInput('city', '', 'page2');
    setToggle(false);
    setClicked(false);
  };

  useEffect(() => {
    const filteredResults = allStates.filter((state) =>
      state.name.toLowerCase().includes(inputValue.toLowerCase())
    );

    setSearchResults(filteredResults);
    setToggle(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  const handleState = (value) => {
    console.log('a');
    if (clicked === false) {
      setInputValue(value[1]);
      handleInput('state', value, 'page2');
      setClicked(true);
      setToggle(false);
    } else {
      return;
    }
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
          // onChange={(e) => handleInput(e.target.name, e.target.value, PAGE)}
          onChange={(e) => handleInputValueChange(e)}
        />
        <div className="icon">
          {(inputValue || toggle) && (
            <FaTimes onClick={handleInputValueDelete} />
          )}
        </div>
      </div>

      {toggle && !clicked && (
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
      <span className="error-text"></span>
    </div>
  );
};

export default States;
