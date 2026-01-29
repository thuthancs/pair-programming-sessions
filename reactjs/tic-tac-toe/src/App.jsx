import { useState } from 'react';
import "./App.css";

function checkWinner(grid, rowIdx, colIdx) {
  const player = grid[rowIdx][colIdx];
  
  // Don't check if cell is empty
  if (player === "") return null;
  
  // Horizontal
  if (grid[rowIdx].every(value => value === player)) {
    return `Winner is ${player}`;
  } 
  
  // Vertical
  if (grid.every(row => row[colIdx] === player)) {
    return `Winner is ${player}`;
  } 
  
  // Main diagonal (top-left to bottom-right)
  if (rowIdx === colIdx) {
    if (grid.every((row, idx) => row[idx] === player)) {
      return `Winner is ${player}`;
    }
  } 
  
  // Anti-diagonal (top-right to bottom-left)
  if (rowIdx + colIdx === grid.length - 1) {
    if (grid.every((row, idx) => row[grid.length - 1 - idx] === player)) {
      return `Winner is ${player}`;
    }
  }
  
  return null;
}

function App() {
  const [grid, setGrid] = useState(Array.from({ length: 3 }, () => Array(3).fill("") ));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [lastMove, setLastMove] = useState(null);
  const [winner, setWinner] = useState(null);

  const handleClick = (rowIdx, colIdx) => {
    // Don't allow clicks if there's already a winner or cell is filled
    if (winner || grid[rowIdx][colIdx] !== "") return;

    setGrid((prev) => {
      const newGrid = prev.map(row => [...row]);
      newGrid[rowIdx][colIdx] = currentPlayer;
      
      // Check for winner with the new grid
      const result = checkWinner(newGrid, rowIdx, colIdx);
      if (result) {
        setWinner(result);
      }
      
      return newGrid;
    });
    
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  return (
    <>
      <h1>Tic Tac Toe</h1>
      <div className="grid-container">
        {grid.map((row, rowIdx) => 
          row.map((cell, colIdx) => {
            return (
              <div 
                key={`${rowIdx}${colIdx}`} 
                onClick={() => handleClick(rowIdx, colIdx)}
              >
                {cell}
              </div>
            );
          })
        )}
      </div>
      <div>
        {winner && <h2>{winner}</h2>}
      </div>
    </>
  );
}

export default App;