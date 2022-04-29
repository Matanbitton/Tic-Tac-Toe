const GameBoard = (() => {
    const gameBoardEl = document.querySelector(".game-board");
    const gameArr = [['X','','O'],
                     ["","O",""],
                     ["","","X"]];
    const displayController ={
        playerTurn : true,
};

return {
    gameArr,
    displayController,
    gameBoardEl,
  };
})();

const playerMaker = () => {
    const playerOne = {
        score: 0,
        sign: 'X',
    }
    const playerTwo = {
        score: 0,
        sign: 'O',
    }
};

const createGameGrid = () => {
    GameBoard.gameArr.forEach((arr) => {
            arr.forEach((element) => {
                let square = makeGameSquare();
                square.innerText = `${element}`;
                GameBoard.gameBoardEl.appendChild(square);
                showGameGrid();

        })
    })
};

const makeGameSquare = () => {
    let gameBoardSquare = document.createElement('div')
        gameBoardSquare.className = 'game-square';
    return gameBoardSquare;
}

const showGameGrid = () => {
    GameBoard.gameBoardEl.style.visibility = 'visible';
}
const hideGameGrid = () => {
    GameBoard.gameBoardEl.style.visibility = 'invisible';
}

const changeGameTitle = () => {
    let playTitle = document.querySelector('.title-play')
    playTitle.innerText = `${GameBoard.gameArr[1][0]}`
}

const hideMenuButtons = () => {
    const gameButtons = document.querySelector('.game-buttons')
    gameButtons.style.visibility = 'hidden';
    
}

const createGameButtonFunc = () => {
    let vsPlayerButton = document.querySelector('.play-button1')
    vsPlayerButton.addEventListener('click', () => {
        changeGameTitle();
        createGameGrid();
        hideMenuButtons();
        resetGameGrid();

       
    })
}
createGameButtonFunc();
const createNewGame = () => {

}

const resetGameGrid = () => {
    const currGrid = document.querySelectorAll('.game-square');
    currGrid.forEach((el)=>{
        el.innerText = '';
    })
    GameBoard.gameArr.forEach((arr) => {
        arr.forEach((element) => {
            element = '';
            

        });
    }
)};

