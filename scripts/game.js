// Define the game object with its properties and initial values
let game = {
  currentGame: [], // Array to store the sequence of buttons in the current game
  playerMoves: [], // Array to store the player's moves
  score: 0, // Player's score
  turnNumber: 0, // Track the current turn number
  lastButton: "", // Store the last button pressed by the player
  turnInProgress: false, // Flag to indicate whether a turn is in progress
  choices: ["button1", "button2", "button3", "button4"] // Array of button choices
};

// Function to start a new game
function newGame() {
  // Reset game state
  game.currentGame = [];
  game.playerMoves = [];
  game.score = 0;

  // Add click event listeners to buttons
  for (let circle of document.getElementsByClassName("circle")) {
      if (circle.getAttribute("data-listener") !== "true") {
          circle.addEventListener("click", (e) => {
              // Check if the game has started and it's not the AI's turn
              if (game.currentGame.length > 0 && !game.turnInProgress) {
                  let move = e.target.getAttribute("id");
                  game.lastButton = move;
                  game.playerMoves.push(move);
                  lightsOn(move);
                  playerTurn();
              }
          });
          circle.setAttribute("data-listener", "true");
      }
  }
  // Display the initial score
  showScore();
  // Start the first turn
  addTurn();
}

// Function to add a new turn to the game
function addTurn() {
  game.playerMoves = []; // Reset player's moves for the new turn
  // Add a random button to the sequence
  game.currentGame.push(game.choices[Math.floor(Math.random() * 4)]);
  // Display the sequence of buttons for the player to follow
  showTurns();
}

// Function to display the sequence of buttons to the player
function showTurns() {
  game.turnInProgress = true; // Set turn in progress flag
  game.turnNumber = 0; // Reset turn number
  // Iterate over the buttons in the sequence and light them up
  let turns = setInterval(function () {
      lightsOn(game.currentGame[game.turnNumber]);
      game.turnNumber++;
      // If all buttons have been lit, clear the interval and indicate the end of the turn
      if (game.turnNumber >= game.currentGame.length) {
          clearInterval(turns);
          game.turnInProgress = false;
      }
  }, 800); // Interval between lighting up buttons
}

// Function to briefly light up a button
function lightsOn(circ) {
  document.getElementById(circ).classList.add("light"); // Add light class
  setTimeout(function () {
      document.getElementById(circ).classList.remove("light"); // Remove light class after a delay
  }, 400); // Duration of button lighting
}

// Function to handle the player's turn
function playerTurn() {
  let i = game.playerMoves.length - 1; // Index of the last move
  // Check if the player's move matches the AI's sequence
  if (game.currentGame[i] === game.playerMoves[i]) {
      // If the player has completed the sequence correctly
      if (game.currentGame.length === game.playerMoves.length) {
          game.score++; // Increment score
          showScore(); // Update score display
          addTurn(); // Add a new turn
      }
  } else {
      // If the player made a wrong move, end the game
      alert("Wrong move!");
      newGame(); // Start a new game
  }
}

// Function to display the player's score
function showScore() {
  document.getElementById("score").innerText = game.score; // Update score display
}

// Exporting functions and game object for external use (if applicable)
module.exports = { game, newGame, showScore, addTurn, lightsOn, showTurns, playerTurn };
