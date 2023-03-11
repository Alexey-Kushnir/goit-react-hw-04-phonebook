import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Section } from './Section/Section';
import { ContactsInput } from './ContactsInput/ContactsInput';
import { ContactsStorage } from './ContactsStorage/ContactsStorage';
import { Filter } from './Filter/Filter';

const getContacts = () => {
  const contactList = JSON.parse(localStorage.getItem('contacts'));
  if (contactList) {
    return contactList;
  }
  return [];
};

export const App = () => {
  const [contacts, setContacts] = useState(getContacts);
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }, { resetForm }) => {
    if (
      contacts.some(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      return alert(`${name} is already in contacts.`);
    }

    setContacts(prevState => [...prevState, { id: nanoid(8), name, number }]);
    return resetForm();
  };

  const deleteContact = contactId => {
    setContacts(prevState => {
      return prevState.filter(contact => contact.id !== contactId);
    });
  };

  const changeFilter = e => {
    setFilterValue(e.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filterValue.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <Section title="Phonebook">
        <ContactsInput onSubmit={addContact} />
      </Section>
      <Section title="Contacts">
        {contacts.length > 0 && (
          <>
            <Filter value={filterValue} onChange={changeFilter} />
            <ContactsStorage
              contactList={getVisibleContacts()}
              onDeleteContact={deleteContact}
            />
          </>
        )}
      </Section>
    </div>
  );
};
