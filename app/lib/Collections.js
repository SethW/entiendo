import 'babel-polyfill';
import SimpleSchema from 'simpl-schema';

Phrases = new Meteor.Collection('phrases');

Schemas = {};

Schemas.Phrases = new SimpleSchema({
  '_id': {
    type: String,
  },
  es: {
      type: Array,
  },
    'es.$': {
      type: String,
    },
  en: {
      type: Array,
  },
    'en.$': {
      type: String,
    },
  difficulty: {
    type: Number
  },
  rand: {
    type: Number,
    optional: true,
    autoValue: function() {
      return Random.fraction();
    }
  }
});

Phrases.attachSchema(Schemas.Phrases);







Settings = new Meteor.Collection('settings');
Schemas.Settings = new SimpleSchema({
  '_id': {
    type: String,
  },
  key: {
      type: String,
  },
  value: {
      type: String,
  },
});

Settings.attachSchema(Schemas.Settings);
