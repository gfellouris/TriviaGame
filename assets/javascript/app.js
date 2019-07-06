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

//  Variable that will hold our setInterval that runs the stopwatch
var intervalId;
var clockRunning = false;
var time = 5;

window.onload = function() {
  start();
};
