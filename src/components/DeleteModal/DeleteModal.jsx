import { Button } from '@mui/material';
import s from './DeleteModal.module.css';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contacts/operations';
import clsx from 'clsx';

const DeleteModal = ({ isOpen, id, handleClose }) => {
  const dispatch = useDispatch();

  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div
      onClick={handleOverlayClick}
      className={clsx(s.overlay, !isOpen && 'visually-hidden')}
    >
      <div className={s.wrapper}>
        <p className={s.text}>Are you sure?</p>
        <div className={s.buttons}>
          <Button onClick={handleClose} variant="outlined" color="success">
            Cancel
          </Button>
          <Button
            onClick={() => dispatch(deleteContact(id))}
            variant="outlined"
            color="error"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
