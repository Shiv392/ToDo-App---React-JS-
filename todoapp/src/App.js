import React, { useState, useEffect } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodoText, setNewTodoText] = useState('');
  const [editTodoIndex, setEditTodoIndex] = useState(-1);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  function handleAddTodo() {
    if (newTodoText) {
      setTodos([...todos, newTodoText]);
      setNewTodoText('');
    }
  }

  function handleDeleteTodo(index) {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }

  function handleEditTodoTextChange(event) {
    const newTodos = [...todos];
    newTodos[editTodoIndex] = event.target.value;
    setTodos(newTodos);
  }

  function handleEditTodoSave() {
    setEditTodoIndex(-1);
  }

  function handleEditTodoCancel() {
    setEditTodoIndex(-1);
  }

  function handleTodoClick(index) {
    setEditTodoIndex(index);
  }

  function handleNewTodoTextChange(event) {
    setNewTodoText(event.target.value);
  }

  return (
    <div className='container mt-3'>
      <h1>Todo List</h1>
      <div>
        <input type="text" value={newTodoText} onChange={handleNewTodoTextChange} />
        <button className='btn btn-primary' onClick={handleAddTodo}>Add Todo</button>
      </div>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {editTodoIndex === index ? (
              <>
                <input type="text" value={todo} onChange={handleEditTodoTextChange} />
                <button className='btn btn-secondary' onClick={handleEditTodoSave}>Save</button>
                <button className='btn btn-dark' onClick={handleEditTodoCancel}>Cancel</button>
              </>
            ) : (
              <>
                <span onClick={() => handleTodoClick(index)}>{todo}</span>
                <button className='btn btn-danger' onClick={() => handleDeleteTodo(index)}>Delete</button>
                <button className='btn btn-warning' onClick={() => handleTodoClick(index)}>Edit</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;