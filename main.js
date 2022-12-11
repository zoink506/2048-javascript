function createGrid() {
  const gameDiv = document.querySelector("#game");
  const gridSize = 4;
  let gameGrid = new Array;

  for(let i = 0; i < gridSize; i++) {
    const row = new Array;
    gameGrid[i] = row;
    for(let j = 0; j < gridSize; j++) {
      const cell = 0;
      row[j] = cell;
    }

  }
  console.log(gameGrid);
}

function createEventListeners() {
  
}

createGrid();