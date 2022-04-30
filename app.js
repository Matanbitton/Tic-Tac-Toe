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

  return {
    playerTurn,
    gameArr,
    gameBoardEl,
    turnTracker,
    createGameGrid,
  };
})();

const makeGameSquare = () => {
  let gameBoardSquare = document.createElement("div");
  gameBoardSquare.className = "game-square";

  gameBoardSquare.addEventListener("click", () => {
    if (gameBoardSquare.innerText == "") {
      GameBoard.playerTurn = GameBoard.turnTracker();
      gameBoardSquare.innerText = `${GameBoard.playerTurn}`;
      updateGameArr(gameBoardSquare);
      checkWinner();
    }

    console.log(GameBoard.gameArr);
  });

  return gameBoardSquare;
};

const updateGameArr = (square) => {
  const placeInArr = square.getAttribute("id");
  GameBoard.gameArr[placeInArr] = square.innerText;
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
    console.log("Winner");
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
    console.log("Winner");
  }
  if (
    //Check Diagonal
    (board[0] === currPlayer &&
      board[4] === currPlayer &&
      board[8] === currPlayer) ||
    (board[2] === currPlayer &&
      board[4] === currPlayer &&
      board[6] === currPlayer)
  ) {
    console.log("Winner");
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

//
