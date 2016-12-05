import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Jobs } from '../api/jobs.js';

import './job.js';
import './body.html';


showCompleted =  () => {
  const instance = Template.instance();
  return instance.state.get('hideCompleted');
}

Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

Template.body.helpers({
  jobs() {
    const instance = Template.instance();
    if (instance.state.get('hideCompleted')) {
      return Jobs.find({ checked: { $ne: true }}, { sort: { createdAt: -1 }});
    }
    return Jobs.find({}, { sort: { createdAt: -1 } });
  },
  numberOfJobs() {
    return Jobs.find({}).count();
  }
});

Template.body.events({
  'submit .new-job' (event) {
    event.preventDefault();

    const target = event.target;
    const text = target.text.value;

    Jobs.insert({
      title: text,
      createdAt: new Date(),
    })

    target.text.value = '';
  },
  'change .hide-completed input' (event, instance) {
    instance.state.set('hideCompleted', event.target.checked);
  }
})
