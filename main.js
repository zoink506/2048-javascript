function startGame() {
  // Creates the games grid, adjust gridSize to change size of grid
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

  // For testing purposes, create custom grid
  /*
  gameGrid = [
    [0, 0, {value: 4, hasCombined: false}, 0],
    [0, 0, {value: 4, hasCombined: false}, 0],
    [0, 0, {value: 4, hasCombined: false}, 0],
    [0, 0, {value: 4, hasCombined: false}, 0]
  ]
  */
  
  drawGrid(gameGrid);

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
// i = row, j = columns
function moveUp(grid) {
  
  let movesAvailable;
  do {
    movesAvailable = false;
    // Loop from top to bottom, left to right
    for(let i = 0; i < grid.length; i++) {
      const row = grid[i];

      for(let j = 0; j < row.length; j++) {
        let cell = row[j];

        if(cell !== 0) {
          // cell is occupied, an action must take place
          if(i !== 0) {
            // cell is occupied and not at top
            /*
            *  if cell above is 0, move current cell up one index
            *  if cell above is occupied, check cell above's value and .hasCombined
            *  if cell value is equal and .hasCombined is false, combine cells
            *  otherwise, do nothing
            */
            let cellAbove = grid[i-1][j];
            console.log(cellAbove, `${i}-${j}`);

            if(cellAbove === 0) {
              console.log("Cell above is 0");
              grid[i-1][j] = cell;
              grid[i][j] = 0;
              movesAvailable = true;

            } else {
              console.log("Cell above is occupied");

              // Cell above has same value, and neither cell has been combined previously
              if( cellAbove.value === cell.value && !cellAbove.hasCombined && !cell.hasCombined ) {
                console.log("These two cells are able to be combined!");
                cellAbove.value *= 2;
                cellAbove.hasCombined = true;
                grid[i][j] = 0;
                movesAvailable = true;

              }

            }

          }

        }
      }
    }

  } while(movesAvailable)

  // Set all .hasCombined to false so that next keypress is allowed to combine cells!
  setCombinedToFalse(grid);
  drawGrid(grid);

  console.log(grid);
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

function setCombinedToFalse(grid) {
  for(let i = 0; i < grid.length; i++) {
    for(let j = 0; j < grid[i].length; j++) {
      cell = grid[i][j];
      if(cell !== 0) {
        cell.hasCombined = false;
      }
    }
  }
}

function drawGrid(grid) {
  // container div is flex: column
  // row divs are flex: row

  const containerDiv = document.querySelector("#game");
  containerDiv.innerHTML = "";

  for(let i = 0; i < grid.length; i++) {
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("row");

    for(let j = 0; j < grid[i].length; j++) {
      const cell = grid[i][j];
      const cellDiv = document.createElement("div");
      cellDiv.classList.add("cell");

      if(cell === 0) {
        cellDiv.innerText = "";
      } else {
        cellDiv.innerText = cell.value;
      }
      rowDiv.append(cellDiv);
    }
    containerDiv.append(rowDiv);
  }
}

startGame();
