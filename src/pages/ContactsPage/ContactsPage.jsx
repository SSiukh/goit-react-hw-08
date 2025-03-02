import { useDispatch, useSelector } from 'react-redux';
import ContactForm from '../../components/ContactForm/ContactForm';
import ContactList from '../../components/ContactList/ContactList';
import SearchBox from '../../components/SearchBox/SearchBox';
import s from './ContactsPage.module.css';
import { fetchContacts } from '../../redux/contacts/operations';
import { useEffect } from 'react';
import { selectUser } from '../../redux/auth/selectors';

const ContactsPage = () => {
  const dispatch = useDispatch();
  const { email } = useSelector(selectUser);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={s.wrapper}>
      <h1 className={s.title}>Welcome, {email}</h1>
      <div className={s.sideBar}>
        <SearchBox />
        <ContactForm />
      </div>
      <ContactList />
    </div>
  );
};

export default ContactsPage;
