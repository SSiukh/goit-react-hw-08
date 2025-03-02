import { useFormik } from 'formik';
import { validationSchemas } from '../../utils/utils';
import s from './ContactForm.module.css';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/contacts/operations';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Button, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import clsx from 'clsx';
import { selectContacts } from '../../redux/contacts/selectors';

const ContactForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape(validationSchemas.contacts);

  const handleSubmit = (values, actions) => {
    setIsLoading(true);
    const numberIsExist = contacts.some(
      ({ number }) => number === values.number
    );

    if (numberIsExist) {
      toast.error('This number is already exist');
      setIsLoading(false);
      return;
    }

    dispatch(addContact({ ...values }))
      .unwrap()
      .then(response => {
        toast.success(`Contact ${response.name} added!`);
        setIsOpen(false);
      })
      .catch(() => {
        toast.error('Error. Please try again');
      })
      .finally(() => {
        setIsLoading(false);
      });
    actions.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      number: '',
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  return (
    <div className={s.container}>
      <Button size="large" variant="outlined" onClick={() => setIsOpen(true)}>
        Add contact
      </Button>
      <div
        onClick={handleOverlayClick}
        className={clsx(s.wrapper, !isOpen && 'visually-hidden')}
      >
        <form className={s.form} onSubmit={formik.handleSubmit}>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className={s.closeButton}
          >
            <CloseIcon className={s.close} />
          </button>
          <p className={s.text}>Add contact to your contacts book</p>
          <TextField
            color="primary"
            name="name"
            id="name"
            label="Name"
            variant="outlined"
            fullWidth
            type="text"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            color="primary"
            name="number"
            id="number"
            label="Number"
            variant="outlined"
            fullWidth
            type="text"
            value={formik.values.number}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.number && Boolean(formik.errors.number)}
            helperText={formik.touched.number && formik.errors.number}
          />
          <Button
            loading={isLoading}
            size="large"
            type="submit"
            variant="contained"
            color="primary"
          >
            Add contact
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
