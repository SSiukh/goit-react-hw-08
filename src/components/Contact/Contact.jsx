import s from './Contact.module.css';
import { FaUser } from 'react-icons/fa6';
import { FaPhoneAlt } from 'react-icons/fa';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteModal from '../DeleteModal/DeleteModal';
import { useState } from 'react';
import EditModal from '../EditModal/EditModal';

const Contact = ({ name, number, id }) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <li className={s.contact}>
      <div className={s.info}>
        <div className={s.block}>
          <FaUser className={s.icon} />
          <p className={s.text}>{name}</p>
        </div>
        <div className={s.block}>
          <FaPhoneAlt className={s.icon} />
          <p className={s.text}>{number}</p>
        </div>
      </div>
      <div className={s.buttons}>
        <IconButton
          onClick={() => setIsEditOpen(true)}
          color="warning"
          aria-label="edit"
        >
          <EditIcon />
        </IconButton>
        <IconButton
          color="error"
          aria-label="delete"
          onClick={() => setIsDeleteOpen(true)}
        >
          <DeleteIcon />
        </IconButton>
      </div>
      <DeleteModal
        isOpen={isDeleteOpen}
        id={id}
        handleClose={() => setIsDeleteOpen(false)}
      />
      <EditModal
        isOpen={isEditOpen}
        id={id}
        name={name}
        number={number}
        handleClose={() => setIsEditOpen(false)}
      />
    </li>
  );
};

export default Contact;
