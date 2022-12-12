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
      moveUp(grid);
      break;
  
    case "ArrowDown":
      moveDown(grid);
      break;

    case "ArrowLeft":
      moveLeft(grid);
      break;

    case "ArrowRight":
      moveRight(grid);
      break;
  }

  setCombinedToFalse(grid);
  createNewCells(grid, 1);
  drawGrid(grid);
}

function createNewCells(grid) {
  // Create a random number between 0 (inclusive) and grid length squared (exclusive), then floor it
  // Check if that place in the grid is occupied
  // if true, repeat the function
  // if false, place the new cell in that place.
  // Better performance, only one random number generated and no looping required

  let randNum = Math.floor(Math.random() * (grid.length ** 2));

  const row = Math.floor(randNum / grid.length);
  const column = randNum - row * grid.length;

  if(grid[row][column] === 0) {
    grid[row][column] = { value: 2, hasCombined: false };
  } else {
    console.log("Iteration");
    createNewCells(grid);
  }

  console.log(randNum);
  console.log(row, column);

  


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

            if(cellAbove === 0) {
              grid[i-1][j] = cell;
              grid[i][j] = 0;
              movesAvailable = true;

            } else {

              // Cell above has same value, and neither cell has been combined previously
              if( cellAbove.value === cell.value && !cellAbove.hasCombined && !cell.hasCombined ) {
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
}

function moveDown(grid) {
  // Loop from bottom to top, left to right

  let movesAvailable;
  do {
    movesAvailable = false;
    for(let i = grid.length - 1; i >= 0; i--) {
      const row = grid[i];

      for(let j = 0; j < row.length; j++) {
        let cell = row[j];

        if(cell !== 0) {
          if(i !== grid.length - 1) {
            let cellBelow = grid[i+1][j];

            if(cellBelow === 0) {
              // Move to take it's place
              grid[i+1][j] = cell;
              grid[i][j] = 0;
              movesAvailable = true;

            } else {
              // Check if it can be combined
              if( cellBelow.value === cell.value && !cellBelow.hasCombined && !cell.hasCombined ) {
                cellBelow.value *= 2;
                cellBelow.hasCombined = true;
                grid[i][j] = 0;
                movesAvailable = true;
              }
            }
          }
        }
      }
    }
  } while (movesAvailable)
}

function moveLeft(grid) {
  // Loop from left to right, top to bottom

  let movesAvailable;
  do {
    movesAvailable = false;
    for(let i = 0; i < grid.length; i++) {
      const row = grid[i];

      for(let j = 0; j < row.length; j++) {
        let cell = row[j];

        if(cell !== 0) {
          if(j !== 0) {
            let cellLeft = row[j-1];

            if(cellLeft === 0) {
              // Move to take it's place
              row[j-1] = cell;
              row[j] = 0;
              movesAvailable = true;
            } else {
              // Check if it can be combined
              if( cellLeft.value === cell.value && !cellLeft.hasCombined && !cell.hasCombined ) {
                cellLeft.value *= 2;
                cellLeft.hasCombined = true;
                row[j] = 0;
                movesAvailable = true;
              }
            }
          }
        }
      }
    }
  } while (movesAvailable)
}

function moveRight(grid) {
  // Loop from right to left, top to bottom
  let movesAvailable;

  do {
    movesAvailable = false;
    for(let i = 0; i < grid.length; i++) {
      row = grid[i];

      for(let j = row.length - 1; j >= 0; j--) {
        let cell = row[j];

        if(cell !== 0) {
          if(j !== row.length - 1) {
            let cellRight = row[j+1];

            if(cellRight === 0) {
              // Move to take it's place
              row[j+1] = cell;
              row[j] = 0;
              movesAvailable = true;
            } else {
              // Check if it can be combined

              if( cellRight.value === cell.value && !cellRight.hasCombined && !cell.hasCombined ) {
                cellRight.value *= 2;
                cellRight.hasCombined = true;
                row[j] = 0;
                movesAvailable = true;
              }
            }
          }
        }
      }
    }
  } while(movesAvailable)
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
