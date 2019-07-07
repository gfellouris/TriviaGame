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
    // $("#choices").append("<div id=choice" + x + " class=choice value='" + choice + "'>" + choice + "</div>"
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
    category: "princes",
    question: "Who was Snow Whites prince?",
    choices: [
      "Prince Ferdinand",
      "Prince Philip",
      "Prince Charming",
      "Prince Naveen"
    ],
    image: "princeferdinand.jpg",
    audio: ""
  },
  {
    category: "princes",
    question:
      "Who was transformed from a frog to a prince after being kissed by Princess Tiana?",
    choices: [
      "Prince Naveen",
      "Prince Philip",
      "Prince Charming",
      "Prince Ferdinand"
    ],
    image: "princeferdinand.jpg",
    audio: ""
  },
  {
    category: "princes",
    question: "How does Aladdin travel to see Princess Jasmine?",
    choices: ["Magic Carpet", "Horse", "Boat", "Plane"],
    image: "princeferdinand.jpg",
    audio: ""
  },
  {
    category: "princes",
    question: "Where does the beast prohibit Belle from going in his castle?",
    choices: ["The West Wing", "Kitchen", "Dinning Room", "Main Ballroom"],
    image: "princeferdinand.jpg",
    audio: ""
  },
  {
    category: "princes",
    question: "Where did Arielle rescue prince Eric from?",
    choices: ["Ocean", "Castle", "Forest", "Cave"],
    image: "princeferdinand.jpg",
    audio: ""
  }
];

var questionSelected = 0;
var answered = false;

window.onload = function() {
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
        $(this).css("background-color", "lightgreen");
        alert("You won!");
        // $(this).css("color", "white");
        $(".answer-container").html(
          "<img height=80% width=60% src='assets/images/princeferdinand.png' />"
        );
        $(".answer-container").css(
          "background",
          "url(assets/images/princeferdinand.png)"
        );
        $(".answer-container").css("opacity", "1.0");
      } else {
        $(this).css("background-color", "red");
        alert("Wrong choice!");
        // $(this).css("color", "white");
      }
      if (questionSelected < questionAnswer.length) {
        setInterval(5000);
        questionSelected++;
        answered = false;
        isWinner = false;
        clockRunning = false;
        $(".choice").css("background-color", "transparent");
        console.log("question selected = " + questionSelected);
        loadQuestion(questionSelected);
        loadChoices(questionSelected);
        reset();
        start();
      }
    }
  });
};
