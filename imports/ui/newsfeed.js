import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Events } from '../api/events.js';

import './newsfeed-event.js';
import './newsfeed.html';

Template.newsfeed.onCreated(function newsfeedOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('events');
});

Template.newsfeed.helpers({
  events() {
    const instance = Template.instance();
    if (instance.state.get('hideCompleted')) {
      return Events.find({ checked: { $ne: true }}, { sort: { createdAt: -1 }});
    }
    return Events.find({}, { sort: { createdAt: -1 } });
  },
  numberOfJobs() {
    return Events.find({}).count();
  }
});

Template.newsfeed.events({
  'submit .new-event' (event) {
    event.preventDefault();

    const target = event.target;
    const text = target.text.value;

    Meteor.call('events.insert', text);

    target.text.value = '';
  },
  'change .hide-completed input' (event, instance) {
    instance.state.set('hideCompleted', event.target.checked);
  }
})
