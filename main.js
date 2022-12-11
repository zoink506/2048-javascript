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

  generateStartingCells(gameGrid, 2);

  console.log(gameGrid);
  createEventListeners(gameGrid);
}

function generateStartingCells(grid, numOfCells) {
  const cellAmount = grid.length ** 2; // length of grid squared
  const threshold =  1 / cellAmount;

  let cellsCreated = 0;
  while(cellsCreated < numOfCells) {
    for(let i = 0; i < grid.length; i++) {
      for(let j = 0; j < grid[i].length; j++) {
        const rand = Math.random();
        if(rand < threshold && grid[i][j] === 0 && cellsCreated < numOfCells) {
          // create cell
          grid[i][j] = 2;
          cellsCreated++;
        }
      }
    }
  }
}

function createEventListeners(grid) {
  document.addEventListener("keydown", e => {
    if(e.keyCode >= 37 && e.keyCode <= 40) { // key is an arrow key
      moveGrid(grid, e.key);
    }
  });
}

function moveGrid(grid, direction) {
  switch (direction) {
    case "ArrowUp":
      console.log("arrow up");
      moveUp(grid);
      break;
  
    case "ArrowDown":
      console.log("arrow down");
      moveDown(grid);
      break;

    case "ArrowLeft":
      console.log("arrow left");
      moveLeft(grid);
      break;

    case "ArrowRight":
      console.log("arrow right");
      moveRight(grid);
      break;

    default:
      break;
  }
}

function moveUp(grid) {
  
}

function moveDown(grid) {

}

function moveLeft(grid) {

}

function moveRight(grid) {

}

startGame();
