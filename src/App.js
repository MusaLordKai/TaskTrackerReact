import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header'
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import Footer from './components/Footer'
import About from './components/About';

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
    //  console.log(data)
  }

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
    //  console.log(data)
  }



  //Add task
  const addTask = async (task) => {
    const res = await fetch(
      'http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(task),
    })
    const data = await res.json()
    setTasks([...tasks, data])
    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = {id, ...task}
    // setTasks([...tasks, newTask])
  }

  //delete task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`
      , {
        method: 'DELETE',
      })
    setTasks(tasks.filter((task) => task.id !== id))
  }

  //toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = {
      ...taskToToggle,
      reminder: !taskToToggle.reminder
    }
    const res = await fetch(`http://localhost:5000/tasks/${id}`,
      {
        method: 'PUT',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(updTask)
      })
    const data = await res.json()

    setTasks(tasks.map((task) =>
      task.id === id ?
        { ...task, reminder: !data.reminder } : task))
  }
  return (
    <Router>
      <div className="Container">
        <Header
          onShow={() => {
            setShowAddTask(prevShow => !prevShow)
          }}
          showAdd={showAddTask} />


        <Routes>
          <Route path="/" element={(props) => (
            <>
              {showAddTask && <AddTask onAdd={addTask} />}
              {tasks.length > 0 ?(
                <Tasks tasks={tasks}
                  onDelete={deleteTask}
                  toggleReminder={toggleReminder} 
                  />
   ) : ("No tasks to show")}
            </>
          )} />
          <Route path='/about' element={<About/>} />
        </Routes>
        <Footer />

      </div>
    </Router>

  );
}


export default App;
