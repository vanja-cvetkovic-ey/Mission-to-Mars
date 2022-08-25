import { createContext, useReducer, useState, useEffect } from 'react';

import Page1 from '../components/wizard/wizardPages/Page1';
import Page2 from '../components/wizard/wizardPages/Page2';
import Page3 from '../components/wizard/wizardPages/Page3';
import validator from './validate';

const WizardContext = createContext({});

const formReducer = (state, action) => {
  switch (action.type) {
    case 'GET_INPUT_VALUE':
      let page = state[action.page];
      page = { ...page, [action.field]: action.payload };
      return {
        ...state,
        [action.page]: page,
      };
    case 'VALIDATE_VALUE':
      let errors_page = state[action.page];
      let error_message = validator(action.field, action.payload);
      errors_page = {
        ...errors_page,
        [action.field]: error_message,
      };
      return {
        ...state,
        [action.page]: errors_page,
      };

    default:
      return state;
  }
};

const page1 = {
  title: '',
  firstName: '',
  lastName: '',
  birthDate: '',
};
const page2 = {
  email: '',
  adressLine1: '',
  adressLine2: '',
  city: '',
  state: '',
  zip: '',
  years: '',
};
const page3 = {
  agricultureSkills: false,
  agricultureSkills_describe: '',
  metalWork: false,
  metalWork_selected: [],
  convicted: false,
  convicted_reason_date: [],
  airplane: false,
  car: false,
  bicycle: false,
};
const errors_page1 = {
  firstName: '',
  lastName: '',
  birthDate: '',
};
const errors_page2 = {
  email: '',
  adressLine1: '',
  adressLine2: '',
  city: '',
  state: '',
  zip: '',
  years: '',
};
const errors_page3 = {
  agricultureSkills_describe: '',
  metalWork_selected: '',
};

const ACTIONS = {
  GET_INPUT_VALUE: 'GET_INPUT_VALUE',
  VALIDATE_VALUE: 'VALIDATE_VALUE',
};

export const WizardProvider = ({ children }) => {
  const [formState, dispach] = useReducer(formReducer, {
    page1,
    page2,
    page3,
    errors_page1,
    errors_page2,
    errors_page3,
  });

  const [disabledBtn, setDisabledBtn] = useState(true);
  const [startWizard, setStartWizard] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [openPages, setOpenPages] = useState(['page1']);
  const [disabled, setDisabled] = useState({
    state: '',
    city: '',
    agriculture: '',
    metalwork: '',
    convicted: '',
  });

  useEffect(() => {
    setDisabled({
      city: formState.page2.state ? false : true,
      zip: formState.page2.state && formState.page2.city ? false : true,
      agriculture: formState.page3.agricultureSkills ? false : true,
      metalwork: formState.page3.metalWork ? false : true,
      convicted: formState.page3.convicted ? false : true,
    });
  }, [
    formState.page2.state,
    formState.page2.city,
    formState.page3.agricultureSkills,
    formState.page3.metalWork,
    formState.page3.convicted,
  ]);

  const handleInput = (field, value, page) => {
    if (value === 'true' || value === 'false') {
      let parsedValue = JSON.parse(value);
      value = parsedValue;
    }
    dispach({
      type: ACTIONS.GET_INPUT_VALUE,
      page: page,
      field: field,
      payload: value,
    });
  };
  const handleValueValidation = (field, value, page) => {
    dispach({
      type: ACTIONS.VALIDATE_VALUE,
      page: page,
      field: field,
      payload: value,
    });
  };

  const displayStep = (page) => {
    switch (page) {
      case 1:
        return <Page1 />;
      case 2:
        return <Page2 />;
      case 3:
        return <Page3 />;
      default:
        break;
    }
  };

  const handleContinueBtn = (errors, values) => {
    const hasError = (element) => element !== '';
    const hasNoValue = (element) => element === '';
    if (
      Object.values(errors).some(hasError) ||
      Object.values(values).some(hasNoValue)
    ) {
      setDisabledBtn(true);
    } else {
      setDisabledBtn(false);
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  return (
    <WizardContext.Provider
      value={{
        startWizard,
        setStartWizard,
        currentPage,
        openPages,
        setOpenPages,
        page1,
        page2,
        page3,
        formState,
        handleInput,
        handleValueValidation,
        disabled,
        handleContinueBtn,
        disabledBtn,
        handleNextPage,
        handlePrevPage,
        displayStep,
        setCurrentPage,
      }}
    >
      {children}
    </WizardContext.Provider>
  );
};

export default WizardContext;
