import { useContext, useEffect, useState, useMemo } from 'react';
import { Form, Button, ListGroup, InputGroup, Spinner } from 'react-bootstrap';
import axios from 'axios';

import { FaSortDown } from 'react-icons/fa';
import { WIZARD_PAGE_2, URL } from '../../../../shared/constants';
import WizardContext from '../../../../context/WizardContext';
import './customDropdown.scss';

const controller = new AbortController();

const Zip = ({ page2, errors_page2 }) => {
  const { handleInput, handleValueValidation } = useContext(WizardContext);
  const [allZips, setAllZips] = useState([]);
  const [inputValue, setInputValue] = useState(
    page2.zip !== '' ? page2.zip : ''
  );
  const [searchResults, setSearchResults] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [placeholder_text, setPlaceholder_text] = useState(
    WIZARD_PAGE_2.zip_label
  );
  const [loadingZip, setLoadingZip] = useState();
  const [disabled, setDisabled] = useState();
  const [focusStyle, setFocusStyle] = useState(false);

  const getZips = async () => {
    try {
      const { data } = await axios.get(
        `${URL.states}/${page2.state[0]}/cities/${page2.city}/postalcodes`
      );
      setLoadingZip(false);
      setDisabled(false);
      setAllZips(data);
      setPlaceholder_text(`${WIZARD_PAGE_2.zip_placeholder}  ${page2.city}`);
    } catch (error) {
      handleValueValidation('state', true, errors_page2);
    }
  };

  useEffect(() => {
    setLoadingZip(true);
    setToggle(false);
    setPlaceholder_text(WIZARD_PAGE_2.zip_label);
    setInputValue('');
    if (!page2.city) {
      setLoadingZip(true);
      setDisabled(true);
      setToggle(false);
      setPlaceholder_text(WIZARD_PAGE_2.zip_label);
      setInputValue('');
    } else {
      getZips();
      return () => {
        controller.abort();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page2.city]);

  const handleInputValueChange = (e) => {
    setInputValue(e.target.value);
  };

  const filteredResults = useMemo(() => {
    if (inputValue !== '') {
      let dropdown = allZips.filter((zip) =>
        zip.code.toLowerCase().includes(inputValue)
      );

      return dropdown;
    } else {
      return allZips;
    }
  }, [allZips, inputValue]);

  useEffect(() => {
    setSearchResults(filteredResults);

    if (inputValue === '') {
      handleInput('zip', '', 'page2');
    }
  }, [inputValue, filteredResults, handleInput]);

  const handleZip = (value) => {
    setInputValue(value);
    handleInput('zip', value, 'page2');
    setFocusStyle(false);
    setToggle(false);
  };

  const onFocus = () => {
    setToggle(true);
    setFocusStyle(true);
  };

  const btnHandler = () => {
    if (!disabled) {
      setToggle(!toggle);
    }
  };

  return (
    <Form.Group className="position-relative">
      <Form.Label>
        <span>*</span> {WIZARD_PAGE_2.zip_label}{' '}
        {!!page2.city && loadingZip && (
          <Spinner animation="border" size="sm" className="mx-1" />
        )}
      </Form.Label>
      <InputGroup>
        <Form.Control
          className={`disabled-${disabled}`}
          type="text"
          placeholder={placeholder_text}
          name="state"
          value={inputValue}
          autoComplete="off"
          maxLength="5"
          onChange={(e) => handleInputValueChange(e)}
          onFocus={onFocus}
          disabled={disabled}
        />
        <Button
          variant="outline-secondary"
          onClick={btnHandler}
          disabled={disabled}
        >
          <FaSortDown style={{ fontSize: '12px' }} />
        </Button>
      </InputGroup>
      {toggle && !!searchResults.length && (
        <ListGroup className="list position-absolute">
          {searchResults.map((zip) => (
            <ListGroup.Item
              key={zip.code}
              className="item"
              onClick={() => handleZip(zip.code)}
            >
              {zip.code}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Form.Group>

    // <div className={`row-item row-item-3 states-row-item`}>
    //   <div className="info info-spinner">
    //     <span>*</span> {WIZARD_PAGE_2.zip_label}
    //     {!!page2.city && loadingZip && <Spinner />}
    //   </div>
    //   <div className={`customDropdown  focus-${focusStyle}`}>
    //     <input
    //       className={`disabled-${disabled}`}
    //       type="text"
    //       placeholder={placeholder_text}
    //       name="state"
    //       value={inputValue}
    //       autoComplete="off"
    //       maxLength="5"
    //       onChange={(e) => handleInputValueChange(e)}
    //       onFocus={onFocus}
    //       disabled={disabled}
    //     />
    //   </div>
    //   {toggle && !!searchResults.length && (
    //     <div className="list">
    //       {searchResults.map((zip) => (
    //         <div
    //           key={zip.code}
    //           className="item"
    //           onClick={() => handleZip(zip.code)}
    //         >
    //           {zip.code}
    //         </div>
    //       ))}
    //     </div>
    //   )}

    //   <span className="error-text">{errors_page2.zip}</span>
    // </div>
  );
};

export default Zip;
