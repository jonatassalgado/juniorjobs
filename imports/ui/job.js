import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Jobs } from '../api/jobs.js';

import './job.html';


Template.job.events({
  'click .toggle-checked' () {
    Jobs.update(this._id, {
      $set: { checked: ! this.checked },
    });
  },
  'click .delete' () {
    Jobs.remove(this._id);
  },
})
