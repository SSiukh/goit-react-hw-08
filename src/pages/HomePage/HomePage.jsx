import { useSelector } from 'react-redux';
import { selectIsLoggedIn, selectUser } from '../../redux/auth/selectors';
import s from './HomePage.module.css';

const HomePage = () => {
  const { name } = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div className={s.wrapper}>
      <h1 className={s.title}>
        {isLoggedIn ? `${name}, w` : 'W'}elcome to your contacts book!
      </h1>
      <p className={s.description}>
        Keep all your important contacts organized in one secure and easy-to-use
        platform. Whether for work, friends, or family, this address book helps
        you store, categorize, and quickly access anyone you need to reach.
      </p>
    </div>
  );
};

export default HomePage;
