# Tic Tac Toe Game (React + JavaScript)

## How to run

1. Clone this repo

```
git clone https://github.com/thuthancs/pair-programming-sessions
```

2. Run the app

```
cd tic-tac-toe
npm install
npm run dev
```

## Interview Structure

### Overview

- **Total Duration:** 1.5 hours
- **Tech Stack:** JavaScript, React
- **Problem Statement:** You are given a standard 3x3 Tic Tac Toe game written in JavaScript and the React library. However, a 3x3 TTT game played by 2 humans is pretty boring. In today’s interview, we will work on two problems: 1) design an algorithm for a computer to play against a human, and 2) generalize the game rules to work on a larger grid.
- **What is provided**:
  - A program that lets two humans play a game of Tic Tac Toe on a 3x3 grid.
  - The program should let the players take turns to input their moves.
  - The program should report the outcome of the game.
- **Logistics:**
  - A GitHub repo will be sent beforehand: https://github.com/thuthancs/pair-programming-sessions
  - At the beginning of the interview, the interviewee clones the repo
  - All the changes will be pushed to the repo
  - We will mirror our screens for better coordination

### Interview Tasks

- **Interviewer’s Tasks:**
  - When the interviewee gets stuck on a syntax, jump in and help them with that. The most important thing is their thinking process, and they should not spend too much time worrying about syntax.
  - Ask guiding questions or provide scaffolding code for a specific function(s) when the interviewee gets and is able to describe the conceptual idea, but struggles to implement it in code.
  - Keep an eye on the time!
- **Tasks to be done during your interview**:
  | Task | Duration (minutes) | Detail |
  | --- | --- | --- |
  | Explain the codebase | 10 | Explain the key functions, what the code does and answer some questions about React |
  | Improve the code | 20 | Currently, the code is hardcoded with a 3x3 grid setup. How can you make the code more generalizable, meaning it takes the user input and generate a grid based on the size of choice? |
  | Add new feature to the code | 45 | Add an algorithm for a computer player to your game (human vs. AI) on the 3x3 grid. The requirement is that your algorithm has to always win or reach a draw. |
  | Discussion | 15 | What do you think about the current code? What went well? What could be improved after this interview? |

- **Questions to be asked**:

  1. Why do we have to make a copy of the squares in this snippet of code? Why not modifying the board directly? Can you come up with a practical example with the similar situation where we need to make a copy of the current state?

     ```javascript
     const nextSquares = squares.slice();

     // If the next turn is X, then change the value of the square to X, else change it to O
     if (xIsNext) {
       nextSquares[i] = "X";
     } else {
       nextSquares[i] = "O";
     }

     // The next turn's state will be the modified board
     onPlay(nextSquares);
     ```

  2. Explain what this snippet of code does in detail

     ```javascript
     const [history, setHistory] = useState([Array(9).fill(null)]);
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
     ```

  3. Currently, the function to calculate the winner hardcodes all the possible lines of winning. However, it is not the best approach to make your code more generalizable on a larger grid. How can you fix that?
  4. A follow-up on the previous question: Now, how can you take in the user input of desired grid size and render a board of nxn matrix?
  5. Now, let's move on to add another new feature for a computer to play against humans. We can start by brainstorming the strategy first conceptually and in pseudocode before implementing it.

Credit: https://www.recurse.com/pairing-tasks
