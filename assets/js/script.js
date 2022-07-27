// Variables
var timerEl = document.querySelector('.timer')
var titleEl = document.querySelector('.title');
var textEl = document.querySelector('.text-content');
var startButtonEl = document.querySelector('.start-button');
var multiButtonEl = document.querySelector('.multi-button');
var choiceButtonsEl = document.querySelector('.choice-buttons');
var feedbackEl = document.querySelector('.quiz-feedback');
var inputEl = document.querySelector(".input-group");
var submitBtnEl = document.querySelector("#submit-btn");

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
var correctAnswer = 0;
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
    for (var i = 0; i < 4; i++) {
        choiceButtonsEl.children[i].setAttribute("style","display: block");
    }
    newQuestion();

    // set text of timer to starting value
    timerEl.textContent = seconds;
 
    // start the countdown
    countdown = setInterval(function () {
      seconds--,
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
        return;
    }
    shuffle(answerOrder);
    // Set text of current question
    textEl.textContent = questions[questionOrder[currentQuestion]];

    // Set answers of current question, if the randomized index of current question is 0, then set it as the correct answer
    for (var i = 0; i < answerOrder.length; i++) {
        var currentButton = choiceButtonsEl.children[i];
        var currentAnswer = choiceButtonsEl.children[i].children[0];
        // if the current answer in the order is the correct one 
        // (originally index 0 before random), set the answer attr to right
        if (answerOrder[i] === 0) {
            currentButton.setAttribute("answer","right");
            // Store the correct button for later use
            correctAnswer = currentButton;
        }
        currentAnswer.textContent = answers[questionOrder[currentQuestion]][answerOrder[i]];
    }
}

function endGame() {
    // stop timer
    clearInterval(countdown);
    
    // end screen text
    titleEl.setAttribute("style","display: block");
    titleEl.textContent = "All Done!";
    textEl.textContent = "Your final score was: " + seconds;
    
    // remove multiple choice buttons
    for (var i = 0; i < 4; i++) {
        choiceButtonsEl.children[i].setAttribute("style","display: none");
    }

    // show input initials
    inputEl.setAttribute('style',"display:block");
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
    if (clickedButton.matches("span")) {
        clickedButton = clickedButton.closest('button');
    } 
    
    // Makes sure to only proceed if a button is clicked and detected 
    if (clickedButton.matches("button")) {
        var chosenAnswer = clickedButton.getAttribute("answer");
        console.log(chosenAnswer);
        if (chosenAnswer === "right") {
            clickedButton.setAttribute('answer','wrong');
            currentQuestion++;
            showFeedback("Correct!");
            newQuestion();
        } else if (chosenAnswer === "wrong"){
            correctAnswer.setAttribute('answer','wrong');
            currentQuestion++;
            showFeedback("Wrong!");
            newQuestion();
        }
    } 
})

function showFeedback(string) {
    // set text
    feedbackEl.textContent = string;
    
    // set the feedback opacity to 1
    feedbackEl.setAttribute("style","opacity: 1");

    // then, after 1 second, set it back to 0
    var feedbackSeconds = 10;
    feedbackTimer = setInterval(function () {
        feedbackSeconds--;
        if (feedbackSeconds === 0) {
            feedbackEl.setAttribute("style","opacity: 0");
            clearInterval(feedbackTimer);
        }
      }, 100);
}

submitBtnEl.addEventListener('click', function (event) {
    var initials = document.querySelector('#initials').value;
    if (initials == '') {
        showFeedback("Please enter initials to save highscore.");
    } else {
        localStorage.setItem('newHighScore', 'initials' + ': ' + 'score');
    }  
})




