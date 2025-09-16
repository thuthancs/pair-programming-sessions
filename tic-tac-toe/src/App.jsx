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
function calculateWinner(squares) {
  // All of the possible trajectories that a player can win (vertically, horizontally, diagonally) 
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // For each line of the possible win trajectories, unpack the 3 indices associated with that line
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    // If the value at all 3 indices are the same, then return the winner
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}