import { Meteor } from 'meteor/meteor';
import { Contacts } from '../../api/contacts/contacts.js';

Meteor.publish('Contacts', function publishContactsData() {
  return Contacts.find();
});