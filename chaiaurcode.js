const guessField = document.getElementById('guessField');
const submitButton = document.getElementById('subt');
const previousGuesses = document.querySelector('.guesses');
const guessesRemaining = document.querySelector('.lastResult');
const lowOrHigh = document.querySelector('.lowOrHi');
const reset = document.querySelector('.reset');
const restart = document.querySelector('.restart')
const playAgainBtn = document.querySelector('.playAgainBtn')
console.log(playAgainBtn)
// console.log(submitButton)
// console.log(guessField)

let playGame = true;
let initialGuessNumber = 10;
let previousGuessArray = [];
let form = document.querySelector('.form');
// console.log(previousGuesses);

let randomNumber = function () {
  return parseInt(Math.random() * 100 + 1); // Added return statement
};
console.log(`randomNumber is ${randomNumber()}`); // Call the function

// Generate a random number when the game starts
let secretNumber = randomNumber();

form.addEventListener('submit', function (e) {
  e.preventDefault();

  userGuess = parseInt(guessField.value);
  validateGuess();
  console.log(`userGuess is ${userGuess}`);

  function validateGuess() {
    if (userGuess < 0 || userGuess > 100 || isNaN(userGuess)) {
      lowOrHigh.innerHTML = `Please enter a number between 1-100`;
    } else {
      checkGuess();
    }
  }

  function checkGuess() {
    if (userGuess > secretNumber && playGame === true) {
      lowOrHigh.innerHTML = `Too High`;
      previousGuessArray.push(userGuess);
      previousGuesses.innerHTML = previousGuessArray.join(', ');
      initialGuessNumber--;
      guessesRemaining.innerHTML = initialGuessNumber;
      guessField.value = '';
      updateNumber();
    } else if (userGuess < secretNumber && playGame === true) {
      lowOrHigh.innerHTML = `Too Low`;
      previousGuessArray.push(userGuess);
      previousGuesses.innerHTML = previousGuessArray.join(', ');
      initialGuessNumber--;
      guessesRemaining.innerHTML = initialGuessNumber;
      guessField.value = '';
      updateNumber();
    } else if (userGuess === secretNumber && playGame === true) {
      lowOrHigh.innerHTML = `Congratulations ${secretNumber} is the correct answer.`;
      guessField.value = '';
      updateNumber();
      // form.setAttribute('disabled', 'true');
      guessField.setAttribute('disabled', 'true')
      submitButton.setAttribute('disabled', 'true')
      secretNumber = randomNumber(); // Generate a new random number
      playAgainBtn.classList.remove('display')
    } else {
      endGame();
    }
  }

  function updateNumber() {
    if (initialGuessNumber === 0) {
      playGame = false;
    }
  }

  function endGame() {
    // form.setAttribute('disabled', 'true');
    guessField.setAttribute('disabled', 'true')
    submitButton.setAttribute('disabled', 'true')
    reset.innerHTML = `Game Over:`;
    restart.classList.remove('display')
  }

  function resetGame() {
    // form.removeAttribute('disabled');
    guessField.removeAttribute('disabled')
    submitButton.removeAttribute('disabled')
    playGame = true;
    previousGuessArray = [];
    previousGuesses.innerHTML = '';
    reset.innerHTML = '';
    initialGuessNumber = 10;
    guessesRemaining.innerHTML = initialGuessNumber;
    restart.classList.add('display')
    secretNumber = randomNumber();
  }
  restart.addEventListener('click', resetGame);
});

function playAgain() {
  // form.removeAttribute('disabled');
    guessField.removeAttribute('disabled')
    submitButton.removeAttribute('disabled')
    playGame = true;
    previousGuessArray = [];
    previousGuesses.innerHTML = '';
    reset.innerHTML = '';
    initialGuessNumber = 10;
    guessesRemaining.innerHTML = initialGuessNumber;
    playAgainBtn.classList.add('display');
    secretNumber = randomNumber();

}

playAgainBtn.addEventListener('click', playAgain)
