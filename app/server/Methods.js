Meteor.methods({
  'checkTranslation'(translatedText, phraseId){
    var phrase = Phrases.findOne(phraseId);
    var expression = '';
    for(var a = 0; a < phrase.en.length; a ++){
      expression = expression + '('+phrase.en[a]+')|';
    }
    expression = expression.substring(0, expression.length - 1);
    var rex = new RegExp(expression,"gi");
    if(rex.test(translatedText)){
      return true;
    }else{
      return false;
    }
  },
});
