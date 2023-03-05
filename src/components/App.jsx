import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { Section } from './Section/Section';
import { ContactsInput } from './ContactsInput/ContactsInput';
import { ContactsStorage } from './ContactsStorage/ContactsStorage';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contactList = JSON.parse(localStorage.getItem('contacts'));

    if (contactList) {
      this.setState({ contacts: contactList });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const newContacts = this.state.contacts;
    const prevContacts = prevState.contacts;

    if (newContacts !== prevContacts) {
      localStorage.setItem('contacts', JSON.stringify(newContacts));
    }
  }

  addContact = ({ name, number }, { resetForm }) => {
    // console.log(name, number, resetForm);
    // const contactName = name.toLowerCase();

    if (this.state.contacts.some(contact => contact.name === name)) {
      return alert(`${name} is already in contacts.`);
    }

    this.setState(({ contacts }) => ({
      contacts: [{ id: nanoid(8), name, number }, ...contacts],
    }));
    return resetForm();
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { addContact, changeFilter, getVisibleContacts, deleteContact } =
      this;
    const { contacts, filter } = this.state;

    return (
      <div
        style={{
          // height: '100vh',
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
                contactList={getVisibleContacts()}
                onDeleteContact={deleteContact}
              />
            </>
          )}
        </Section>
      </div>
    );
  }
}
