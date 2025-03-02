import s from './LoginForm.module.css';
import * as Yup from 'yup';
import { validationSchemas } from '../../utils/utils';
import { useFormik } from 'formik';
import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/auth/operations';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape(validationSchemas.login);

  const handleSubmit = (values, actions) => {
    setIsLoading(true);
    dispatch(login(values))
      .unwrap()
      .then(response => {
        toast.success(`Welcome ${response.user.name}`);
        navigate('/contacts', { replace: true });
      })
      .catch(() => {
        toast.error('Invalid Data');
      })
      .finally(() => {
        setIsLoading(false);
      });
    actions.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className={s.wrapper}>
      <h1 className={s.title}>Welcome back!</h1>
      <form className={s.form} onSubmit={formik.handleSubmit}>
        <p className={s.text}>Please log in to continue.</p>
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
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
