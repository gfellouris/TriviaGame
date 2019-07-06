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

function loadQuestion() {
  $("#question").html(questionAnswer.question);
}
function checkWinner(str) {
  bWinner = false;
  console.log("Passed selection:" + str);
  if (str === questionAnswer.choices[0]) {
    bWinner = true;
  } else {
    bWinner = false;
  }
  return bWinner;
}

function loadChoices() {
  for (x = 0; x < questionAnswer.choices.length; x++) {
    var choice = questionAnswer.choices[x];
    $("#choices").append(
      "<div id=choice" +
        x +
        " class=choice value='" +
        choice +
        "'>" +
        choice +
        "</div>"
    );
  }
}

// =============== Main Section - START =============== //

//  Variable that will hold our setInterval that runs the stopwatch
var intervalId;
var clockRunning = false;
var time = 5;
var isWinner = false;
var questionAnswer = {
  question: "Who was Snow Whites prince?",
  choices: [
    "Prince Ferdinand",
    "Prince Philip",
    "Prince Charming",
    "Prince Naveen"
  ],
  image: "princeferdinand.jpg",
  audio: ""
};

window.onload = function() {
  loadQuestion();
  loadChoices();
  start();

  $(".choice").on("click", function() {
    stop();
    userSelection = $(this).attr("value");
    console.log("User selected: " + userSelection);
    isWinner = checkWinner(userSelection);
    console.log("Winner?" + isWinner);

    if (isWinner) {
      alert("You won!");
      $(this).css("background-color", "lightgreen");
      $(this).css("color", "white");
      $(".answer-container").html(
        "<img height=80% width=60% src='assets/images/princeferdinand.png' />"
      );
      $(".answer-container").css(
        "background",
        "url(assets/images/princeferdinand.png)"
      );
      $(".answer-container").css("opacity", "1.0");
    } else {
      alert("Wrong choice!");
      $(this).css("background-color", "red");
      $(this).css("color", "white");
    }
  });
};
