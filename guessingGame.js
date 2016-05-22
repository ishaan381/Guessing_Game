/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.
$(document).ready(function() {
var numbersTried = [], guesses=5, winningNumber = generateWinningNumber(), hintNotGiven = true;

/* **** Guessing Game Functions **** */

// Generate the Winning Number
function generateWinningNumber(){
  return 1 + Math.floor(100*Math.random());
}

// Fetch the Players Guess
function playersGuessSubmission(){
	// add code here
    var playersGuess = +$('input').val();
    $('input').val("");
    $('.feedback').show();
    checkGuess(playersGuess);
}

// Determine if the next guess should be a lower or higher number
function lowerOrHigher(a, b){
	//local variables to measure distance and whether they are higher or lower
  var dist, lOh;
  if (Math.abs(a-b) > 20) {
    dist = "more than 20 numbers away"
  } else if (Math.abs(a-b) < 5) {
    dist = "less than 5 numbers away";
  }else if (Math.abs(a-b) < 10) {
    dist = "less than 10 numbers away"
  } else { dist = "less than 20 numbers away"}

  if (a > b) {
    lOh = "Guess is lower & "
  } else { 
    lOh = "Guess is higher & "
  }

  return lOh+dist;
}

// Check if the Player's Guess is the winning number 
function checkGuess(playersGuess){
	//If the number hasn't already been tried, check to see if it is the winning number
  if (numbersTried.indexOf(playersGuess) == -1) {
  //If it is a winning number
    if(winningNumber==playersGuess) {
    $('.feedback').text("You won!");
    $('.remaining').text("Congratulations!")
    playerWon();
    }
    //If it is not a winning number, add it to array of tried numbers, and increment guesses 
    else {
    $('.feedback').text(lowerOrHigher(winningNumber, playersGuess));

    numbersTried.push(playersGuess);
    //Have not given a hint for the current step
    hintNotGiven = true;

    guesses--;

    //Message to be printed for number of guesses remaining, and also determining if the user lost
    if (guesses > 1) {
    $('.remaining').text(guesses + " Guesses remaining! Make it count!")
    } else if (guesses == 1) {
      $('.remaining').text(guesses + " Guess remaining! Make it count!")
    } else {
      $('.feedback').text("You lost. Play again?");
      $('.remaining').text("Game Over")
      playerLost();
    };
  };
} 
  //If the user has already guessed this number
  else {
  $('.feedback').text("You have already guessed this number");
};

};

//Hint button provides exact number of hint numbers as guesses remaining
function provideHint(){
	//As the function generates random numbers, it is important to prevent the user from clicking the hint button more than once to see which number has not changed.
  if (hintNotGiven) {
  var hintArr = [];
  
  for(var i = 0; i < guesses; i++) {
    hintArr[i] = generateWinningNumber();
  }
  hintArr[Math.round(Math.random()*(guesses-1))] = winningNumber;

  $('.remaining').text(hintArr.join(", "));

  hintNotGiven = false;
  };
}

// Allow the "Player" to Play Again
//Resets the entire DOM
function playAgain(){
  numbersTried = [];
  guesses = 5;
  winningNumber = generateWinningNumber();
  hintNotGiven = true;
  $('.gamebox').css({'border-color': 'purple', 'border-style': 'solid'});
  $('h1').css({'color': 'rgb(255, 187, 0)'});
  $('.txt').css({'color': 'black'});
  $('h1').text("Guessing Game");
  $('.feedback').hide();
  $('.remaining').text(guesses + " Guesses remaining! Make it count!");
};

//Animation for when player wins
function playerWon() {
  $('.gamebox').css({'border-color': 'red', 'border-style': 'dashed'});
  $('h1').text("WE HAVE A WINNER!!");
  $('h1, .txt').css({'color': 'red'});
  for (var i=0; i<3; i++) {
  $('.gamebox').animate({'borderWidth': '20px'}, 1000);
  $('.gamebox').animate({'borderWidth': '6px'}, 1000);
  };
};

//Animation for when player loses
function playerLost() {
  $('.gamebox').css({'border-color': 'grey', 'border-style': 'double'});
  $('h1').text("YOU JUST LOST");
  $('h1, .txt').css({'color': 'grey'});
  for (var i=0; i<3; i++) {
  $('.gamebox').animate({'borderWidth': '20px'}, 1000);
  $('.gamebox').animate({'borderWidth': '6px'}, 1000);
  };
};

/* **** Event Listeners/Handlers ****  */
$('#submit').on('click', function() {
  playersGuessSubmission();
});

$('#hint').on('click', function() {
  provideHint();
});

$('#again').on('click', function() {
  playAgain();
});

$('#input').on('keypress', function(event){
  if (event.which == 13) {
    playersGuessSubmission();
  };
});

});

