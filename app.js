const GameBoard = (() => {
const gameArr = [["","",""],
                 ["","",""],
                 ["","",""]];
const displayController = {
    playerOneScore: 0,
    playerTwoScore: 0,
};

return {
    gameArr,
    displayController,
  };
})();

const playerMaker = () => {
    const playerOne = {
        score: 0,
        sign: "X",
    }
    const playerTwo = {
        score: 0,
        sign: "O",
    }
}


console.log(GameBoard.displayController)