const GameBoard = (() => {
  const gameBoardEl = document.querySelector(".game-board");
  const gameArr = ["", "", "", "", "", "", "", "", ""];
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
  const playerOne = playerMaker().playerOne;
  const playerTwo = playerMaker().playerTwo;

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
    playerOne,
    playerTwo,
    playerTurn,
    gameArr,
    gameBoardEl,
    gameEnd,
    playerMaker,
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
  });

  return gameBoardSquare;
};
const updateGameText = () => {
  let playText = document.querySelector(".title-play");
  if (!GameBoard.gameEnd) {
    playText.innerText = `its ${GameBoard.playerTurn}'s Turn To Play`;
  } else {
    playText.innerText = `The Winner is: ${GameBoard.playerTurn}`;
  }
};
const updateGameArr = (square) => {
  const placeInArr = square.getAttribute("id");
  GameBoard.gameArr[placeInArr] = square.innerText;
};
const updatePlayerScore = () => {
  let playerOneSign = GameBoard.playerOne.sign;
  let playerTwoSign = GameBoard.playerTwo.sign;
  if (playerOneSign === GameBoard.playerTurn) {
    GameBoard.playerOne.score++;
    showPlayerScore(GameBoard.playerOne, GameBoard.playerTwo);
  }
  if (playerTwoSign === GameBoard.playerTurn) {
    GameBoard.playerTwo.score++;
    showPlayerScore(GameBoard.playerOne, GameBoard.playerTwo);
  }
};
const startGame = () => {
  changeGameTitle();
  GameBoard.createGameGrid();
  hideMenuButtons();
  resetGameGrid();
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
  let tie = checkTie();
  if (!tie) {
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
  } else {
    let playText = document.querySelector(".title-play");
    playText.innerText = "Its a Tie!";
  }
};
const checkTie = () => {
  for (let i = 0; i < GameBoard.gameArr.length; i++) {
    if (GameBoard.gameArr[i] == "") {
      return false;
    }
  }
  return true;
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
    startGame();
  });
};
createGameButtonFunc();
const createNewGame = () => {};

const resetGameGrid = () => {
  const currGrid = document.querySelectorAll(".game-square");
  currGrid.forEach((el) => {
    el.innerText = "";
  });
  for (let i = 0; i < GameBoard.gameArr.length; i++) {
    GameBoard.gameArr[i] = "";
  }
};

const showPlayerScore = (playerOne, playerTwo) => {
  let playerOneScore = document.querySelector(".player-one-score");
  let plaerTwoScore = document.querySelector(".player-two-score");
  playerOneScore.innerText = `Player X Score: ${playerOne.score}`;
  plaerTwoScore.innerText = `Player O Score: ${playerTwo.score}`;
};

//
