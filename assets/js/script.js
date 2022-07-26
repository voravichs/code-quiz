// Variables
var timerEl = document.querySelector('.timer')
var titleEl = document.querySelector('.title');
var textEl = document.querySelector('.text-content');
var startButtonEl = document.querySelector('.start-button');
var multiButtonEl = document.querySelector('.multi-button');
var choiceButtonsEl = document.querySelector('.choice-buttons');
var buttonAEl = document.querySelector('#button-a');
var buttonBEl = document.querySelector('#button-b');
var buttonCEl = document.querySelector('#button-c');
var buttonDEl = document.querySelector('#button-d');
var answerAEl = document.querySelector('#answer-a');
var answerBEl = document.querySelector('#answer-b');
var answerCEl = document.querySelector('#answer-c');
var answerDEl = document.querySelector('#answer-d');


questions = 
    ["AAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
    "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB",
    "CCCCCCCCCCCCCCCCCCCCCCCCCCCCCC",
    "DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "EEEEEEEEEEEEEEEEEEEEEEEEEEEEEE"];
answers =  
    [["E","F","G","H"],
    ["E","F","G","H"],
    ["E","F","G","H"],
    ["E","F","G","H"],
    ["E","F","G","H"]];
correctAnswers = ["E","E","E","E","E"];
var questionOrder = [0,1,2,3,4];
var answerOrder = [0,1,2,3];
currentQuestion = 0;
seconds = 0;


// When you click the start button, start the game
startButtonEl.addEventListener('click', function () {
  
    // Initialize Variables, randomize question order
    seconds = 5;
    shuffle(questionOrder);

    // remove the start button and title, display multiple choice, show a new question
    titleEl.setAttribute("style","display: none");
    startButtonEl.setAttribute("style","display: none");
    buttonAEl.setAttribute("style","display: block");
    buttonBEl.setAttribute("style","display: block");
    buttonCEl.setAttribute("style","display: block");
    buttonDEl.setAttribute("style","display: block");
    newQuestion();

    // set text of timer to starting value
    timerEl.textContent = seconds;
 
    // start the countdown
    countdown = setInterval(function () {
      seconds = seconds - 1;
      timerEl.textContent = seconds;
  
      // game over if seconds = 0
      if (seconds == 0) {
        gameOver();
      }
    }, 1000);
});

function newQuestion() {
    currentQuestion++;
    answerOrder = [0,1,2,3];
    shuffle(answerOrder);
    textEl.textContent = questions[questionOrder[currentQuestion]];
    answerAEl.textContent = answers[questionOrder[currentQuestion]][answerOrder[0]];
    answerBEl.textContent = answers[questionOrder[currentQuestion]][answerOrder[1]];
    answerCEl.textContent = answers[questionOrder[currentQuestion]][answerOrder[2]];
    answerDEl.textContent = answers[questionOrder[currentQuestion]][answerOrder[3]];
}

function gameOver() {
    clearInterval(countdown);
    seconds = 0;
    currentQuestion = 0;
    questionOrder = [0,1,2,3,4];
}

// Implementing Fisher-Yates Shuffle, courtesy of 
// https://javascript.info/task/shuffle and
// https://sebhastian.com/fisher-yates-shuffle-javascript/
function shuffle(array){    
    for (let i = array.length - 1; i >= 0; i--) {
        // select random index from 1 to i
        let j = Math.floor(Math.random() * (i + 1));
 
        // swap that random element with the last index, i
        [array[i], array[j]] = [array[j], array[i]];
    }
}


/*choiceButtonsEl.addEventListener('click', function(event) {
    let clickedButton = event.target;

    if (clicked.matched("multi-button")) {

    }
});*/

// initialize starting variables
//      set the initial starting seconds
//      display those seconds
// start countdown
//      interval function that counts seconds down
// game over when seconds = 0
//      gameOver function
// display question and multiple choice buttons
//      newQuestion function
//          replace content of text-content with the question
//          show the multi buttons
//          set the right answer
// click handler for multi choice buttons to progress the game
//      display right or wrong depending on question
//      renderQuestion function again