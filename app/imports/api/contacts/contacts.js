import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

/* eslint-disable object-shorthand */

export const Contacts = new Mongo.Collection('Contacts');

/**
 * Create the schema for Stuff
 */
export const ContactsSchema = new SimpleSchema({
  first: {
    label: 'first',
    type: String,
    optional: false,
    max: 80,
  },
  last: {
    label: 'last',
    type: String,
    optional: false,
    max: 80,
  },
  telephone: {
    label: 'telephone',
    type: String,
    optional: false,
    regEx: /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/
  },
  address: {
    label: 'address',
    type: String,
    optional: false,
  },
  email: {
    label: 'email',
    type: String,
    optional: false,
    regEx: SimpleSchema.RegEx.Email,
  }
});

Contacts.attachSchema(ContactsSchema);
