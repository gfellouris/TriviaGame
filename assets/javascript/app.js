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
  time = 30;
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
    stop();
    alert("game over!");
  }
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

// =============== Main Section - START =============== //

//  Variable that will hold our setInterval that runs the stopwatch
var intervalId;
var clockRunning = false;
var time = 30;
var isWinner = false;
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
      "Teh warehouse",
      "Jim's Car"
    ],
    image: "jimpamfeelings.gif",
    audio: ""
  },
  {
    category: "theoffice",
    question: "Where do Jim and Pam share their first real kiss?",
    choices: ["Jim's desk", "The roof", "The warehouse", "Teh park"],
    image: "jimpamfirstkiss.gif",
    audio: ""
  }
];

var questionSelected = 0;
var answered = false;

window.onload = function() {
  $(".answer-container").css(
    "background",
    "url(assets/images/questionmark.jpg"
  );
  $(".answer-container").css("background-size", "300px 300px");
  loadQuestion(questionSelected);
  loadChoices(questionSelected);
  start();

  $(".choice").on("click", function() {
    console.log("on click");
    if (answered) {
      // After user makes selection disable ability to keep selecting choices
      console.log("question answered - load next question");
    } else {
      answered = true;
      stop();
      userSelection = $(this).attr("value");
      console.log("User selected: " + userSelection);
      isWinner = checkWinner(userSelection, questionSelected);
      console.log("Winner?" + isWinner);

      if (isWinner) {
        var bgColor = "green";
        msg = "Correct!";
        var bgImage = questionAnswer[questionSelected].image;
      } else {
        var bgImage = "loser.gif";
        var bgColor = "red";
        msg = "Wrong choice!";
      }
      //   alert(msg);
      $(this).css("background-color", bgColor);
      $(".answer-container").css("background", "url(assets/images/" + bgImage);
      $(".answer-container").css("background-size", "300px 300px");
      $(".answer-container").css("opacity", "1.0");

      questionSelected++;
      if (questionSelected < questionAnswer.length) {
        console.log(questionAnswer.length);
        setTimeout(function() {
          answered = false;
          isWinner = false;
          clockRunning = false;
          $(".choice").css("background-color", "transparent");
          $(".answer-container").css(
            "background",
            "url(assets/images/questionmark.jpg"
          );
          $(".answer-container").css("background-size", "300px 300px");
          console.log("question selected = " + questionSelected);
          loadQuestion(questionSelected);
          loadChoices(questionSelected);
          reset();
          start();
        }, 5000);
      } else {
        setTimeout(function() {
          alert("Game over!");
        }, 2000);
      }
    }
  });
};
