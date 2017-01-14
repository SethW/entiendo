Template.question.helpers({
  pickPhrase(phraseOptions){
    var phraseVersion = Helpers.randomInt(0,phraseOptions.length-1);
    Session.set('phraseVersion', phraseVersion);
    Session.set('phraseOptions', phraseOptions);
    console.log(phraseOptions[phraseVersion]);
  },
  getPhrase(phraseOptions){
    return phraseOptions[Session.get('phraseVersion')];
  }

});

Template.question.rendered = function() {
  //$('#voice-es').speak();
  //var esVoice = document.querySelector('#voice-es');
  //esVoice.speak();
  /*var listener = document.querySelector('#recognition-element');
  listener.start();
  listener.addEventListener('result', function(e) {
    console.log(e.detail.result);
  });*/
  setTimeout(function(){
    //responsiveVoice.speak(Session.get('phraseOptions')[Session.get('phraseVersion')], "Spanish Latin American Female", {rate: 1});
  }, 500);

};

Template.question.events({
  'submit #translateForm': function(eve, instance) {
    eve.preventDefault();
    var $this = $(eve.currentTarget);
    var translatedText = $this.find('#translateInput').val();
    var phraseId = $this.find('#phraseId').val();
    Meteor.call('checkTranslation', translatedText, phraseId, function(err, result){
      var message;
      $this.find('#translateInput').val('');
      if(result){
        message = Helpers.congrats();
        //responsiveVoice.speak(message, "US English Female", {rate: 1});
        setTimeout(function(){
          Router.go('/question/'+Helpers.randomPhrase(1));
        }, 1000);
      }else{
        var phrase = Phrases.findOne(phraseId);
        //message = Helpers.incorrect()+" The correct answer is. "+phrase.en[0];
        message = phrase.en[0];
        //responsiveVoice.speak(message, "US English Female", {rate: 1});
        setTimeout(function(){
          Router.go('/question/'+Helpers.randomPhrase(1));
        }, 5000);
      }
    });
  },
});
