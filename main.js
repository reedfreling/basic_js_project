function getRandomSquare(n) {
  return Math.floor(Math.random() * n);
}

// this is pretty arbitrary
function getColorForValue(n) {
  const exponentModThree = Math.log2(n) % 3;
  const red = exponentModThree === 0 ? Math.floor(Math.log2(n) / 30 * 256) : 0; 
  const green = exponentModThree === 1 ? Math.floor(256 - (Math.log2(n) / 30 * 256)) : 0;
  const blue = exponentModThree === 2 ? Math.floor(256 - (Math.log2(n) / 30 * 256)) : 0;

  return `rgb(${red},${green},${blue})`
}

const mainGrid = document.querySelector('#main-grid');

const boxStyling = 'color: gray; padding: 0; line-height: 100%;';

const numRows = 4;

class Game {
  constructor() {
    this.n = 4;
    this.board = [];
    for (let i = 0; i < this.n; i++) {
      const row = [];
      this.board[i] = row;
      for (let j = 0; j < this.n; j++) {
        row[j] = undefined;
      }
    }
    const totalBoxes = this.n * this.n;
    const firstRandom = getRandomSquare(totalBoxes);
    let secondRandom = getRandomSquare(totalBoxes);
    while (secondRandom === firstRandom) {
      secondRandom = getRandomSquare(totalBoxes);
    }

    const { row: firstRow, col: firstCol } = this.getRowAndCol(firstRandom);
    const { row: secondRow, col: secondCol } = this.getRowAndCol(secondRandom);

    this.board[firstRow][firstCol] = 2;
    this.board[secondRow][secondCol] = 2;

    this.gameState = {
      canContinue: true,
    };
  }

  getRowAndCol(i) {
    const row = Math.floor(i / this.n);
    const col = i % this.n;
    return {
      row: row, col: col
    };
  }

  move(direction) {
    console.log(`Moving in direction: ${direction}`);
    console.log(this.board);
    switch (direction) {
      case 'left':
        for (let row = 0; row < this.n; row++) {
          let leftMostUndefined = 0;
          let mergeable = undefined;
          for (let col = 0; col < this.n; col++) {
            const element = this.board[row][col];
            if (element) {
              this.board[row][col] = undefined;
              if (mergeable && element === mergeable) {
                this.board[row][leftMostUndefined - 1] = element * 2;
                mergeable = undefined; // you cannot do chains or merges in 2028
              } else {
                this.board[row][leftMostUndefined] = element;
                mergeable = element;
              }
              leftMostUndefined++;
            }
          }
        }
        break;
      case 'right':
        for (let row = 0; row < this.n; row++) {
          let rightMostUndefined = this.n - 1;
          let mergeable = undefined;
          for (let col = this.n - 1; col >= 0; col--) {
            const element = this.board[row][col];
            if (element) {
              this.board[row][col] = undefined;
              if (mergeable && element === mergeable) {
                this.board[row][rightMostUndefined + 1] = element * 2;
                this.board[row][col] = undefined;
                mergeable = undefined; // you cannot do chains or merges in 2028
              } else {
                this.board[row][rightMostUndefined] = element;
                mergeable = element;
              }
              rightMostUndefined--;
            }
          }
        }
        break;
      case 'up':
        for (let col = 0; col < this.n; col++) {
          let upMostUndefined = 0;
          let mergeable = undefined;
          for (let row = 0; row < this.n; row++) {
            const element = this.board[row][col];
            if (element) {
              this.board[row][col] = undefined;
              if (mergeable && element === mergeable) {
                this.board[upMostUndefined - 1][col] = element * 2;
                this.board[row][col] = undefined;
                mergeable = undefined; // you cannot do chains or merges in 2028
              } else {
                this.board[upMostUndefined][col] = element;
                mergeable = element;
              }
              upMostUndefined++;
            }
          }
        }
        break;
      case 'down':
        for (let col = 0; col < this.n; col++) {
          let downMostUndefined = this.n - 1;
          let mergeable = undefined;
          for (let row = this.n - 1; row >= 0; row--) {
            const element = this.board[row][col];
            if (element) {
              this.board[row][col] = undefined;
              if (mergeable && element === mergeable) {
                this.board[downMostUndefined + 1][col] = element * 2;
                this.board[row][col] = undefined;
                mergeable = undefined; // you cannot do chains or merges in 2028
              } else {
                this.board[downMostUndefined][col] = element;
                mergeable = element;
              }
              downMostUndefined--;
            }
          }
        }
        break;
    }

    const unfilledCells = [];
    this.board.forEach((row, rowNum) => row.forEach((el, colNum) => {
      if (el === undefined) {
        unfilledCells.push({row: rowNum, col: colNum});
      }
    }));
    const canContinue = unfilledCells.length > 0;
    this.gameState = {
      canContinue: canContinue,
    };
    if (canContinue) {
      const { row: row, col: col } = unfilledCells[getRandomSquare(unfilledCells.length)];
      this.board[row][col] = 2;
    }

    return this.gameState;
  }

  getSquareValues() {
    const squareValues = new Map();
    for (let row = 0; row < this.n; row++) {
      for (let col = 0; col < this.n; col++) {
        squareValues.set(
          row * this.n + col,
          this.board[row][col]
        );
      }
    }
    return squareValues;
  }

}

const game = new Game();

function setSquareValue(box, value) {
  if (value) {
    const boxNumber = document.createElement('p');
    boxNumber.innerText = `${value}`;
    boxNumber.style = boxStyling;
    box.style.backgroundColor = getColorForValue(value);
    box.replaceChildren(boxNumber);
  } else {
    box.style.backgroundColor = '';
    box.replaceChildren();
  }
}

function updateBoxes() {
  const squareValues = game.getSquareValues();
  const boxes = document.querySelectorAll(".square");
  boxes.forEach(function (box, k, p) {
    setSquareValue(box, squareValues.get(k));
  });
}

updateBoxes();

document.addEventListener('keydown', e => {
  // let gameState;
  e.preventDefault();
  switch (e.key) {
    case 'ArrowLeft':
      gameState = game.move('left');
      break;
    case 'ArrowRight':
      gameState = game.move('right');
      break;
    case 'ArrowDown':
      gameState = game.move('down');
      break;
    case 'ArrowUp':
      gameState = game.move('up');
      break;
  }

  const { canContinue: canContinue } = gameState;
  updateBoxes();
  if (!canContinue) {
    const restartButton = document.createElement('button');
    restartButton.innerText = 'Do you wish to restart?'
    restartButton.style.gridRow = 1;
    restartButton.style.gridColumn = 2;
    mainGrid.appendChild(restartButton);
  }
});
