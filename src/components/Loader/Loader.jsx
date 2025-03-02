import { SyncLoader } from 'react-spinners';
import s from './Loader.module.css';
import { useSelector } from 'react-redux';
import { selectisRefreshing } from '../../redux/auth/selectors';

const Loader = () => {
  const isRefreshing = useSelector(selectisRefreshing);

  return (
    <div className={s.loader}>
      <SyncLoader
        color="#42a5f5"
        loading={isRefreshing}
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;
