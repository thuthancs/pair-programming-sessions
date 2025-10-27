import { useState } from 'react';
import './App.css';

function App() {
  // Initialize the todo list which will be updated via the function setTodo
  const [todo, setTodo] = useState([])

  // Define the function to update the todo list
  setTodo = () => {
    const todoItem = {"name": input.value.trim(), "active": false}
    todo.push(todoItem)
    console.log(todo)
  }

  // Define the function to handle the change in an input
  const handleChange = (val) => {
    const [val, ...todo] = todo
    console.log(todo)
  }
  
  // Call the setTodo function when user clicks submit
  const handleSubmit = () => {
    setTodo(todo)
  }


  return (
    <>
      <h1>Todo List</h1>
      <div>
        <input onChange="handleChange()"></input>
        <button onClick="handleSubmit()"></button>
      </div>
    </>
  )
}

export default App
