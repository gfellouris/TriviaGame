// =============== Timer Functions - START =============== //
function start() {
  //  TODO: Use setInterval to start the count here and set the clock to running.
  if (!clockRunning) {
    clockRunning = true;
    intervalId = setInterval(count, 1000);
  }
}

function stop() {
  //  clearInterval to stop the count here and set the clock to not be running.
  clearInterval(intervalId);
  clockRunning = false;
}

function reset() {
  time = 10;
  //  TODO: Change the "display" div to "00:00."
  stop();
  $("#timer").html("00:10");
}

function count() {
  //  decrease time by 1 second
  time--;
  timeConverter(time);
  var result = timeConverter(time);
  $("#timer").html(result);
  if (time === 0) {
    timesUp();
  }
}
function timesUp() {
  stop();
  answered = true;
  wrongCount++;
  bgColor = "green";
  showMsg("Sorry, time ran out!", "alert alert-warning");
  answerMark = '<i class="fas fa-check"></i>';
  intCorrectAnswer = questionAnswer[questionSelected].choices.indexOf(
    questionAnswer[questionSelected].correctAnswer
  );
  $("#choice" + intCorrectAnswer).css("background-color", bgColor);
  $("#choice" + intCorrectAnswer).html(
    answerMark + " " + $("#choice" + intCorrectAnswer).text()
  );
  $("#wrongCount").html(wrongCount);
  loadAnswerImage("../images/timesup.gif");
  loadNextQuestion();
}

function timeConverter(t) {
  //  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
  var minutes = Math.floor(t / 60);
  var seconds = t - minutes * 60;

  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  if (minutes === 0) {
    minutes = "00";
  } else if (minutes < 10) {
    minutes = "0" + minutes;
  }

  return minutes + ":" + seconds;
}
// =============== Timer Functions - END =============== //

function loadQuestion(qa) {
  $("#question").html(questionAnswer[qa].question);
}

function loadChoices(qa) {
  //   $("#choices").empty();
  questionAnswer[qa].choices.sort(() => Math.random() - 0.5);

  for (x = 0; x < questionAnswer[qa].choices.length; x++) {
    var choice = questionAnswer[qa].choices[x];
    $("#choice" + x).attr("value", choice);
    $("#choice" + x).html(choice);
  }
}

function questionInit() {
  answered = false;
  isWinner = false;
  clockRunning = false;
  $(".choice").css("background-color", "transparent");
  $(".answer-container").css(
    "background",
    "url(assets/images/questionmark.jpg"
  );
  $(".answer-container").css("background-size", "250px 250px");
  hideMsg();
  loadQuestion(questionSelected);
  loadChoices(questionSelected);
  reset();
  start();
}

function loadNextQuestion() {
  questionSelected++;
  if (questionSelected < questionAnswer.length) {
    setTimeout(function() {
      questionInit();
    }, 5000);
  } else {
    setTimeout(function() {
      showMsg("Game over!", "alert alert-primary");
    }, 2000);
  }
}

function loadAnswerImage(img) {
  $(".answer-container").css("background", "url(assets/images/" + img);
  $(".answer-container").css("background-size", "250px 250px");
  $(".answer-container").css("opacity", "1.0");
}

function showMsg(msg, css) {
  $("#message").html(msg);
  $("#message").attr("class", css);
  $("#message").show();
}
function hideMsg() {
  $("#message").empty();
  $("#message").hide();
}
// =============== Main Section - START =============== //

//  Variable that will hold our setInterval that runs the stopwatch
var intervalId;
var clockRunning = false;
var time = 10;
var isWinner = false;
var questionSelected = 0;
var answered = false;
var correctCount = 0;
var wrongCount = 0;

var questionAnswer = [
  {
    category: "theoffice",
    question: "What type of farm does Dwight own?",
    choices: ["Beet Farm", "Bear Farm", "Carrot Farm", "Beetle Farm"],
    correctAnswer: "Beet Farm",
    image: "dwightbeetfarm.gif",
    audio: ""
  },
  {
    category: "theoffice",
    question: "How long were Pam and Roy engaged?",
    choices: ["3-4 Years", "6 Years", "3 Months", "2 Years"],
    correctAnswer: "3-4 Years",
    image: "roypam.jpg",
    audio: ""
  },
  {
    category: "theoffice",
    question: "What name did Pam and Angela fight over for their babies?",
    choices: ["Phillip", "Andrew", "James", "William"],
    correctAnswer: "Phillip",
    image: "angela.gif",
    audio: ""
  },
  {
    category: "theoffice",
    question: "Where does Jim tell Pam about his feelings?",
    choices: [
      "The office parking lot",
      "The office",
      "The warehouse",
      "Jim's Car"
    ],
    correctAnswer: "The office parking lot",
    image: "jimpamfeelings.gif",
    audio: ""
  },
  {
    category: "theoffice",
    question: "Where do Jim and Pam share their first real kiss?",
    choices: ["Jim's desk", "The roof", "The warehouse", "The park"],
    correctAnswer: "Jim's desk",
    image: "jimpamfirstkiss.gif",
    audio: ""
  }
];
window.onload = function() {
  questionInit();
  $(".choice").on("click", function() {
    if (answered) {
      // After user makes selection disable ability to keep selecting choices
      console.log("question answered - waiting for next question to load.");
    } else {
      answered = true; // User provided an answer
      stop(); // Stop the timer
      userSelection = $(this).attr("value"); // capture the user selection
      //   console.log(userSelection);
      //   console.log(questionAnswer[questionSelected].correctAnswer);

      if (userSelection === questionAnswer[questionSelected].correctAnswer) {
        correctCount++;
        var bgColor = "green";
        message = "Correct!";
        messageCSS = "alert alert-success";
        var bgImage = questionAnswer[questionSelected].image;
        var answerMark = '<i class="fas fa-check"></i>';
      } else {
        wrongCount++;
        var bgImage = "loser.gif";
        var bgColor = "red";
        message = "Wrong choice!";
        messageCSS = "alert alert-danger";
        var answerMark = '<i class="fas fa-times"></i>';
      }
      //   alert(msg);
      $(this).css("background-color", bgColor);
      $(this).html(answerMark + " " + $(this).text());
      showMsg(message, messageCSS);
      $("#wrongCount").html(wrongCount);
      $("#correctCount").html(correctCount);
      loadAnswerImage(bgImage);
      loadNextQuestion();
    }
  });
};
