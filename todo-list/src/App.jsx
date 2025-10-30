import { useState } from 'react';
import './App.css';

function App() {
  // Initialize a todo item as an empty object and a todo list as an empty array
  const [todoItem, setTodoItem] = useState({})
  const [todoList, setTodoList] = useState([])

  // Whenever there is a change in the input of todo item, change the item based on the input
  function handleChange(e) {
    setTodoItem({
      id: crypto.randomUUID(),
      name: e.target.value,
      done: false
    })
    console.log(todoItem)
  }

  function handleComplete(e) {
    if (e.target.value == "checked") {
      setTodoItem({
        ...todoItem,
        done: true
      })
    }
  }
  
  // Update the todo list by adding the recently added item to the top of the array
  const handleSubmit = () => {
    todoList.unshift(todoItem)
    setTodoList(todoList)
    
    console.log(todoList)
  }


  return (
    <>
      <h1>Todo List</h1>
      <div>
        <input value={todoItem.name} onChange={handleChange}></input>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <div>
        {todoList.map(todoItem => (
          <div onChange={handleComplete} key={todoItem.id}>
            <input type="checkbox"></input>
            {todoItem.name}
          </div>
        ))}
      </div>
    </>
  )
}

export default App
