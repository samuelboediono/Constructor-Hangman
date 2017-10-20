var Letter = require('./letter.js');

function Word (word) {
  var that = this;
  this.word = word;

  this.letters = [];
  this.wordFound = false;

  this.getStarted = function() {
    for (var i = 0; i < that.word.length; i++){
      var newLetter = new Letter (that.word[i]);
      this.letters.push(newLetter);
    }
  };

  this.wordFinder = function() {
    if(this.letters.every(function(lttr) {
      return lttr.appear === true;
    })) {
      this.wordFound = true;
      return true;
    }

  };

  this.letterFound = function(guessedLetter) {
    var toReturn = 0;

    this.letters.forEach(function(lttr) {
      if(lttr.letter === guessedLetter){
        lttr.appear = true;
        toReturn++;
      }
    })
    return toReturn;
  };

  this.wordRender = function() {
    var display = '';

    that.letters.forEach(function(lttr) {
      var currentLetter = lttr.letterRender();
      display+= currentLetter;
    });
    return display;
  };
}

module.exports = Word;
