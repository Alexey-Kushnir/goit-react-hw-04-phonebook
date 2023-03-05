import PropTypes from 'prop-types';
import { Formik } from 'formik';
import React from 'react';
import {
  Container,
  InputName,
  InputValue,
  SubmitButton,
} from './ContactsInput.styled';

export const ContactsInput = ({ onSubmit }) => {
  return (
    <Formik initialValues={{ name: '', number: '' }} onSubmit={onSubmit}>
      <Container autoComplete="off">
        <InputName htmlFor={'name'}>Name</InputName>
        <InputValue
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <InputName htmlFor={'number'}>Number</InputName>
        <InputValue
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <SubmitButton type="submit">Ad contact</SubmitButton>
      </Container>
    </Formik>
  );
};

ContactsInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
