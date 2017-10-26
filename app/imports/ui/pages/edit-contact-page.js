import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { _ } from 'meteor/underscore';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Contacts, ContactsSchema } from '../../api/contacts/contacts.js';

/* eslint-disable no-param-reassign */

const displayErrorMessages = 'displayErrorMessages';

Template.Edit_Contact_Page.onCreated(function onCreated() {
  this.subscribe('Contacts');
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displayErrorMessages, false);
  this.context = ContactsSchema.namedContext('Edit_Contact_Page');
  this.state = new ReactiveDict();
  this.state.set('action_selected', 'default');
});

Template.Edit_Contact_Page.helpers({
  contactDataField(fieldName) {
    const contactData = Contacts.findOne(FlowRouter.getParam('_id'));
    return contactData && contactData[fieldName];
  },
  errorClass() {
    return Template.instance().messageFlags.get(displayErrorMessages) ? 'error' : '';
  },
  fieldError(fieldName) {
    const invalidKeys = Template.instance().context.validationErrors();
    const errorObject = _.find(invalidKeys, (keyObj) => keyObj.name === fieldName);
    return errorObject && Template.instance().context.keyErrorMessage(errorObject.name);
  },
});


Template.Edit_Contact_Page.events({
  'click #contact-data-form-edit': function (event, instance) {
    instance.state.set('action_selected', event.target.id);
  },
  'click #contact-data-form-delete': function (event, instance) {
    instance.state.set('action_selected', event.target.id);
  },
  'submit .contact-data-form': function (event, instance) {
    if (instance.state.get('action_selected') === 'contact-data-form-edit') {
      event.preventDefault();
      // Get name (text field)
      const first = event.target.First.value;
      const last = event.target.Last.value;
      const address = event.target.Address.value;
      const telephone = event.target.Telephone.value;
      const email = event.target.Email.value;

      const updatedContactData = {
        first, last, address, telephone, email,
      };
      // Clear out any old validation errors.
      instance.context.reset();
      // Invoke clean so that newStudentData reflects what will be inserted.
      const cleanData = ContactsSchema.clean(updatedContactData);
      // Determine validity.
      instance.context.validate(cleanData);
      if (instance.context.isValid()) {
        const id = Contacts.update(FlowRouter.getParam('_id'), { $set: updatedContactData });
        instance.messageFlags.set(displayErrorMessages, false);
        FlowRouter.go('Home_Page');
      } else {
        instance.messageFlags.set(displayErrorMessages, true);
      }
    } else if (instance.state.get('action_selected') === 'contact-data-form-delete') {
      Contacts.remove({ _id: FlowRouter.getParam('_id') });
      FlowRouter.go('Home_Page');
    } else {
      console.log('How did we submit without pressing a button?');
      FlowRouter.go('Home Page');

      event['#contact-data-form-delete-modal'].modal({
          onDeny() {
            console.log('canceled');
            return false;
          },
          onApprove() {
            const modalInputValue = $('#modalInputValue').val();
            Session.set('formValue', modalInputValue);
          },
        })
        .modal('show');
    }

    /*
    Contacts.remove({ _id: FlowRouter.getParam('_id') });
    instance.messageFlags.set(displayErrorMessages, false);
    FlowRouter.go('Home_Page');
    */
  },
});

