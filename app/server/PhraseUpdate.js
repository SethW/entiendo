Meteor.startup(function () {
  var yaml = require('yaml-js');
  var phrasesText = Assets.getText('phrases.yaml');
  try {
    phrases = yaml.load(phrasesText);
  } catch(e) {
    console.log(e);
    console.log(`ERROR IMPORTING phrases.yaml.  Please check the yaml is valid: http://www.yamllint.com/`);
    process.exit(1);  // Hard fail
  }
  phrases.phrases.forEach(function(phrase) {
    const random = Random.fraction();
    phrase.rand = random;
    try {
      Schemas.Phrases.validate(phrase);
    } catch(e) {
      console.log(`ERROR IMPORTING ${phrase}.  This phrase is invalid.  See below:`);
      console.log(e);
      process.exit(1);  // Hard fail
    }


    var oldPhrase = Phrases.findOne(phrase._id);
    if(oldPhrase){
      oldPhrase.rand = random;
    }

    if (JSON.stringify(phrase) !== JSON.stringify(oldPhrase)) {
      Phrases.remove(phrase._id);

      Phrases.insert(phrase);
      console.log(`PHRASE UPDATED ${phrase._id}`);
    }

  });

});
