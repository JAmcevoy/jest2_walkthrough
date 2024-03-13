let game = {
  score: 0,
  currentGame: [],
  playerMoves: [],
  choices: ["button1, button2, button3, button4"],
}

function newGame() {
  // reset score
  game.score = 0;
  // reset playerMoves
  game.playerMoves = [];
  // reset currentGame
  game.currentGame = [];
}

module.exports = { game, newGame };
