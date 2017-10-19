import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

/* eslint-disable object-shorthand */

export const Contacts = new Mongo.Collection('Contacts');

/**
 * Create the schema for Stuff
 */
export const ContactsSchema = new SimpleSchema({
  first: {
    label: 'First Name',
    type: String,
    optional: false,
    max: 80,
  },
  last: {
    label: 'Last Name',
    type: String,
    optional: false,
    max: 80,
  },
  telephone: {
    label: 'Telephone',
    type: String,
    optional: false,
    regEx: /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/
  },
  address: {
    label: 'Address',
    type: String,
    optional: false,
  },
  email: {
    label: 'Email',
    type: String,
    optional: false,
    regEx: SimpleSchema.RegEx.Email,
  }
});

Contacts.attachSchema(ContactsSchema);
