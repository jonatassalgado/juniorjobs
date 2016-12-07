import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Events } from '../api/events.js';

import './event.html';

Template.Event.onCreated(function eventOnCreated() {
  this.autorun(() => {
    let eventId = FlowRouter.getParam('eventId');
    this.subscribe('singleEvent', eventId);
  })
})

Template.Event.helpers({
  event() {
    const eventId = FlowRouter.getParam('eventId');
    const event = Events.findOne({_id: eventId}) || {};
    return event;
  }
})
