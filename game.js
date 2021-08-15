// pattern generation
var gamePattern = [];
var userClickedPattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];


//sound play
function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

//flash buton on click
function animatePress(currentColour) {
  var element = $("#" + currentColour);
  element.addClass("pressed");

  setTimeout(function() {
    element.removeClass("pressed");
  }, 100);

}

//keyboard stroke eventlistener
var started = false;

var level = 0;

$(document).keydown(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


function nextSequence() {
  userClickedPattern = [];

  var randomNumber = Math.random() * 4;
  randomNumber = Math.floor(randomNumber);

  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(60).fadeIn(60);

  playSound(randomChosenColour);

  $("#level-title").text("Level " + (++level));

}

//button click
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});


//check answer
function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    if (userClickedPattern.length === gamePattern.length) {

      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");

    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();


  }
}


//restart
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
