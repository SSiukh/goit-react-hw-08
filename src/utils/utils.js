import clsx from 'clsx';
import * as Yup from 'yup';

export const setNavClass = ({ isActive }) => {
  return clsx('link', isActive && 'active');
};

export const regexes = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+={}\[\]:;<>.,?/~`|-]{8,}$/,
};

export const validationSchemas = {
  login: {
    email: Yup.string().matches(regexes.email, 'Incorrect email').required(),
    password: Yup.string()
      .min(8, 'Password must contain at least 8 characters')
      .required(),
  },
  registration: {
    name: Yup.string()
      .min(3, 'Name must have at leat 3 characters')
      .max(50, 'Name must be shorter than 30 characters')
      .required(),
    email: Yup.string().matches(regexes.email, 'Incorrect email').required(),
    password: Yup.string()
      .matches(
        regexes.password,
        'Password must contain uppercase and lowercase letters and a number'
      )
      .min(8, 'Password must contain at least 8 characters')
      .required(),
  },
  contacts: {
    name: Yup.string()
      .min(3, 'Too short!')
      .max(50, 'Too long!')
      .required()
      .trim(),
    number: Yup.string()
      .min(3, 'Too short!')
      .max(15, 'Too long!')
      .required()
      .trim(),
  },
};
