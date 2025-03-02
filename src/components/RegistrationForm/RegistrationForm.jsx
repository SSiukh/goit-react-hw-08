import { useState } from 'react';
import * as Yup from 'yup';
import { validationSchemas } from '../../utils/utils';
import { useFormik } from 'formik';
import s from './RegistrationForm.module.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';
import toast from 'react-hot-toast';
import { Button, TextField } from '@mui/material';

const RegistrationForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape(validationSchemas.registration);

  const handleSubmit = (values, actions) => {
    setIsLoading(true);
    dispatch(register(values))
      .unwrap()
      .then(response => {
        toast.success(`Welcome ${response.user.name}`);
        navigate('/contacts', { replace: true });
      })
      .catch(() => {
        toast.error('Something went wrong');
      })
      .finally(() => setIsLoading(false));
    actions.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className={s.wrapper}>
      <h1 className={s.title}>Create an Account</h1>
      <form className={s.form} onSubmit={formik.handleSubmit}>
        <p className={s.text}>Fill in the details below to register.</p>
        <TextField
          color="primary"
          name="name"
          id="name"
          label="Username"
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
          name="email"
          id="email"
          label="Email"
          variant="outlined"
          fullWidth
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          color="primary"
          name="password"
          id="password"
          label="Password"
          variant="outlined"
          fullWidth
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button
          loading={isLoading}
          size="large"
          type="submit"
          variant="contained"
          color="primary"
        >
          Register
        </Button>
      </form>
    </div>
  );
};

export default RegistrationForm;
