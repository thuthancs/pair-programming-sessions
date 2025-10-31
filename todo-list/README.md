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

## Key Takeaways + Mistakes

> We learn best through our own mistakes - someone said

- When I tried to create a progress bar that shows the number of completed tasks over the total tasks, I made a mistake of creating a variable called `let totalCompleted = 0` and then I incremented this variable by 1 as a task is checked. However, this didn't work because it's a regular variable and it will be reset to 0 at every render when I add a new task. As a result, I need to filter the tasks that are checked and compute the length on the `state` variable so it will render the correct completed tasks whenever the data change!
- When I tried to create a logic to push the completed task down to the array of todo items, I made a mistake of **mutating the state directly** by reassigning the value at the last index of the array. This is a dangerous mistake because as I change the state directly, on the next render, the reference stays the same! For example, I have a todo array:

```
[
    {"SS111": false},
    {"Capstone": false},
    {"Assignment": false}
]
```

If I check the first item as done, and I change the array directly, then the array becomes:

```
[
    {"Capstone": false},
    {"Assignment": false},
    {"SS111": false}
]
```

However, React will not rendered the updated array correctly because if you look at the code below, you can see that inside the `map()` function, I first mutated the original list to becomes the list above. But then, the `map()` creates a new array and I set the state to the `updatedList` so it's still based on the original positions, which means after checking the first item, the actual list rendered visually is different.

```
[
    {"SS111": true}, -> but the state is updated and referred to the 0-index
    {"Assignment": false},
    {"SS111": true} -> the original list being mutated directly
]
```

```javascript
function reorder(item, arr) {
  let idxToMove = arr.indexOf(item);
  if (idxToMove !== -1) {
    // Remove the item and store it
    let itemToMove = arr.splice(idxToMove, 1)[0];
    // Add the item to the end of the array
    arr.push(itemToMove);
  }
}

// Update the status of the todo Item when the check box is ticked
function handleComplete(id) {
  const updatedList = todoList.map((item) => {
    if (item.id === id) {
      // After the item is checked, it should be pushed to the end of the array
      reorder(item, todoList); // -> mutate the list directly
      return { ...item, done: !item.done };
    } else {
      return item;
    }
  });
  setTodoList(updatedList);
  totalCompleted += 1;
}
```

- Another situation I encountered was when the state is not rendered immediately after I added a new item. It was only displayed after I added another new item. For example, when I added "SS111", the todo list was not rendered, and only after I added "Assignment" was the previous item rendered. Then I learned that state updates are **asynchronous**. When I called `setTodoList(updatedList)`, the state didn't update immediately - React schedules the update for the next render. But I found this very [useful article](https://www.daggala.com/react-state-not-updating-immediately/) that helped me understand it better.

Here is my full chat with Claude: [https://claude.ai/share/3c3d441a-4fb6-4acc-abb7-cf725b4360b6](https://claude.ai/share/3c3d441a-4fb6-4acc-abb7-cf725b4360b6)
