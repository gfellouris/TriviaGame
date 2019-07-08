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
  $("#timer").html("00:30");
}

function count() {
  //  decrease time by 1 second
  time--;
  timeConverter(time);
  var result = timeConverter(time);
  $("#timer").html(result);
  if (time === 0) {
    timesup();
  }
}
function timesup() {
  stop();
  answered = true;
  alert("Time ran out!");
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

function checkWinner(str, qa) {
  bWinner = false;
  console.log("Passed selection:" + str);
  if (str === questionAnswer[qa].choices[0]) {
    bWinner = true;
  } else {
    bWinner = false;
  }
  return bWinner;
}

function loadChoices(qa) {
  //   $("#choices").empty();
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
  $(".answer-container").css("background-size", "300px 300px");
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
      alert("Game over!");
    }, 2000);
  }
}

function loadAnswerImage(img) {
  $(".answer-container").css("background", "url(assets/images/" + img);
  $(".answer-container").css("background-size", "300px 300px");
  $(".answer-container").css("opacity", "1.0");
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
    image: "dwightbeetfarm.gif",
    audio: ""
  },
  {
    category: "theoffice",
    question: "How long were Pam and Roy engaged?",
    choices: ["3-4 Years", "6 Years", "3 Months", "2 Years"],
    image: "roypam.jpg",
    audio: ""
  },
  {
    category: "theoffice",
    question: "What name did Pam and Angela fight over for their babies?",
    choices: ["Phillip", "Andrew", "James", "William"],
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
    image: "jimpamfeelings.gif",
    audio: ""
  },
  {
    category: "theoffice",
    question: "Where do Jim and Pam share their first real kiss?",
    choices: ["Jim's desk", "The roof", "The warehouse", "The park"],
    image: "jimpamfirstkiss.gif",
    audio: ""
  }
];

window.onload = function() {
  questionInit();

  //   if (!answered) {
  //     $(".choice").hover(
  //       function() {
  //         $(this).css("background-color", "#A49193");
  //         $(this).css("color", "#5B3346");
  //       },
  //       function() {
  //         $(this).css("background-color", "#261f1a");
  //         $(this).css("color", "#b9b6bc");
  //       }
  //     );
  //   }

  $(".choice").on("click", function() {
    if (answered) {
      // After user makes selection disable ability to keep selecting choices
      console.log("question answered - waiting for next question to load.");
    } else {
      answered = true; // User provided an answer
      stop(); // Stop the timer
      userSelection = $(this).attr("value"); // capture the user selection

      isWinner = checkWinner(userSelection, questionSelected);
      if (isWinner) {
        correctCount++;
        var bgColor = "green";
        msg = "Correct!";
        var bgImage = questionAnswer[questionSelected].image;
        var answerMark = '<i class="fas fa-check"></i>';
      } else {
        wrongCount++;
        var bgImage = "loser.gif";
        var bgColor = "red";
        msg = "Wrong choice!";
        var answerMark = '<i class="fas fa-times"></i>';
      }
      //   alert(msg);
      $(this).css("background-color", bgColor);
      $(this).html(answerMark + " " + $(this).text());
      $("#wrongCount").html(wrongCount);
      $("#correctCount").html(correctCount);
      loadAnswerImage(bgImage);
      loadNextQuestion();
    }
  });
};
