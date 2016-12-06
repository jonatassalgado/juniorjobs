

FlowRouter.route('/', {
  action: (params, queryParams) => {
    BlazeLayout.render('newsfeed');
  }
});

FlowRouter.route('/events/:eventId', {
  name: 'eventShow',
  action: (params, queryParams) => {
    BlazeLayout.render('newsfeed_event', { content: [] });
  }
});
