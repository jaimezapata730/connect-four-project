/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
 for (let y = 0; y < HEIGHT; y++) {
  board.push(Array.from({length: WIDTH}));
 } // TODO: set "board" to empty HEIGHT x WIDTH matrix array
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  const board=document.getElementById("board")// TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"

  //// This code creates a table row element with an id of "column-top" and adds an event listener for the click event, it appends the table row to the board.
  // TODO: add comment for this code
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  board.append(top);

  // Creates a table row and cells for each element in the board array.
  // TODO: add comment for this code
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");

    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    board.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
    for (let y = HEIGHT - 1; y >= 0; y--) {
      if (!board[y][x]) {
        return y;
      }
    }
    return null;   // TODO: write the real version of this, rather than always returning 0
  }

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  const piece = document.createElement("div");
  piece.classList.add("piece");
  piece.classList.add(`p${currPlayer}`);
  piece.style.top = -50 * (y + 2);

  const spot = document.getElementById(`${y}-${x}`);
  spot.append(piece);
}
 
  // TODO: make a div and insert into correct table cell


/** endGame: announce game end */

function endGame(msg) {
  alert(msg);
}
  // TODO: pop up alert message


/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  board[y][x] = currPlayer;
  placeInTable(y, x);
  
  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }
  
  // check for tie
  if (board.every(row => row.every(cell => cell))) {
    return endGame("Tie!");
  }
    
  // switch players
  currPlayer = currPlayer === 1 ? 2 : 1;
}


// TODO: check if all cells in board are filled; if so call, call endGame
/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.
// Checks whether a given game board contains four consecutive pieces in a row
// It is done by looping through the board and checking the horizontal, vertical, diagonal 
// right-down, and diagonal left-down positions of each piece on the board to see if 
// those four spots contain the same piece type. If they do, the _win() function returns true. 
  for (let y = 0; y < HEIGHT; y++) {  // Loop through each row 
    for (let x = 0; x < WIDTH; x++) {  // Loop through each column 
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];  // Horizontal coordinates from the current position
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];  // Vertical coordinates from the current position
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];  // Diagonal coordinates from the current position (Right-Down)
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];  // Diagonal coordinates from the current position (Left-Down)

      // Check if any of the four directions produce a winning combination
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
