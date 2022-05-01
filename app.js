const playerMaker = () => {
  const playerOne = {
    score: 0,
    sign: "X",
  };
  const playerTwo = {
    score: 0,
    sign: "O",
  };
  return { playerOne, playerTwo };
};

const GameBoard = (() => {
  const gameBoardEl = document.querySelector(".game-board");
  const gameArr = ["", "", "", "", "", "", "", "", ""];
  let playerTurn = playerMaker().playerOne["sign"];

  const turnTracker = () => {
    if (playerTurn === playerMaker().playerOne["sign"]) {
      playerTurn = playerMaker().playerTwo["sign"];
    } else {
      playerTurn = playerMaker().playerOne["sign"];
    }
    return playerTurn;
  };
  const createGameGrid = () => {
    for (let i = 0; i < 9; i++) {
      let square = makeGameSquare();
      square.setAttribute("id", i);
      GameBoard.gameBoardEl.appendChild(square);
      showGameGrid();
    }
  };
  const gameEnd = false;

  return {
    playerTurn,
    gameArr,
    gameBoardEl,
    gameEnd,
    turnTracker,
    createGameGrid,
  };
})();

const makeGameSquare = () => {
  let gameBoardSquare = document.createElement("div");
  gameBoardSquare.className = "game-square";

  gameBoardSquare.addEventListener("click", () => {
    if (!GameBoard.gameEnd) {
      if (gameBoardSquare.innerText == "") {
        updateGameText();
        GameBoard.playerTurn = GameBoard.turnTracker();
        gameBoardSquare.innerText = `${GameBoard.playerTurn}`;
        updateGameArr(gameBoardSquare);
        checkWinner();
      }
    }

    console.log(GameBoard.gameArr);
  });

  return gameBoardSquare;
};
const updateGameText = () => {
  let playText = document.querySelector(".title-play");
  if (!GameBoard.gameEnd) {
    playText.innerText = `its ${GameBoard.playerTurn} Turn To Play`;
  } else {
    playText.innerText = `The Winner is: ${GameBoard.playerTurn}`;
  }
};
const updateGameArr = (square) => {
  const placeInArr = square.getAttribute("id");
  GameBoard.gameArr[placeInArr] = square.innerText;
};
const updatePlayerScore = () => {
  let players = playerMaker();
  let playerOneSign = players.playerOne.sign;
  let playerTwoSign = players.playerTwo.sign;
  if (playerOneSign === GameBoard.playerTurn) {
    players.playerOne.score++;
    showPlayerScore(players);
  }
  if (playerTwoSign === GameBoard.playerTurn) {
    players.playerTwo.score++;
    showPlayerScore(players);
  }
};

const finishGame = () => {
  updatePlayerScore();
  GameBoard.gameEnd = true;
  updateGameText();
  const resetGameButton = document.querySelector(".reset-game");
  resetGameButton.style.display = "block";

  resetGameButton.addEventListener("click", () => {
    resetGameGrid();
    GameBoard.gameEnd = false;
  });
};

const checkWinner = () => {
  const board = GameBoard.gameArr;
  const currPlayer = GameBoard.playerTurn;
  console.log(GameBoard.playerTurn);
  if (
    //checking rows
    (board[0] === currPlayer &&
      board[1] === currPlayer &&
      board[2] === currPlayer) ||
    (board[3] === currPlayer &&
      board[4] === currPlayer &&
      board[5] === currPlayer) ||
    (board[6] === currPlayer &&
      board[7] === currPlayer &&
      board[8] === currPlayer)
  ) {
    finishGame();
  }
  if (
    //checking columns
    (board[0] === currPlayer &&
      board[3] === currPlayer &&
      board[6] === currPlayer) ||
    (board[1] === currPlayer &&
      board[4] === currPlayer &&
      board[7] === currPlayer) ||
    (board[2] === currPlayer &&
      board[5] === currPlayer &&
      board[8] === currPlayer)
  ) {
    finishGame();
  }
  if (
    //Checking Diagonal
    (board[0] === currPlayer &&
      board[4] === currPlayer &&
      board[8] === currPlayer) ||
    (board[2] === currPlayer &&
      board[4] === currPlayer &&
      board[6] === currPlayer)
  ) {
    finishGame();
  }
};

const showGameGrid = () => {
  GameBoard.gameBoardEl.style.visibility = "visible";
};

const hideGameGrid = () => {
  GameBoard.gameBoardEl.style.visibility = "invisible";
};

const changeGameTitle = () => {
  let playTitle = document.querySelector(".title-play");
};

const hideMenuButtons = () => {
  const gameButtons = document.querySelector(".game-buttons");
  gameButtons.style.visibility = "hidden";
};

const createGameButtonFunc = () => {
  let vsPlayerButton = document.querySelector(".play-button1");
  vsPlayerButton.addEventListener("click", () => {
    changeGameTitle();
    GameBoard.createGameGrid();
    hideMenuButtons();
    resetGameGrid();
  });
};
createGameButtonFunc();
const createNewGame = () => {};

const resetGameGrid = () => {
  const currGrid = document.querySelectorAll(".game-square");
  currGrid.forEach((el) => {
    el.innerText = "";
  });
  GameBoard.gameArr.forEach((element) => {
    element.innerText = "";
  });
};

const showPlayerScore = (players) => {
  let playerOneScore = document.querySelector(".player-one-score");
  let plaerTwoScore = document.querySelector(".player-two-score");
  playerOneScore.innerText = `Player X Score: ${players.playerOne.score}`;
  plaerTwoScore.innerText = `Player O Score: ${players.playerTwo.score}`;
};

//
