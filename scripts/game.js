let game = {
  score: 0,
  currentGame: [],
  playerMoves: [],
  choices: ["button1", "button2", "button3", "button4"],
};

function newGame() {
  // reset score
  game.score = 0;
  // reset playerMoves
  game.playerMoves = [];
  // reset currentGame
  game.currentGame = [];
  showScore();
  addTurn();
}

function showScore() {
  document.getElementById("score").innerText = game.score;
}

function addTurn() {
  // Clear the playerMoves array
  game.playerMoves = [];
  // Randomly add a button to the currentGame array
  game.currentGame.push(game.choices[Math.floor(Math.random() * 4)]);
  // Call showTurns() Function if implemented
  // showTurns();
}

module.exports = { game, newGame, showScore, addTurn };
