import React, { useState } from 'react'

function InputComponent() {

  const [nameOfTask, setnameOfTask] = useState([])
  const [id, setId] = useState(4)

  const addTodo = () => {
    setId(id + 1)
    const task = {id, nameOfTask}

    const response = fetch('http://localhost:3001/todos', {
      method: 'POST',
      headers: {"Content-type": "application/json"},
      body: JSON.stringify(task)
      })
    }

  return (
    <div className='head-container'>
      <div className="input-container">
        <h1>Todo</h1>
            <input type="text" value={nameOfTask} onChange={(e) => {setnameOfTask(e.target.value)}} />
            <button onClick={addTodo}>add</button>
        </div>
    </div>
  )
}

export default InputComponent