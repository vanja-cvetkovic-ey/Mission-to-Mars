const validator = (field, value) => {
  let message = '';
  if (
    field === 'firstName' ||
    field === 'lastName' ||
    field === 'state' ||
    field === 'city'
  ) {
    if (!new RegExp(/^[a-z ,.'-]+$/i).test(value)) {
      message = 'upsi first name / last name / state / city';
    }
  }
  if (field === 'birthDate') {
    if (value.slice(0, 4) > new Date().getFullYear() - 18) {
      message = 'upsi';
    }
  }
  if (field === 'email') {
    if (
      !new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/).test(value)
    ) {
      message = 'upsi';
    }
  }
  if (field === 'adressLine1') {
    if (!new RegExp(/[a-zA-Z0-9\s]/g).test(value)) {
      message = 'upsi adress line 1';
    }
  }
  if (field === 'state' || field === 'city' || field === 'zip') {
    if (value) {
      message = 'server error ';
    }
  }
  if (field === 'zip') {
    if (!new RegExp(/[0-9]{4,6}/).test(value)) {
      message = 'upsi ';
    }
  }
  if (field === 'years') {
    if (!new RegExp(/^[1-9][0-9]?$|^100$/).test(value)) {
      message = 'upsi too much';
    }
  }
  if (field === 'agricultureSkills_describe') {
    if (!value) {
      message = 'upsi';
    }
  }

  if (field === 'metalWork_selected') {
    if (!value) {
      message = 'upsi';
    }
  }

  if (field.includes('convicted_reason')) {
    if (!value) {
      message = 'upsi';
    }
  }

  return message;
};

export default validator;
