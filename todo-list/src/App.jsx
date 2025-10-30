import { useState } from 'react';
import './App.css';

function App() {
  // Initialize the todo list which will be updated via the function setTodo
  const [todoItem, setTodoItem] = useState("")
  const [todoList, setTodoList] = useState([todoItem])

  // Whenever there is a change in the input of todo item, change the item based on the input
  function handleChange(e) {
    setTodoItem(e.target.value)
    console.log(todoItem)
  }
  
  // Update the todo list
  const handleSubmit = () => {
    const [todoItem, ...todoList] = todoList
    todoList.shift(todoItem)
    setTodoList(todoList)
    console.log(todoList)
  }


  return (
    <>
      <h1>Todo List</h1>
      <div>
        <input onChange={handleChange}></input>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <div>
        {todoList}
      </div>
    </>
  )
}

export default App
