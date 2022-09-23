import { useContext, useEffect, useState, useMemo } from 'react';
import { Form, InputGroup, ListGroup, Button } from 'react-bootstrap';
import axios from 'axios';

import { WIZARD_PAGE_2, URL } from '../../../../shared/constants';
import WizardContext from '../../../../context/WizardContext';
import { FaTimes, FaSortDown } from 'react-icons/fa';
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
    console.log(value);
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
    <Form.Group className="position-relative" controlId="formBasicEmail">
      <Form.Label>{WIZARD_PAGE_2.state_label}</Form.Label>
      <InputGroup>
        <Form.Control
          type="text"
          placeholder={WIZARD_PAGE_2.state_label}
          aria-label={WIZARD_PAGE_2.state_label}
          aria-describedby={WIZARD_PAGE_2.state_label}
          name="state"
          value={!!page2.adressLine2 ? page2.adressLine2 : inputValue}
          autoComplete="off"
          onChange={(e) => handleInputValueChange(e)}
          onFocus={onFocus}
          readOnly={readOnly}
        />
        <Button
          variant="outline-secondary"
          onClick={icon ? handleInputValueDelete : onFocus}
        >
          {icon ? (
            <FaTimes style={{ fontSize: '12px' }} />
          ) : (
            <FaSortDown style={{ fontSize: '12px' }} />
          )}
        </Button>
      </InputGroup>

      {toggle && (
        <ListGroup className="list position-absolute">
          {searchResults.map((state) => (
            <ListGroup.Item
              key={state.tla}
              className="item"
              onClick={() => handleState([state.tla, state.name])}
            >
              {state.name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Form.Group>
  );
};

export default States;
