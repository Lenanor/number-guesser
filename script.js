const gameWrapper = document.querySelector("#game");
const guessBtn = document.querySelector("#guess-btn");
const guessInput = document.querySelector("#guess-input");
const message = document.querySelector(".message");
const minText = document.querySelector(".min-num");
const maxText = document.querySelector(".max-num");
const min = 1,
  max = 10,
  winningNum = getRandomNum();
let guesses = 3;

minText.innerHTML = min;
maxText.innerHTML = max;

gameWrapper.addEventListener("mousedown", function(e) {
  if (e.target.className === "play-again") {
    window.location.reload();
  }
});

guessBtn.addEventListener("click", function(e) {
  let guess = parseInt(guessInput.value);
  if (isNaN(guess) || guess > max || guess < min) {
    messageText("Välj ett nummer inom spannet ovan!", "red");
  } else if (guess === winningNum) {
    gameOver(true, "Grattis, du gissade rätt!");
    guessBtn.value = "Spela igen";
    guessBtn.className += "play-again";
  } else {
    guesses -= 1;
    if (guesses === 0) {
      gameOver(
        false,
        `Dina tre försök är slut, rätt nummer var ${winningNum}!`
      );

      guessBtn.value = "Spela igen";
      guessBtn.className += "play-again";
    } else {
      gameOver(false, `Fel nummer, ${guesses} försök kvar`);
    }
  }
});

function messageText(text, color) {
  message.textContent = text;
  guessInput.style.borderColor = color;
  message.style.color = color;
}

function gameOver(won, text) {
  guessInput.value = "";
  guessInput.disabled = won;
  won === true ? (color = "green") : (color = "red");
  messageText(text, color);
}

function getRandomNum() {
  return Math.floor(Math.random() * (max - min + 1) + 1);
}
