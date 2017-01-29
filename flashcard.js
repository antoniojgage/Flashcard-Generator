//Required packages
var inquirer = require("inquirer");
var fs = require("fs");
//Load question files
var basicCard = require("./superHero.js");
var clozeCard = require("./familyGuy.js");

var count = 0;
var score = 0;

startgame();

var askQuestion = function () {

  if (count < basicCard.basicQuestions.length) {
    inquirer.prompt([{
      name: "input",
      message: basicCard.basicQuestions[count].front
    }]).then(function (answers) {
      if (answers.input === basicCard.basicQuestions[count].back) {
        console.log("Awesome! Keep going!");
        score++;
      } else {
        console.log("Wrong...The correct answer is " + basicCard.basicQuestions[count].back + " Current score is = " + score);
      }
      count++;
      askQuestion();
    });
  } else {
    var gameOver = true;
    count = 0;
    if (gameOver === true) {
      inquirer.prompt([{
        type: "list",
        name: "game",
        message: "Your Score was " + score + " answers correct\n  Would you like to try again?",
        choices: ["Yes", "No"]
      }]).then(function (answer) {
        if (answer.game === "Yes") {
          startgame();
          endGame = false;
        } else {
          console.log("I know you want to leave me but i refuse to let you go!");
        }
      });
    }
  }
}

var askCloze = function () {
  if (count < clozeCard.clozeQuestions.length) {
    inquirer.prompt([{
      name: "input",
      message: clozeCard.clozeQuestions[count].text + "_"
    }]).then(function (answers) {
      if (answers.input === clozeCard.clozeQuestions[count].cloze) {
        console.log("Great job! Hard question..");
        score++;
      } else {
        console.log("Nah! The correct answer is " + clozeCard.clozeQuestions[count].text);
      }
      count++;
      askCloze();
    });
  } else {

    var gameOver = true;
    count = 0;
    if (gameOver === true) {
      inquirer.prompt([{
        type: "list",
        name: "game",
        message: "Your Score was " + score + " answers correct\n  Would you like to try again?",
        choices: ["Yes", "No"]
      }]).then(function (answer) {
        if (answer.game === true) {
          startgame();
          endGame = false;
        } else {
          console.log("Come back again for more fun!");
        }
      });
    }
  }
}

var startgame = function () {
  count = 0;
  score = 0;
  inquirer.prompt([{
    type: "list",
    message: "Choose from the Following:",
    choices: ["Basic", "Cloze"],
    name: "chooseType"
  }]).then(function (answers) {
    if (answers.chooseType === "Basic") {
      askQuestion();
    } else {
      askCloze();
    }
  });
}

//Create super hero card
function BasicCard(front, back) {
  console.log("Super hero card")
  this.front = front;
  this.back = back;
};

//Create family guy card
function ClozeCard(text, cloze) {
  this.text = text;
  this.cloze = cloze;
};