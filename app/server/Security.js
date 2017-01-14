Meteor.publish('phrases', function() {
    return Phrases.find();
});

Meteor.publish('settings', function() {
    return Settings.find();
});
