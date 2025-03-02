import { NavLink } from 'react-router-dom';
import s from './Navigation.module.css';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { useSelector } from 'react-redux';
import { setNavClass } from '../../utils/utils';

const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <nav className={s.nav}>
      <NavLink to="/" className={isActive => setNavClass(isActive)}>
        Home
      </NavLink>

      {isLoggedIn && (
        <NavLink to="/contacts" className={isActive => setNavClass(isActive)}>
          Contacts
        </NavLink>
      )}
    </nav>
  );
};

export default Navigation;
