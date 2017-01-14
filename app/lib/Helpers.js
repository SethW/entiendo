Helpers = {};

Helpers.randomInt = function(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

Helpers.congratsMessages = [
  'You got it!',
  'That is right!',
  'Correct!',
  'Way to go!'
];

Helpers.incorrectMessages = [
  'Sorry. ',
  'That is incorrect. ',
  'Nope. ',

];


Helpers.congrats = function(){
  return Helpers.congratsMessages[Helpers.randomInt(0, Helpers.congratsMessages.length-1)];
};

Helpers.incorrect = function(){
  return Helpers.incorrectMessages[Helpers.randomInt(0, Helpers.incorrectMessages.length-1)];
};

Helpers.randomPhrase = function(level){
  var gatherPhrases = Phrases.find({difficulty: level}).fetch();
  return gatherPhrases[Helpers.randomInt(0, gatherPhrases.length-1)]._id;
};
