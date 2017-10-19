import { Contacts } from '../../api/contacts/contacts.js';
import { _ } from 'meteor/underscore';

/**
 * A list of Stuff to pre-fill the Collection.
 * @type {*[]}
 */
const contactsSeeds = [
  {
    first: 'Andre',
    last: 'Meda',
    address: '1089 Bishop St. Honolulu, HI',
    telephone: '808-422-2223',
    email: 'andremeda@whothis.com'
  },
  {
    first: 'Milky',
    last: 'Way',
    address: '123 Space Rd. Houston, TX',
    telephone: '281-346-7138',
    email: 'da-galaxy@you.me'
  },
  {
    first: "C'thum",
    last: "N'Zoss",
    address: '666 Nibiru Way Helltown, OH',
    telephone: '000-683-4637',
    email: 'their-evrywhare@old.go.ds'
  },
  {
    first: "Carly",
    last: "Myanohand-Geronimo",
    address: '1337 Code Rd. Honolulu, HI',
    telephone: '000-123-4567',
    email: 'not-your-business@code.de'
  },
];

/**
 * Initialize the Contacts collection if empty with seed data.
 */
if (Contacts.find().count() === 0) {
  _.each(contactsSeeds, function seedContacts(contact) {
    Contacts.insert(contact);
  });
}
