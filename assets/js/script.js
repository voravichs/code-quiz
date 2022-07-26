// Variables
var timerEl = document.querySelector('.timer')
var titleEl = document.querySelector('.title');
var textEl = document.querySelector('.text-content');
var startButtonEl = document.querySelector('.start-button');
var multiButtonEl = document.querySelector('.multi-button');
var choiceButtonsEl = document.querySelector('.choice-buttons');
var button1El = document.querySelector('#button-1');
var button2El = document.querySelector('#button-2');
var button3El = document.querySelector('#button-3');
var button4El = document.querySelector('#button-4');
var answer1El = document.querySelector('#answer-1');
var answer2El = document.querySelector('#answer-2');
var answer3El = document.querySelector('#answer-3');
var answer4El = document.querySelector('#answer-4');


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
var questionOrder = [0,1,2,3,4];
var answerOrder = [0,1,2,3];
var currentQuestion = 0;
var seconds = 0;


// When you click the start button, start the game
startButtonEl.addEventListener('click', function () {
  
    // Initialize Variables, randomize question order
    seconds = 90;
    shuffle(questionOrder);

    // remove the start button and title, display multiple choice, show a new question
    titleEl.setAttribute("style","display: none");
    startButtonEl.setAttribute("style","display: none");
    button1El.setAttribute("style","display: block");
    button2El.setAttribute("style","display: block");
    button3El.setAttribute("style","display: block");
    button4El.setAttribute("style","display: block");
    newQuestion();

    // set text of timer to starting value
    timerEl.textContent = seconds;
 
    // start the countdown
    countdown = setInterval(function () {
      seconds = seconds - 1;
      timerEl.textContent = seconds;
  
      // game over if seconds = 0
      if (seconds == 0) {
        endGame();
      }
    }, 1000);
});

function newQuestion() {
    if (currentQuestion > questions.length-1) {
        endGame();
    }
    answerOrder = [0,1,2,3];
    shuffle(answerOrder);
    // Set text of current question
    textEl.textContent = questions[questionOrder[currentQuestion]];

    // Set answers of current question, if the randomized index of current question is 0, then set it as the correct answer
    for (var i = 0; i < answerOrder.length; i++) {
        var currentButton = eval("button" + (i+1) + "El");
        var currentAnswer = eval("answer" + (i+1) + "El");
        if (answerOrder[i] === 0) {
            currentButton.setAttribute("answer","right");
        }
        currentAnswer.textContent = answers[questionOrder[currentQuestion]][answerOrder[i]];
    }
}

function endGame() {
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


choiceButtonsEl.addEventListener('click', function(event) {
    let clickedButton = event.target;
    // Find the button if span is clicked
    clickedButton = clickedButton.closest('button');

    if (clickedButton.matches("button")) {
        var chosenAnswer = clickedButton.getAttribute("answer");
        console.log(chosenAnswer);
        
        if (chosenAnswer === "right") {
            clickedButton.setAttribute('answer','wrong');
            currentQuestion++;
            newQuestion();
        }
    } 
});

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