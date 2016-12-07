import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Events } from '../api/events.js';

import './newsfeed-event.html';

Template.Newsfeed_event.helpers({
  event() {
    return Events.find({ id: id });
  },
  isOwner () {
    return this.owner === Meteor.userId();
  },
  pathForEvent () {
    let event = this;
    let routeName = 'eventShow';
    return FlowRouter.path(routeName, { eventId: event._id });
  }
})

Template.Newsfeed_event.events({
  'click .toggle-checked' () {
    Events.update(this._id, {
      $set: { checked: ! this.checked },
    });
  },
  'click .delete' () {
    Meteor.call('events.remove', this._id);
  },
  'click .m-toggle-private' () {
    Meteor.call('events.setPrivate', this._id, !this.private)
  }
})
