Template.question.helpers({
  pickPhrase(phraseOptions){
    var phraseVersion = Helpers.randomInt(0,phraseOptions.length-1);
    Session.set('phraseVersion', phraseVersion);
    Session.set('phraseOptions', phraseOptions);
  },
  getPhrase(phraseOptions){
    return phraseOptions[Session.get('phraseVersion')];
  },
  getDifficulty(){
    if(!Session.get('difficulty')){
      Session.set('difficulty', 1);
      return 1;
    }else {
      return Session.get('difficulty');
    }
  },
  invokeAfterLoad(){
    setTimeout(function(){
      $('#listenPhrase').click();
      //responsiveVoice.speak(Session.get('phraseOptions')[Session.get('phraseVersion')], "Spanish Latin American Female", {rate: 1});

      var listener = document.querySelector('#recognition-element');
      listener.start();
      listener.addEventListener('result', function(e) {
        console.log(e.detail.result);
        $('#translateInput').val(e.detail.result);
        $('#translateForm').submit();
      });

      listener.addEventListener('end', function(e) {
        listener.start();
      });

    }, 1200);

  }

});

Template.question.events({
  'click .show-phrase': function (eve, instance){
    $('.phrase h4').toggleClass('hidden');
  },
  'click #listenPhrase': function (eve, instance){
    eve.preventDefault();
    var listener = document.querySelector('#recognition-element');
    listener.stop();
    var $this = $(eve.currentTarget);
    responsiveVoice.speak($this.attr('data-text'), "Spanish Latin American Female", {rate: 1});

  },
  'submit #translateForm': function(eve, instance) {
    eve.preventDefault();
    var $this = $(eve.currentTarget);
    var translatedText = $this.find('#translateInput').val();
    var phraseId = $this.find('#phraseId').val();

    var isSpecialCommand = new RegExp('(set difficulty)|(set the difficulty)|(say again)|(say that again)|(say it again)',"gi");
    if(isSpecialCommand.test(translatedText)){ // Special command
      var isDifficulty = new RegExp('(set difficulty)|(set the difficulty)',"gi");
      var isRepeat = new RegExp('(say again)|(say that again)|(say it again)',"gi");

      if(isDifficulty.test(translatedText)){ // Change difficulty
        $this.find('#translateInput').val('');
        var getLevel = new RegExp('[0-9]+',"gi");
        Session.set('difficulty', parseInt(translatedText.match(/[0-9]+/gi)[0]));
      }else if(isRepeat.test(translatedText)){ // Say again
        $this.find('#translateInput').val('');
        $('#listenPhrase').click();
      }
    }else{

      Meteor.call('checkTranslation', translatedText, phraseId, function(err, result){
        var message;
        var listener = document.querySelector('#recognition-element');
        $this.find('#translateInput').val('');
        if(result){
          message = Helpers.congrats();
          responsiveVoice.speak(message, "US English Female", {rate: 1});
          Router.go('/question/'+Helpers.randomPhrase(Session.get('difficulty')));


        }else{
          var phrase = Phrases.findOne(phraseId);
          message = Helpers.incorrect()+" The correct answer is. "+phrase.en[0];
          //message = phrase.en[0];
          responsiveVoice.speak(message, "US English Female", {rate: 1});
          setTimeout(function(){
            Router.go('/question/'+Helpers.randomPhrase(Session.get('difficulty')));
          }, 4000);

        }
      });

    }
  },
});
