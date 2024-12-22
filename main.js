// boxes = document.querySelectorAll(".square");
function getRandomSquare(n) {
  return Math.floor(Math.random() * n);
}

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
          for (let col = 0; col < this.n; col++) {
            const element = this.board[row][col];
            if (element) {
              this.board[row][leftMostUndefined] = element;
              if (col != leftMostUndefined) {
                this.board[row][col] = undefined;
              }
              leftMostUndefined++;
            }
          }
        }
        break;
      case 'right':
        break;
      case 'top':
        break;
      case 'down':
        break;
    }
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
    box.replaceChildren(boxNumber);
  } else {
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
  e.preventDefault();
  switch (e.key) {
    case 'ArrowLeft':
      game.move('left');
      break;
    case 'ArrowRight':
      game.move('right');
      break;
    case 'ArrowDown':
      game.move('down');
      break;
    case 'ArrowUp':
      game.move('up');
      break;
  }

  updateBoxes();
});
