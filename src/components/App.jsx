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
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }, { resetForm }) => {
    // console.log(name, number, resetForm);
    // const contactName = name.toLowerCase();
    // console.dir(contacts);

    // if (contacts.some(contact => contact.name === name)) {
    //   return alert(`${name} is already in contacts.`);
    // }

    // this.setState(({ contacts }) => ({
    //   contacts: [{ id: nanoid(8), name, number }, ...contacts],
    // }));
    const newContact = { id: nanoid(8), name, number };

    console.log(newContact);
    console.log(contacts);

    // setContacts(contacts.push(newContact));
    setContacts(prevState => [...prevState.contacts, newContact]);

    return resetForm();
  };

  const deleteContact = contactId => {
    setContacts(contacts => {
      contacts.filter(contact => contact.id !== contactId);
    });
  };

  // const deleteContact = contactId => {
  //   setContacts(prevState => {
  //     prevState.filter(contact => contact.id !== contactId);
  //   });
  // };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = () => {
    // const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  // const { addContact, changeFilter, getVisibleContacts, deleteContact } =
  //   this;
  // const { contacts, filter } = this.state;
  // console.log(contacts);

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
            <Filter value={filter} onChange={changeFilter} />
            <ContactsStorage
              contactList={getVisibleContacts}
              onDeleteContact={deleteContact}
            />
          </>
        )}
      </Section>
    </div>
  );
};
