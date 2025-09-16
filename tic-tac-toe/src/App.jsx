import { useState } from 'react';
import './App.css';

// The square component (the single cell on the grid)
function Square({ value, onSquareClick }) {
  return (
    // When clicked, this button calls onSquareClick (passed from the parent).
    // The parent updates state, and React re-renders this Square with a new value (X or O).
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  )
}

// The board component that contains the Square component 
function Board({ xIsNext, squares, onPlay }) {

  // Define the function to trigger a square when it is clicked
  function handleClick(i) {
    // Calculate the winner of the current state or check if the current square is already ticked
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    /* 
    Create a shallow copy of the original board
    We make a shallow copy instead of modifying the board directly 
    because React state must be updated immutably for reliable re-renders.
    */
    const nextSquares = squares.slice();

    // If the next turn is X, then change the value of the square to X, else change it to O
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }

    // The next turn's state will be the modified board
    onPlay(nextSquares);
  }

  // Calculate the winner and update the status until there is a winner
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X': 'O');
  }

  return (
    // There are a total of 9 squares in the board and on top of the board is the status that shows the winner or the next player's turn
    // The value of each square is defined as the value at that cell and the onSquareClick trigger is now updated to use the handleClick() function
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  // History stores snapshots of the board. Start with one empty board of 9 nulls.
  const [history, setHistory] = useState([Array(9).fill(null)]);

  // The initial move starts at 0
  const [currentMove, setCurrentMove] = useState(0);

  // Alternate players: even moves = X, odd moves = O.
  const xIsNext = currentMove % 2 === 0;

  // The current board state is defined as the history at the current move
  const currentSquares = history[currentMove];

  // Define the function to handle the next state of the squares
  function handlePlay(nextSquares) {
    /* The spread operator (...) unpacks all the elements of the sliced array
    .slice(start, end) returns a shallow copy of a portion of the array.
    Here it takes the elements from index 0 up to (but not including) currentMove + 1.
    That means it keeps only the "past" history up to and including the current move.
    */
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  // Build a list of buttons to jump to any past move.
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    )
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

// Helper function to calculate the winner with the parameter of the squares
// TODO: Make the function more generalizable instead of hardcoding winning lines
/*
  - squares is an array -> how to transform it back to a matrix?
  - first, we can take the square root of the array's length to get the length of the row and column: len = Math.sqrt(squares.length)
  - create a helper function to turn an array into a square matrix
    function arrayToMatrix(squares, columns) {
      const matrix = [];
      for (i = 0; i < squares.length; i += columns) {
        matrix.push(squares.slice(i, i + columns))
      }
      return matrix
    }
  - create a helper function to check if all elements of an array are the same
  - create 3 helper functions to check the winning lines in 3 directions
*/
function calculateWinner(squares) {
  const columns = Math.sqrt(squares.length);
  if (!Number.isInteger(columns)) throw new Error("Board must be square");

  const matrix = [];
  for (let i = 0; i < squares.length; i += columns) {
    matrix.push(squares.slice(i, i + columns));
  }

  const areAllElementsSame = (arr) => arr[0] && arr.every(el => el === arr[0]);

  // Horizontal
  for (let r = 0; r < columns; r++) if (areAllElementsSame(matrix[r])) return matrix[r][0];

  // Vertical
  for (let c = 0; c < columns; c++) {
    const col = matrix.map(row => row[c]);
    if (areAllElementsSame(col)) return col[0];
  }

  // Diagonals
  const diag1 = matrix.map((row, i) => row[i]);
  const diag2 = matrix.map((row, i) => row[columns - 1 - i]);
  if (areAllElementsSame(diag1)) return diag1[0];
  if (areAllElementsSame(diag2)) return diag2[0];

  return null;
}