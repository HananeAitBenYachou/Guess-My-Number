"use strict";

//State variables
let secretNumber = generateRandomSecretNumber();
let score = 20;
let highScore = 0;

// Utility Functions
function generateRandomSecretNumber() {
  return Math.trunc(Math.random() * 20) + 1;
}

function displayMessage(message) {
  document.querySelector(".message").textContent = message;
}

function updateScore(newScore) {
  score = newScore;
  document.querySelector(".score").textContent = score;
}

function resetGame() {
  secretNumber = generateRandomSecretNumber();
  score = 20;
  document.querySelector(".guess").value = "";

  displayMessage("Start guessing ...");
  updateScore(score);
  resetStyles("#222", "15rem", "?");
}

function resetStyles(backgroundColor, numberWidth, numberText) {
  document.querySelector("body").style.backgroundColor = backgroundColor;
  document.querySelector(".number").style.width = numberWidth;
  document.querySelector(".number").textContent = numberText;
}

function handleWin() {
  displayMessage("🎉 Correct Number!");
  resetStyles("#60b347", "30rem", secretNumber);

  if (score > highScore) {
    highScore = score;
    document.querySelector(".highscore").textContent = highScore;
  }
}

function handleWrongGuess(guessedNumber) {
  if (score > 1) {
    displayMessage(
      guessedNumber > secretNumber ? "📈 Too high!" : "📉 Too low!"
    );
    updateScore(score - 1);
  } else {
    displayMessage("💥 You lost the game!");
    updateScore(0);
  }
}

// Event Listeners
document.querySelector(".check").addEventListener("click", function () {
  let guessedNumber = Number(document.querySelector(".guess").value);

  //When the input is not valid
  if (!guessedNumber) {
    displayMessage("⛔️ Not a number!");
    return;
  }

  if (guessedNumber == secretNumber) handleWin();
  else handleWrongGuess(guessedNumber);
});

document.querySelector(".again").addEventListener("click", resetGame);
