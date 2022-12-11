function startGame() {
  // Creates the games grid, adjust gridSize to change size of grid
  const gameDiv = document.querySelector("#game");
  const gridSize = 4;
  let gameGrid = new Array;

  for(let i = 0; i < gridSize; i++) {
    const row = new Array;
    gameGrid[i] = row;
    for(let j = 0; j < gridSize; j++) {
      row[j] = 0;
      const cellDiv = document.createElement("div");
      cellDiv.id = `${i}-${j}`;
      cellDiv.innerText = `${i}-${j}`;
      gameDiv.append(cellDiv);
    }
  }

  createEventListeners(gameDiv, gameGrid);
  console.log(gameGrid);
}

function createEventListeners(gameDiv, gameGrid) {
  document.addEventListener("keydown", e => {
    key = e.key;
    if(key === "w" || key === "a" || key === "s" || key === "d" || key === "W" || key === "A" || key === "S" || key === "D") {
      moveGrid(key);
    }
  });
}

function moveGrid(direction) {
  
}

startGame();
