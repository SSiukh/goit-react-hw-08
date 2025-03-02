import { useFormik } from 'formik';
import { validationSchemas } from '../../utils/utils';
import s from './EditModal.module.css';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { editContact } from '../../redux/contacts/operations';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Button, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import clsx from 'clsx';

const EditModal = ({ isOpen, handleClose, name, number, id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape(validationSchemas.contacts);

  const handleSubmit = (values, actions) => {
    setIsLoading(true);

    dispatch(editContact({ ...values, id }))
      .unwrap()
      .then(response => {
        toast.success(`Contact ${response.name} edited!`);
        handleClose();
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
      name,
      number,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: handleSubmit,
  });

  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div
      onClick={handleOverlayClick}
      className={clsx(s.wrapper, !isOpen && 'visually-hidden')}
    >
      <form className={s.form} onSubmit={formik.handleSubmit}>
        <button type="button" onClick={handleClose} className={s.closeButton}>
          <CloseIcon className={s.close} />
        </button>
        <p className={s.text}>Edit contact</p>
        <TextField
          color="warning"
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
          color="warning"
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
          color="warning"
        >
          Edit contact
        </Button>
      </form>
    </div>
  );
};

export default EditModal;
