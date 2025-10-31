import { useState } from 'react';
import './App.css';

function App() {
  // Initialize a todo item as an empty object and a todo list as an empty array
  const [todoItem, setTodoItem] = useState({})
  const [todoList, setTodoList] = useState([])
  
  const totalCompleted = todoList.filter(item => item.done).length

  // Whenever there is a change in the input of todo item, change the item based on the input
  function handleChange(e) {
    const newTodoItem = {
      id: crypto.randomUUID(),
      name: e.target.value,
      done: false
    }
    setTodoItem(newTodoItem)
    console.log(todoItem)
  }

  function reorder(item, arr) {
    let idxToMove = arr.indexOf(item)
    if (idxToMove !== -1) {
      // Remove the item and store it
      let itemToMove = arr.splice(idxToMove, 1)[0];

      // Add the item to the end of the array
      arr.push(itemToMove);
    }
  }

  // Update the status of the todo Item when the check box is ticked
  function handleComplete(id) {
    // Create updated list with toggled done status
    const updatedList = todoList.map(item => 
      item.id === id ? {...item, done: !item.done} : item
    )
    
    // Separate completed and incomplete items
    const incomplete = updatedList.filter(item => !item.done)
    const completed = updatedList.filter(item => item.done)
    
    // Put incomplete items first, completed items at the end
    setTodoList([...incomplete, ...completed])
  }
  
  // Update the todo list by adding the recently added item to the top of the array
  const handleSubmit = () => {
    const newTodoList = [todoItem, ...todoList]
    setTodoList(newTodoList)
    setTodoItem({}) 
    console.log(newTodoList)
  }


  return (
    <>
      <h1>Todo List</h1>
      <div>
        <p><span>{totalCompleted}</span>/<span>{todoList.length}</span></p>
      </div>
      <div className="todo-input-container">
        <input 
          className="todo-input"
          value={todoItem.name || ''} 
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <div className="todo-list">
        {todoList.map(item => (
          <div key={item.id} className={`todo-item ${item.done ? 'completed' : ''}`}>
            <input 
              type="checkbox" 
              className="todo-checkbox"
              checked={item.done} 
              onChange={() => handleComplete(item.id)}
            />
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
