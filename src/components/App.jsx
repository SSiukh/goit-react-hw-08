import { useDispatch, useSelector } from 'react-redux';
import { useEffect, lazy } from 'react';
import { selectError } from '../redux/contacts/selectors';
import toast from 'react-hot-toast';
import Layout from './Layout';
import { Route, Routes } from 'react-router-dom';
import RestrictedRoute from './RestrictedRoute';
import PrivateRoute from './PrivateRoute';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Notifications from './Notifications/Notifications';
import { refreshUser } from '../redux/auth/operations';
import { selectisRefreshing } from '../redux/auth/selectors';
import Loader from './Loader/Loader';

const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const RegistrationPage = lazy(() => import('../pages/RegistrationPage'));
const ContactsPage = lazy(() => import('../pages/ContactsPage/ContactsPage'));

function App() {
  const error = useSelector(selectError);
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectisRefreshing);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <Loader />
  ) : (
    <Layout>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/register"
            element={
              <RestrictedRoute
                component={<RegistrationPage />}
                redirectTo="/contacts"
              />
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute
                component={<LoginPage />}
                redirectTo="/contacts"
              />
            }
          />
          <Route
            path="/contacts"
            element={
              <PrivateRoute component={<ContactsPage />} redirectTo="/login" />
            }
          />
        </Routes>
      </ThemeProvider>
      <Notifications />
    </Layout>
  );
}

export default App;
