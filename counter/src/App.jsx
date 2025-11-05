import { useState } from 'react';
import './App.css';

export default function App() {
  const [count, setCount] = useState(0)

  const handleClick = () => {
    setCount(prev => prev + 1)
  }

  return (
    <>
      <button onClick={handleClick}>{count}</button>
    </>
  )
}