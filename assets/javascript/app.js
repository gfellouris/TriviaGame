function start() {
  //  TODO: Use setInterval to start the count here and set the clock to running.
  if (!clockRunning) {
    clockRunning = true;
    intervalId = setInterval(count, 1000);
  }
}

function stop() {
  //  TODO: Use clearInterval to stop the count here and set the clock to not be running.
  clearInterval(intervalId);
  clockRunning = false;
}

function count() {
  //  TODO: decrease time by 1, remember we cant use "this" here.
  time--;
  //  TODO: Get the current time, pass that into the timeConverter function,
  //        and save the result in a variable.
  timeConverter(time);
  //  TODO: Use the variable you just created to show the converted time in the "display" div.
  var result = timeConverter(time);
  $("#timer").html(result);
  if (time === 0) {
    stop();
    alert("game over!");
  }
}

//  THIS FUNCTION IS DONE FOR US!
//  We do not need to touch it.

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
  start();

  $(".choice").on("click", function() {
    userSelection = $(this).attr("value");
    console.log("User selected: " + userSelection);
    isWinner = checkWinner(userSelection);
    console.log("Winner?" + isWinner);

    if (isWinner) {
      alert("You won!");
      $(this).css("background-color","lightgreen");
      $(this).css("color","white");
      $(".answer-container").html("<img src='assets/images/princeferdinand.jpg' />");
    } else {
      alert("Wrong choice!");
      $(this).css("background-color","red");
      $(this).css("color","white");

    }

    // $(this).css("border", "5px solid lightyellow");
    // totalScore = totalScore + parseInt($(this).attr("value"));
    // console.log("Gem value = " + $(this).attr("value"));
    // console.log("Total Score = " + totalScore);
    // $("#totalScore").html("<h4>Total Score:</h4>" + totalScore);
    // checkWinner(totalScore, randomNum);
  });
};
