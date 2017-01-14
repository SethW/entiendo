Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  // Available to all routes
  waitOn: function() {
    var ret = [
      Meteor.subscribe('phrases'),
      Meteor.subscribe('settings')
    ];
    return ret;
  },
});

Router.route('/', {
  name: 'home',

});


Router.route('/question/:phraseId', {
  name: 'question',
  data: function() {
    return Phrases.findOne(this.params.phraseId);
  },

});
