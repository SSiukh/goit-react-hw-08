import { logout } from '../../redux/auth/operations';
import { selectUser } from '../../redux/auth/selectors';
import s from './UserMenu.module.css';
import { useDispatch, useSelector } from 'react-redux';

const UserMenu = () => {
  const { email } = useSelector(selectUser);
  const dispatch = useDispatch();

  return (
    <div className={s.wrapper}>
      <p className={s.greet}>Welcome, {email}</p>
      <button onClick={() => dispatch(logout())} className="link">
        Logout
      </button>
    </div>
  );
};

export default UserMenu;
