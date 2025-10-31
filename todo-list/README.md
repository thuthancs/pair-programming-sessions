# Create a todo list in React Vite + JavaScript

## Planning

### Core Requirements

- Users can add a to-do item using a text area and click the submit button.
- The items in the to do list are organized in a vertical stack with the most recently added item on the top.
- Each to-do item has a check box. A checked box means the item is done.
- The checked item should be moved to the bottom of the stack.

### Stretch Goals

- Users can search for an item
- There is a progress bar (or another type of component) that shows how many items are completed to the total number of items

### Pseudocode

I can break this problem down into smaller subproblems that are more tractable:

- [x] Create a component that allows the user to enter their task name (input) and submit it
  - [x] A text area or an input element
  - [x] A button to submit the input
    - [x] A function to handle the submit (i.e., what is the action that should be taken when the users click the button) by pushing the item to the list
- [x] Create a component that displays a checkbox and the task name
- [x] Create a component that renders all the todo items on the main page with the most recently added item at the top and the checked items at the bottom
  - [x] Define a function to update the state of the todo list: 1) when a new task is created, it is inserted to the front of the list, and 2) when a task is marked as done, it is pushed down to the bottom of the list.
- [x] Create a component that shows how many tasks are done to the total number of tasks

I will write everything inside the `App.jsx` file first and will refactor the code later.
