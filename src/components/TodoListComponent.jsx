import React, { useEffect, useState } from 'react'

function TodoListComponent() {

  const [todos, setTodos] = useState([])
  const [nameOfTask, setnameOfTask] = useState('')
  
  const addTodo = async () => {

    const task = {nameOfTask}

    await  fetch('http://localhost:3001/todos', {
        method: 'POST',
        headers: {"Content-type" : "application/json"},
        body: JSON.stringify(task)
      })
      setnameOfTask('')
      getTask()
    }

    const getTask =() => {
      fetch('http://localhost:3001/todos').then(res => res.json()).then(data => setTodos(data))
    }

    useEffect(() => {
      getTask()
    }, [])
  

  return (
    <div>
      <div className='head-container'>
          <h1>Todo</h1>
        <div className="input-container">
          <input type="text" id='textInput' value={nameOfTask} onChange={(e) => setnameOfTask(e.target.value)}/>
          <button onClick={() => {
            addTodo()
          }}>add</button>
        </div>
      </div>
      <div className="todo-container">
            {todos.map(todo => (
                <div key={todo.id} className="todo-list">
                  <div className="left-col">
                    <input type="checkbox" name="" id="todoCheckbox" />
                    <p>{todo.nameOfTask}</p>
                  </div>
                  <div className="right-col">
                      <img src="../edit.svg" alt="" id='editSvg'/>
                      <img src="../del.svg" alt="" id='delSvg'/>
                  </div>
                </div>
            ))}
      </div>
    </div>
  )
}

export default TodoListComponent