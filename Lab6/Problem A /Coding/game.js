let playerName  = "";
let gameStarted = false;
let wins        = 0;
let losses      = 0;
let draws       = 0;
let roundNumber = 0;
let results     = [];

// startGame()
function startGame() {
  const nameInput = document.getElementById("playerName");
  const name      = nameInput.value.trim();

  if (name === "") {
    alert("Please enter your name.");
    return;
  }

  playerName  = name;
  gameStarted = true;

  document.getElementById("welcome").innerHTML =
    "Welcome, <strong>" + playerName + "</strong>!";

  document.getElementById("startTime").innerHTML =
    "Game started: " + new Date();
}

// getComputerChoice()
function getComputerChoice() {
  const options = ["rock", "paper", "scissors"];
  const index   = Math.floor(Math.random() * 3);
  return options[index];
}

// playRound(playerChoice)
function playRound(playerChoice) {
  if (!gameStarted) {
    alert("Click Start Game first.");
    return;
  }

  const computerChoice = getComputerChoice();

  document.getElementById("playerImg").src = playerChoice + ".png";
  document.getElementById("computerImg").src = computerChoice + ".png";

  let result;
  let message;

  if (playerChoice === computerChoice) {
    result  = "Draw";
    message = "It's a draw! Both chose " + playerChoice + ".";
  } else if (
    (playerChoice === "rock"     && computerChoice === "scissors") ||
    (playerChoice === "scissors" && computerChoice === "paper")    ||
    (playerChoice === "paper"    && computerChoice === "rock")
  ) {
    result  = "Win";
    message = "You win! " + playerChoice + " beats " + computerChoice + ".";
  } else {
    result  = "Lose";
    message = "You lose! " + computerChoice + " beats " + playerChoice + ".";
  }

  const resultEl = document.getElementById("result");
  resultEl.innerHTML = message;

  if (result === "Win") {
    resultEl.style.color = "green";
    wins++;
  } else if (result === "Lose") {
    resultEl.style.color = "red";
    losses++;
  } else {
    resultEl.style.color = "grey";
    draws++;
  }

  document.getElementById("wins").textContent   = wins;
  document.getElementById("losses").textContent = losses;
  document.getElementById("draws").textContent  = draws;

  roundNumber++;
  results.push(result);

  const row =
    "<tr>" +
      "<td>" + roundNumber    + "</td>" +
      "<td>" + playerChoice   + "</td>" +
      "<td>" + computerChoice + "</td>" +
      "<td>" + result         + "</td>" +
    "</tr>";

  document.getElementById("historyBody").innerHTML += row;
}

// showSummary()
function showSummary() {
  let totalWins = 0;

  for (let i = 0; i < results.length; i++) {
    if (results[i] === "Win") {
      totalWins++;
    }
  }

  const rounds = results.length;

  if (rounds === 0) {
    document.getElementById("result").innerHTML = "No rounds played yet.";
    document.getElementById("result").style.color = "grey";
    return;
  }

  const percentage = Math.round((totalWins / rounds) * 100);

  document.getElementById("result").innerHTML =
    "You played " + rounds + " rounds and won " + percentage + "%";
  document.getElementById("result").style.color = "green";
}

// resetGame()
function resetGame() {
  wins        = 0;
  losses      = 0;
  draws       = 0;
  roundNumber = 0;
  results     = [];
  gameStarted = false;
  playerName  = "";

  document.getElementById("wins").textContent   = 0;
  document.getElementById("losses").textContent = 0;
  document.getElementById("draws").textContent  = 0;

  document.getElementById("historyBody").innerHTML = "";

  const resultEl = document.getElementById("result");
  resultEl.innerHTML = "";
  resultEl.style.color = "";

  document.getElementById("welcome").innerHTML   = "";
  document.getElementById("startTime").innerHTML = "";

  document.getElementById("playerName").value = "";

  document.getElementById("playerImg").src   = "rock.png";
  document.getElementById("computerImg").src = "rock.png";
}