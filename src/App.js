import React, {useEffect} from "react";
import ToDoList from "./ToDo/ToDoList";
import Context from "./context";
import Loader from "./Loader";
import Modal from "./Modal/Modal";

const AddToDo = React.lazy(() => import('./ToDo/AddToDo'))
// const AddToDo = React.lazy(() => new Promise(resolve => {
//   setTimeout(() => {
//     resolve(import('./ToDo/AddToDo'))
//   }, 3000);
// }))


function App() {
  const [todos, setTodos] = React.useState([]),
        [loading, setLoading] = React.useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos/?_limit=5')
      .then(response => response.json())
      .then(todos => {
        setTodos(todos);
        setLoading(false);
      })
  }, [])

  function toggleToDo(id) {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo
      })
    )
  }

  function removeTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  function addToDo(title) {
    setTodos(todos.concat([
      {
        title,
        id: Date.now(),
        completed: false      
      }
    ]))
  }

  return (
    <Context.Provider value={{removeTodo}}>
      <div className="wrapper">
        <h1>React tutorial</h1>
        <Modal/>

        <React.Suspense fallback={<p>Loading...</p>}>
          <AddToDo onCreate={addToDo}/>
        </React.Suspense>


        {loading && <Loader/>}
        {todos.length ? (
          <ToDoList todos={todos} onToggle={toggleToDo}/>
        ) : loading ? null : (
          <p>No items =(</p>
        )}
      </div>
    </Context.Provider>
  );
}

export default App;
