import React, { useEffect, useState } from 'react'

function TodoListComponent() {

  const [todos, setTodos] = useState([])
  const [nameOfTask, setnameOfTask] = useState('')
  
    const addTodo = async () => {
      const task = {nameOfTask, isDone: false}
      await  fetch('http://localhost:3001/todos', {
          method: 'POST',
          headers: {"Content-type" : "application/json"},
          body: JSON.stringify(task)
        })
        setnameOfTask('')
        getTask()
    }

    const checkTask = async (idNo) => {
      for(let todo of todos) {
        if(todo.id === parseInt(idNo)) {
          await fetch(`http://localhost:3001/todos/${idNo}`, {
            method: 'PUT',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ id: todo.id, nameOfTask: todo.nameOfTask, isDone: !todo.isDone })
          })
        }
      }
      getTask()
    }

    const deleteTask = async (idNo) => {
      for (let todo of todos) {
        if (todo.id === parseInt(idNo)) {
          await fetch(`http://localhost:3001/todos/${idNo}`, {
            method: 'DELETE',
            headers: { "Content-type": "application/json" }
          })
        }
      }
      getTask()
    }

    const handleKeyPress = (e) => {
      if(e.keyCode === 13) {
        addTodo()
      }
    }

    const getTask = () => {
      fetch('http://localhost:3001/todos').then(res => res.json()).then(data => setTodos(data))
    }

    useEffect(() => {
      getTask()
    }, [])
  

  return (
    <div>
      <div className='head-container'>
          <h1>Todo App</h1>
        <div className="input-container">
          <input type="text" id='textInput' placeholder='add new task...' value={nameOfTask} onChange={(e) => setnameOfTask(e.target.value)} onKeyUp={handleKeyPress}/>
          <button onClick={() => {
            addTodo()
          }}>add</button>
        </div>
      </div>
      <div className="todo-container">
        {todos.map(todo => (
            <div key={todo.id} className="todo-list">
              <div className="left-col">
                <input type="checkbox" name="" id="todoCheckbox" value={todo.id} onChange={(e) => checkTask(e.target.value)} />
                {todo.isDone === true ? <p className='through'>{todo.nameOfTask}</p> : <p>{todo.nameOfTask}</p>}
              </div>
              <div className="right-col">
                  <img src="../edit.svg" alt="" id='editSvg'/>
                  <img src="../del.svg" alt="" id='delSvg' onClick={() => deleteTask(todo.id)}/>
              </div>
            </div>
        ))}
      </div>
    </div>
  )
}

export default TodoListComponent