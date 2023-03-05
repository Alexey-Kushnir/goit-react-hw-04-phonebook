import PropTypes from 'prop-types';
import { Contact } from 'components/ContactItem/ContactItem';

export const ContactsStorage = ({ contactList, onDeleteContact }) => {
  return (
    <ul style={{ listStyle: 'none' }}>
      {contactList.map(({ id, name, number }) => {
        return (
          <Contact
            key={id}
            id={id}
            name={name}
            number={number}
            onDeleteContact={onDeleteContact}
          />
        );
      })}
    </ul>
  );
};

ContactsStorage.propTypes = {
  contactList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
