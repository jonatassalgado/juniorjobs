import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Events } from '../api/events.js';

import './event.html';

Template.event.helpers({
  'isOwner' () {
    return this.owner === Meteor.userId();
  },
})

Template.event.events({
  'click .toggle-checked' () {
    Events.update(this._id, {
      $set: { checked: ! this.checked },
    });
  },
  'click .delete' () {
    Meteor.call('events.remove', this._id);
  },
  'click .toggle-private' () {
    Meteor.call('events.setPrivate', this._id, !this.private)
  }
})
