import { useState, useEffect } from 'react';
import './App.css';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import TodoFilters from './components/TodoFilters';
import DarkModeToggle from './components/DarkModeToggle';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');
  const [isEditing, setIsEditing] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    if (savedTodos) {
      setTodos(savedTodos);
    }
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : 'light';
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const addTodo = () => {
    if (inputValue.trim() === '') return;
    setTodos([...todos, { text: inputValue, completed: false }]);
    setInputValue('');
  };

  const toggleComplete = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const editTodo = (index) => {
    setIsEditing(index);
    setEditingText(todos[index].text);
  };

  const saveEdit = (index) => {
    const newTodos = [...todos];
    newTodos[index].text = editingText;
    setTodos(newTodos);
    setIsEditing(null);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'pending') return !todo.completed;
    return true;
  });

  return (
    <div className={`App ${darkMode ? 'dark' : 'light'}`}>
      <h1>Enhanced To-Do List</h1>
      <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      <TodoInput inputValue={inputValue} setInputValue={setInputValue} addTodo={addTodo} />
      <TodoFilters setFilter={setFilter} />
      <TodoList
        filteredTodos={filteredTodos}
        isEditing={isEditing}
        editingText={editingText}
        toggleComplete={toggleComplete}
        editTodo={editTodo}
        saveEdit={saveEdit}
        setEditingText={setEditingText}
        deleteTodo={deleteTodo}
      />
    </div>
  );
}

export default App;
