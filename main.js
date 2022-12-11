function startGame() {
  // Creates the games grid, adjust gridSize to change size of grid
  const gameDiv = document.querySelector("#columns");
  const gridSize = 4;
  let gameGrid = new Array;

  for(let i = 0; i < gridSize; i++) {
    const row = new Array;
    gameGrid[i] = row;
    for(let j = 0; j < gridSize; j++) {
      row[j] = 0;
    }
  }

  createEventListeners(gameGrid);
  console.log(gameGrid);
}

function createEventListeners(gameGrid) {
  document.addEventListener("keydown", e => {
    key = e.key;
    if(key === "w" || key === "a" || key === "s" || key === "d" || key === "W" || key === "A" || key === "S" || key === "D") {
      moveGrid(gameGrid, key);
    }
  });
}

function moveGrid(grid, direction) {
  console.log(direction);

  drawGrid(grid);
}

function drawGrid(grid) {
  const gridSize = grid.length;
  const columnDiv = document.querySelector("#columns");
  const columns = document.getElementsByClassName("column");
  
  console.log(columns);
  console.log(columnDiv)

  for(let i = 0; i < gridSize; i++) {
    const row = grid[i];
    
    for(let j = 0; j < row.length; j++) {

    }

  }
}

startGame();
