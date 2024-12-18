boxes = document.querySelectorAll(".square");
function getRandomSquare() {
  return Math.floor(Math.random() * 16);
}

function initializeRandomSquares() {
  const first = getRandomSquare();
  let second = getRandomSquare();
  while (second === first) {
    second = getRandomSquare();
  }
  const firstBox = boxes[first];
  const secondBox = boxes[second];
  const firstBoxNumber = document.createElement('h3');
  firstBoxNumber.innerText = '2';
  firstBoxNumber.style = 'text-align: center; color: gray; vertical-align: baseline;';
  const secondBoxNumber = document.createElement('h3');
  secondBoxNumber.innerText = '2';
  secondBoxNumber.style = 'text-align: center; color: gray; vertical-align: baseline;';
  firstBox.appendChild(firstBoxNumber);
  secondBox.appendChild(secondBoxNumber);
}

initializeRandomSquares();

document.addEventListener('keydown', e => {
  console.log(e);
  switch (e.key) {
    case 'ArrowLeft':
      console.log('left');
      break;
    case 'ArrowRight':
      console.log('right');
      break;
    case 'ArrowDown':
      console.log('down');
      break;
    case 'ArrowUp':
      console.log('up');
      break;
  }
});