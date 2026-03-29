let userScore = 0;
let compScore = 0;
let rounds = 0;
const maxRounds = 5;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

const restartBtn = document.querySelector("#restart-btn");

// Generate computer choice
const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
};

// Draw
const drawGame = () => {
  msg.innerText = "Game was Draw. Play again.";
  msg.style.backgroundColor = "#081b31";
};

// Show winner of round
const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = `You win! Your ${userChoice} beats ${compChoice}`;
    msg.style.backgroundColor = "green";
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = `You lost. ${compChoice} beats your ${userChoice}`;
    msg.style.backgroundColor = "red";
  }
};

// End game after max rounds
const endGame = () => {
  if (userScore > compScore) {
    msg.innerText = "🎉 You won the game!";
    msg.style.backgroundColor = "green";
  } else if (compScore > userScore) {
    msg.innerText = "😢 Computer won the game!";
    msg.style.backgroundColor = "red";
  } else {
    msg.innerText = "It's a Draw Game!";
    msg.style.backgroundColor = "#081b31";
  }
};

// Main game logic
const playGame = (userChoice) => {
  if (rounds >= maxRounds) return; // stop game after limit

  rounds++;

  const compChoice = genCompChoice();

  if (userChoice === compChoice) {
    drawGame();
  } else {
    let userWin = true;

    if (userChoice === "rock") {
      userWin = compChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      userWin = compChoice === "scissors" ? false : true;
    } else {
      userWin = compChoice === "rock" ? false : true;
    }

    showWinner(userWin, userChoice, compChoice);
  }

  // check if game over
  if (rounds === maxRounds) {
    setTimeout(endGame, 500);
  }
};

// Restart game
const resetGame = () => {
  userScore = 0;
  compScore = 0;
  rounds = 0;

  userScorePara.innerText = 0;
  compScorePara.innerText = 0;

  msg.innerText = "Play your move";
  msg.style.backgroundColor = "#081b31";
};

// Event listeners
choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});

restartBtn.addEventListener("click", resetGame);