import { useState } from 'react';
import './App.css';

function App() {
  // Initialize a todo item as an empty object and a todo list as an empty array
  const [todoItem, setTodoItem] = useState({})
  const [todoList, setTodoList] = useState([])

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

  // Update the status of the todo Item when the check box is ticked
  function handleComplete(id) {
    const updatedList = todoList.map(item => {
      return item.id === id ? {...item, done: !item.done} : item
    })
    setTodoList(updatedList)
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
