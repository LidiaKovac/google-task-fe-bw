import { useState, useEffect } from "react";
import "./App.css";
import { HiOutlinePlusSm } from "react-icons/hi";
import { BsJournalPlus } from "react-icons/bs";
import { Dropdown } from "./components/Dropdown/Dropdown";
import { SingleTask } from "./components/SingleTask/SingleTask";
import { Modal } from "./components/Modal/Modal";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskIdToChange, setTaskIdToChange] = useState('')
  const [taskToChangeIsDone, setTaskToChangeIsDone] = useState(false)
  const [planners, setPlanners] = useState([]);
  const [open, setOpen] = useState(false);
  const [openPlanner, setOpenPlanner] = useState(false);
  const [selected, setSelected] = useState("");

  const fetchPlanners = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_URL}/planner`)
      if (response.ok) {
        const loadedPlanners = await response.json()
        setPlanners(loadedPlanners)
      } else {
        throw new Error('Failed to fetch!')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const setTaskAsDone = async () => {
    try {
      const request = await fetch(`${process.env.REACT_APP_URL}/task/${taskIdToChange}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify({ done: taskToChangeIsDone })
      })
      return await request.json()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => fetchPlanners(), [])
  useEffect(() => setTaskAsDone(), [taskToChangeIsDone])


  return (
    <>
      <div className="app__wrap">
        <img src="/assets/logo.png" alt="logo" />
        <div className="app__header">
          {selected !== "" && <small>Delete planner</small>}
          <div className="app__buttons">

            <Dropdown
              planners={planners}
              fetchSelPlanner={(tasks, sel) => {
                setTasks(tasks);
                setSelected(sel);
              }}
            />
            <div className="app__plus" onClick={() => setOpen((op) => !op)}>
              <HiOutlinePlusSm />
            </div>
            <div className="app__plus" onClick={() => setOpenPlanner((op) => !op)}>
              <BsJournalPlus />
            </div>
          </div>
        </div>

        {tasks?.map((task) => {
          return <SingleTask key={task.id} content={task.content} id={task.id} setDone={(taskId, isDone) => {
            setTaskIdToChange(taskId)
            setTaskToChangeIsDone(isDone)
          }} />;
        })}
      </div>
      <Modal type="task" planners={planners} isOpen={open} close={() => setOpen(false)} />
      <Modal type="planner" isOpen={openPlanner} close={() => setOpenPlanner(false)} />
    </>
  );
}

export default App;
