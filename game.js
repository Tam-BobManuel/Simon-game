
      // HE I DECALRED THE IMPORTANT VARIABLE
buttonColour = ["red", "blue", "green", "yellow"];
gamePattern = [];
userClickedPattern = [];
var started = false;
var level = 0;

    // EXPLAIN HOW THE GAME WORKS THROUGH AN ALERT
  
  $(".how").click(function(){
    confirm("A round in the game consists of the device lighting up one or more buttons in a random order, after which the player must reproduce that order by pressing the buttons. As the game progresses, the number of buttons to be pressed increases");
  });

    // TO START THE GAME WHEN YOU CLCIK A BUTTON

$(document).ready(function() {

  const allowedKeys = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m", " "];

  $(document).keydown(function (event) {
    if (!started && allowedKeys.includes(event.key)) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });

  $(document).on("touchend", function () {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });
  });

    // FUNCTION FOR THE USER INPUT

$(".btn").click(function(){

    var userChosenColour = $(this).prop('id');

    userClickedPattern.push(userChosenColour);

    // console.log(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);

})

    // CHECKING THE ANSWER AND THE CURRENT LEVEL

function checkAnswer(currentLevel) {

   if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

     if (userClickedPattern.length === gamePattern.length){

      setTimeout(function () {
        nextSequence();
      }, 1000);

    }

  } else {

      // IF THE USER GETS THE ANSWER WRONG

    console.log("wrong");
    var wrongAudio = new Audio("sounds/wrong.mp3");
    wrongAudio.play();
    
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 100);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();

  }

}

    // THE SEQUENCE CREATED BY THE PROGRAM

function nextSequence(){
  userClickedPattern = [];

    level++;
    $("#level-title").text("Level" +' '+ level);
    var randomNumber = Math.round(Math.random() * 3);

    var randomChosenColour = buttonColour[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}

    // PLAY THE AUDIO FOR THE BUTTONS

function playSound(name) {
    var testAudio = new Audio("sounds/" + name + ".mp3");
    testAudio.play();
    
    // return name;
}

    // TO CREATE AN EFFECT WHEN BUTTON IS PRESSED

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }
  

    // TO RESTART THE GAME

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}