var questions = [
  {
    question: "How did Michael lose his college tuition money?",
    choices: ["He started a business that failed", "He bought a bunch of TV's", "He bought a fancy car", "He invested in a pyramid scheme"],
    answer: "He invested in a pyramid scheme",
  },
  {
    question:
      "What is the name of the award that Michael grants his employees yearly?",
    choices: ["The Mifflins", "The Dundies", "The Michaels", "The Scottsies"],
    answer: "The Dundies",
  },
  {
    question:
      "Whats written on Michaels famous mug?",
    choices: ["Amazing Boss", "Wake up & smell the coffee", "World's Best Boss", "Paper rules"],
    answer: "World's Best Boss",
  },
  {
    question:
      "What is the title of Michael's self-penned action movie?",
    choices: ["Threat Level:Zero Dawn", "Midnight Threat", "Threat Level Midnight", "The Ultimatum"],
    answer: "Threat Level Midnight",
  },
  {
    question:
      "What four words make up Michael's favorite joke?",
    choices: ["That's what he said!", "Obamalone? Obamaself", "Seal walks into a club", "That's what she said!"],
    answer: "That's what she said!",
  },

];

var questionEl = document.querySelector("#question");
var optionListEl = document.querySelector("#option-list");
var questionResultEl = document.querySelector("#question-result");
var timerEl = document.querySelector("#timer");
//creating a variable for button and when clicked then execute quiz.
var homePageEl = document.querySelector("#homepage");
var startButton = document.querySelector("#button");
var divEl = document.querySelector("#scoreList"); // div from highScores.html

var questionIndex = 0;
var correctCount = 0;
var intervalID;
var time = 30;
var timerID;

function startQuiz() {
  homePageEl.classList.add('hide');
  timerID = setInterval(updateTime, 1000);
  timerEl.textContent = time;
  renderQuestion();
}

function updateTime() {
  //decrement time...if time is 0 end quiz
  time--;
  timerEl.textContent = time;
  if (time <= 0) {
    endQuiz();
  }
}

function renderQuestion() {
  var currentQuestion = questions[questionIndex];
  questionEl.textContent = currentQuestion.question;

  optionListEl.innerHTML = "";
  questionResultEl.innerHTML = "";

  var choices = currentQuestion.choices;
  var choicesLength = choices.length;

  for (var i = 0; i < choicesLength; i++) {
    var questionListItem = document.createElement("li");
    questionListItem.textContent = choices[i];
    optionListEl.append(questionListItem);
  }
}

function checkAnswer(event) {
  //checks answer
  //pause timer
  clearInterval(intervalID);

  var target = event.target;

  if (target.matches("li")) {
    var answer = target.textContent;

    if (answer === questions[questionIndex].answer) {
      questionResultEl.textContent = "Correct";
      correctCount++;
    } else
      questionResultEl.textContent = "Wrong";
    time -= 2;
    if (correctCount <= 0) {
      correctCount--;
    }


  }
  setTimeout(nextQuestion, 1000); //after 2 seconds it will execute next question
}

function nextQuestion() {
  //renders next question
  questionIndex++;
  //when all question are asked, end quiz
  if (questionIndex === questions.length) {
    endQuiz();
  }
  renderQuestion();
}


function endQuiz() {
  //clear interval
  //update DOM to indicate game is over
  clearInterval(intervalID);
  var body = document.body;
  body.textContent = "All Done! Your Michael Scott knowledge scored " + correctCount; // style this 
  body.setAttribute("style", "font-size: 30px");

  setTimeout(saveHighScore, 1000)
}


function saveHighScore() {
  var name = prompt("Enter your name");
  alert("Hope you had fun " + name + "!");
  window.location.href = "highScores.html";


  var high_score = JSON.parse(localStorage.getItem("high_score")) || [];

  var user = {
    name: name,
    score: correctCount
  }
  //here we are pushing the highscore to the user variable
  high_score.push(user);
  //after getting the localStorage, here we are SETTING it. So we can have the score list "save"
  window.localStorage.setItem('high_score', JSON.stringify(high_score));
  //window.location.href = "highScores.html";
}

optionListEl.addEventListener("click", checkAnswer);
startButton.addEventListener("click", startQuiz);
