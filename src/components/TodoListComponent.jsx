import React, { useEffect, useState } from 'react'

function TodoListComponent() {

  const [todos, setTodos] = useState([])
  const [nameOfTask, setnameOfTask] = useState('')
  const [editId, setEditId] = useState('')
  const [buttonText, setbuttonText] = useState('add')
  
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

    const getEdit = (idNo) => {
      for(let todo of todos) {
        if(todo.id === idNo) {
          setnameOfTask(todo.nameOfTask)
        }
      }
      setbuttonText('update')
      setEditId(idNo)
    }
    
    const editTask = async () => {
      for(let todo of todos) {
        if(todo.id === editId) {
          await fetch(`http://localhost:3001/todos/${editId}`, {
            method: 'PUT',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ id: todo.id, nameOfTask: nameOfTask, isDone: todo.isDone })
          })
        }
      }
      setnameOfTask('')
      getTask()
    }

    const handleKeyPress = (e) => {
      if(e.keyCode === 13) {
        addTodo()
      }
    }

    const getTask = async () => {
      await fetch('http://localhost:3001/todos').then(res => res.json()).then(data => setTodos(data))
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
          <button id='submit' onClick={() => {
            buttonText === 'add' ? addTodo() : editTask()}
          }>{buttonText}</button>
        </div>
      </div>
      <div className="todo-container">
        {todos.map(todo => (
            <div key={todo.id} className="todo-list">
              <div className="left-col">
                {todo.isDone === true ?
                <>
                {/* <input type="checkbox" name="" id="todoCheckbox" value={todo.id} onChange={(e) => checkTask(e.target.value)} checked/> */}
                <button className='done done-through' value={todo.id} onClick={(e) => checkTask(e.target.value)}>
                  ✅
                </button>
                <p className='through'>{todo.nameOfTask}</p>
                </>
                 : 
                <>
                {/* <input type="checkbox" name="" id="todoCheckbox" value={todo.id} onChange={(e) => checkTask(e.target.value)} /> */}
                <button className='done' value={todo.id} onClick={(e) => checkTask(e.target.value)}>
                  🕘
                </button>
                <p>{todo.nameOfTask}</p>
                </>
                 }
              </div>
              <div className="right-col">
                  <img src="../edit.svg" alt="" id='editSvg' onClick={() => getEdit(todo.id)}/>
                  <img src="../del.svg" alt="" id='delSvg' onClick={() => deleteTask(todo.id)}/>
              </div>
            </div>
        ))}
      </div>
    </div>
  )
}

export default TodoListComponent