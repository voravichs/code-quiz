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
    ["Which one of these does NOT belong in the CSS Box Model?",
    "John has an index.html file and a style.css file in the same directory. What line should he put in the head so that his styles will show up in the html?",
    "An event handler targets a button instead of a whole section, despite being declared in that whole section. What concept does this situation illustrate?",
    "In which language do you call a variable by typing \n \"var: --[variableName]\"?",
    "Consider the following line of javascript code:" +
    "\n document.body.children(2).children(0)." +
    "\n What relationship does this element have with <body>, assuming that this element is singular in nature?",
    "Which of the following illustrates what a pseudoclass can do in CSS?"];

answers =  
    [["Spacing","Margin","Border","Content"],
    ["<link rel=\"stylesheet\" href=\"style.css\" />","<link rel=\"stylesheet\" href=\"./assets/css/style.css\" />","<a href=\"style.css\">Style</a>","<script src= \"style.css\"></script>"],
    ["Event Delegation","Bubbling","Capturing","Targeting"],
    ["CSS","Javascript","HTML","JQuery"],
    ["It is the 1st child of the 3rd child of <body>","It is the 1st child of the 2nd child of <body>","It is the 0th child of the 2nd child of <body>","It is none of these."],
    ["It can change a CSS property when a user hovers over the object.", "It can add differently styled text in a heading, either before or after it.", "It can change the background color of a page when a user clicks a button.", "It can animate an image by changing the attributes of an element."]];

var questionOrder = [0,1,2,3,4,5];
var answerOrder = [0,1,2,3];
var correctAnswer = 0;
var currentQuestion = 0;
var seconds = 0;


// When you click the start button, start the game
startButtonEl.addEventListener('click', function () {
  
    // Initialize Variables, randomize question order
    seconds = 120;
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
            seconds = seconds - 30;
            if (seconds <= 0) {
                seconds = 0;
                timerEl.textContent = seconds;
                endGame();
                return;
            } else {
                timerEl.textContent = seconds;
                currentQuestion++;
                showFeedback("Wrong!");
                newQuestion();
            }
        }
    } 
})

function showFeedback(string) {
    // set text
    feedbackEl.textContent = string;
    
    // set the feedback opacity to 1
    feedbackEl.setAttribute("style","opacity: 1");

    // then, after 1 second, set it back to 0
    var feedbackSeconds = 6;
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
        localStorage.setItem('newHighScore', initials + ': ' + seconds);
    }  
})




