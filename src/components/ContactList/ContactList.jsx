import s from './ContactList.module.css';
import Contact from '../Contact/Contact';
import { useSelector } from 'react-redux';
import {
  selectContacts,
  selectFilteredContacts,
} from '../../redux/contacts/selectors';

const ContactList = () => {
  const filteredContacts = useSelector(selectFilteredContacts);
  const length = useSelector(selectContacts).length;

  return (
    <div className={s.wrapper}>
      {length === 0 && <p className={s.text}>You have no contacts yet</p>}
      <ul className={s.list}>
        {filteredContacts.map(({ id, name, number }) => {
          return <Contact key={id} name={name} number={number} id={id} />;
        })}
      </ul>
    </div>
  );
};

export default ContactList;
