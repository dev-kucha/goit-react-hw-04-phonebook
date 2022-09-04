import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import styled from 'styled-components';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

const Main = styled.div`
  width: 520px;
  margin: 0 auto;
  font-size: 16px;
`;

const initialContacts = () => {
  return (
    JSON.parse(localStorage.getItem('contacts')) || [
      { id: 'id-1', name: 'Rosie Simpson', number: '+38044-459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '+38055-443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '+38066-645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '+38077-227-91-26' },
    ]
  );
};

export const App = () => {
  const [contacts, setContacts] = useState(initialContacts());

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    const cts = JSON.parse(localStorage.getItem('contacts'));
    if (cts) {
      setContacts(() => {
        return cts;
      });
    }
  }, []);

  const createContact = (name, number) => {
    return { name: name, number: number, id: nanoid() };
  };

  const isIncludes = newName => {
    return contacts.find(
      contact =>
        contact.name.toLocaleLowerCase() === newName.toLocaleLowerCase()
    )
      ? true
      : false;
  };

  const addContact = contact => {
    setContacts([contact, ...contacts]);
  };

  const handleDelete = contactId => {
    setContacts(() => {
      return contacts.filter(contact => contact.id !== contactId);
    });
  };

  const handleSubmit = ({ name, number }) => {
    !isIncludes(name)
      ? addContact(createContact(name, number))
      : alert(`${name} is already in contacts`);
  };

  const handleFilter = filterText => {
    setFilter(filterText);
  };

  return (
    <Main>
      <h1>Phonebook</h1>
      <ContactForm handleSubmit={handleSubmit} />
      <h2>Contacts</h2>
      <Filter filter={filter} handleFilter={handleFilter} />
      <ContactList
        contacts={contacts}
        filter={filter}
        handleDelete={handleDelete}
      />
    </Main>
  );
};
