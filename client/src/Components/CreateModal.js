import React, {useState} from 'react'
import "./CreateModal.css";
import Axios from 'axios';

// TODO: add validation that checks for repeated task names

function Modal(props) {
  const[taskName, setTaskName] = useState("");
  const[description, setDescription] = useState("");
  const[time, setTime] = useState(0);
  const[id, setId] = useState("");
  const[isDone, setIsDone] = useState(false);
  const closeModal = props.closeModal;
  const updateList = props.updateList;
  const [error, setError] = useState(false);

  const submitTask = () =>{
    if(!taskName.trim()){
      setError(true);
      return null;
    }
    Axios.post('http://localhost:3001/api/insert', {
      taskName: taskName, 
      taskDescription: description,
      time: 0,
    }).then(response=>{
      setId(response.data);
    });
    //console.log(id);
    updateList({id, taskName, description, isDone});
    closeModal(false);
  };

    
  return (
    <div className="modalBackground">
        <div className="modalContainer">
            <div className="closeBtn">
                <button onClick={()=>closeModal(false)}> X </button>
            </div>
            <div className="title">
                <h1>New Task</h1>
            </div>
            <div className="body">
              <label for="description">Task</label><input type="text"
                className="inputName" 
                name="taskName" 
                required
                maxLength={100} 
                placeholder='Enter task name'
                onChange={(e)=>{
                    setTaskName(e.target.value);
                }}/>
                <label for="description">Description</label><input type="text" 
                name="description"
                className="inputDescription" 
                maxLength={1000} 
                placeholder='Enter task description (optional)'
                onChange={(e)=>{
                    setDescription(e.target.value);
                }}/>
            </div>
            <div className="footer">
                <button onClick={()=>{submitTask()}}>Sumbit</button>
                {error && <span className="error">Task cannot be empty!</span>}
            </div>
        </div>
    </div>
  )
}

export default Modal