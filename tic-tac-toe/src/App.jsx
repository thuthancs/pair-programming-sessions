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
function Board({ xIsNext, squares, onPlay, boardSize }) {

  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) return;
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  const status = winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`;

  // Render rows dynamically
  const rows = [];
  for (let r = 0; r < boardSize; r++) {
    const rowSquares = [];
    for (let c = 0; c < boardSize; c++) {
      const idx = r * boardSize + c;
      rowSquares.push(
        <Square key={idx} value={squares[idx]} onSquareClick={() => handleClick(idx)} />
      );
    }
    rows.push(
      <div key={r} className="board-row">
        {rowSquares}
      </div>
    );
  }

  return (
    <>
      <div className="status">{status}</div>
      {rows}
    </>
  );
}

export default function App() {
  // Input for user-defined grid size
  const [sizeInput, setSizeInput] = useState(3);   // controlled input
  const [boardSize, setBoardSize] = useState(3);   // actual board size used in Game

  const [history, setHistory] = useState([Array(3 ** 2).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  // Start a new game with the selected board size
  function startNewGame() {
    setBoardSize(sizeInput);
    setHistory([Array(sizeInput ** 2).fill(null)]);
    setCurrentMove(0);
  }

  const moves = history.map((squares, move) => (
    <li key={move}>
      <button onClick={() => jumpTo(move)}>
        {move === 0 ? 'Go to game start' : `Go to move #${move}`}
      </button>
    </li>
  ));

  return (
    <div className="game">
      <div className="game-settings">
        <label>
          Grid size:
          <input
            type="number"
            value={sizeInput}
            min={2}
            onChange={(e) => setSizeInput(parseInt(e.target.value))}
          />
        </label>
        <button onClick={startNewGame}>Start Game</button>
      </div>

      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
          boardSize={boardSize}
        />
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