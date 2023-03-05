import PropTypes from 'prop-types';
import { ContactItem, DeleteButton } from './ContactsItem.styled';

export const Contact = ({ id, name, number, onDeleteContact }) => {
  return (
    <ContactItem key={id}>
      {name}: {number}
      <DeleteButton type="button" onClick={() => onDeleteContact(id)}>
        Delete
      </DeleteButton>
    </ContactItem>
  );
};

Contact.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
