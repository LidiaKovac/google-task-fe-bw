import "./SingleTask.css"
import { BsCircle, BsCheckCircle } from "react-icons/bs"
import { useEffect, useState } from "react"
export const SingleTask = ({ content, id, setDone }) => {
  const [isChecked, setChecked] = useState(false)
  const [singleTask, setSingleTask] = useState
  const fetchSingleTask = async () => {
    try {
      let response = await fetch(`%{process.env.REACT_APP_BE_PROD_URL}/?`);
      if (response.ok) {
        let singleTask = await response.json();
        setSingleTask(singleTask);    }
    } catch (error) {
      
    }
  }

  useEffect(()=> {
    if(isChecked) { //if the task has been marked as done
      setTimeout(()=> {
        setDone(id)
      }, 500)
      console.log("isChecked");
    }
  }, [isChecked])
  return (
    <div className="single__wrap">
      <div className="single__checkmark" onClick={() => setChecked((check) => !check)}>
        {!isChecked ? <BsCircle /> : <BsCheckCircle />}
      </div>
      <div className="single__content"> {content} </div>
    </div>
  )
}
