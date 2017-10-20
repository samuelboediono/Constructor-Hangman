var inquirer = require('inquirer');
var isLetter = require('is-letter');

var Word = require('./word.js');
var Game = require('./wordBank.js');



var hangman = {
  wordBank: Game.newWord.wordList,
  guessesRemaining: 10,
  guessedLetters: [],
  display: 0,
  currentWord: null,

  startGame: function() {
    var that = this;

    if(this.guessedLetters.length > 0) {
      this.guessedLetters = [];
    }

    inquirer.prompt([{
      name: "play",
      type: "confirm",
      message: "Are you ready to play?"
    }]).then(function(answer) {
      if(answer.play) {
        that.newGame();
      } else{
        console.log("Fine, I will not play ever again!!!");
      }
    })
  },

  newGame: function() {
    if(this.guessesRemaining === 10) {
      console.log("Okay! Let's do this!");
      console.log("--------------------");

      var randNum = Math.floor(Math.random() * this.wordBank.length);
      this.currentWord = new Word(this.wordBank[randNum]);
      this.currentWord.getStarted();

      console.log(this.currentWord.wordRender());
      this.promptingUser();
    } 
    else {
      this.resetGuesses();
      this.newGame();
    }
  },

  resetGuesses: function() {
    this.guessesRemaining = 10;
  },

  promptingUser: function() {
    var that = this;

    inquirer.prompt([{
      name: "chosenLetter",
      type: "input",
      message: "Choose a letter: ",

      validate: function(value) {
        if(isLetter(value)) {
          return true;
        } 
        else {
          return false;
        }
      }
    }]).then(function(ltr) {
      var letterReturned = (ltr.chosenLetter).toUpperCase();
      var guessedAlready = false;
        for(var i = 0; i < that.guessedLetters.length; i++) {
          if(letterReturned === that.guessedLetters[i]) {
            guessedAlready = true;
          }
        }
       
        if(guessedAlready === false) {
          that.guessedLetters.push(letterReturned);

          var found = that.currentWord.letterFound(letterReturned);

          if(found === 0) {
            console.log("Sorry! You guessed wrong.");
            that.guessesRemaining--;
            that.display++;
            console.log("Guesses remaining: " + that.guessesRemaining);

            console.log("==================================");
            console.log(that.currentWord.wordRender());
            console.log("==================================");

            console.log("Letters guessed: " + that.guessedLetters);
          } 
          else {
            console.log("Correct! You guessed right!");
          
              if(that.currentWord.wordFinder() === true) {
                console.log(that.currentWord.wordRender());
                console.log("Congratulation! You won the game!");
              } 
              else {
                console.log("Guesses remaining: " + that.guessesRemaining);
                console.log(that.currentWord.wordRender());
                console.log("============================================");
                console.log("Letters guessed: " + that.guessedLetters);
              }
          }

          if(that.guessesRemaining > 0 && that.currentWord.wordFound === false) {
            that.promptingUser();
          }
          else if(that.guessesRemaining === 0) {
            console.log("Game Over!!!");
            console.log("The word you were guessing was: " + that.currentWord.word);
          }
        } 
        

        else {
            console.log("You have guessed that letter before. Try again.")
            that.promptingUser();
          }
    });
  }
}

hangman.startGame();
