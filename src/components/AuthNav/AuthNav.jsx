import { NavLink } from 'react-router-dom';
import s from './AuthNav.module.css';
import { setNavClass } from '../../utils/utils';

const AuthNav = () => {
  return (
    <div className={s.wrapper}>
      <NavLink to="/register" className={isActive => setNavClass(isActive)}>
        Register
      </NavLink>
      <NavLink to="/login" className={isActive => setNavClass(isActive)}>
        Log in
      </NavLink>
    </div>
  );
};

export default AuthNav;
