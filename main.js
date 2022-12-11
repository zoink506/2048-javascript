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
          grid[i][j] = { value: 2, hasCombined: false };
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

// Begin by moving only one cell in each direction
// i = roww, j = columns
function moveUp(grid) {
  // Loop from top to bottom, left to right
  for(let i = 0; i < grid.length; i++) {
    const row = grid[i];

    for(let j = 0; j < row.length; j++) {
      const cell = row[j];

      if(cell !== 0) {
        // cell is occupied, an action must take place
        if(i === 0) {
          // do nothing
        } else {
          // cell is occupied and not at top
          /*
           *  if cell above is 0, move current cell up one index
           *  if cell above is occupied, check cell above's value and .hasCombined
           *  if cell value is equal and .hasCombined is false, combine cells
           *  otherwise, do nothing
           */

        }

      }
    }
  }
}

function moveDown(grid) {
  // Loop from bottom to top, left to right

}

function moveLeft(grid) {
  // Loop from left to right, top to bottom

}

function moveRight(grid) {
  // Loop from right to left, top to bottom

}

startGame();
