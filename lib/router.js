import { Events } from '../imports/api/events.js';

FlowRouter.route('/', {
  name: 'root',
  action: (params, queryParams) => {
    BlazeLayout.render('Newsfeed');
  }
});

FlowRouter.route('/events/:eventId', {
  name: 'eventShow',
  action: (params, queryParams) => {
    BlazeLayout.render('Event');
  }
});
