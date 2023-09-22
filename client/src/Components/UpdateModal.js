// TODO: create a modal handling updates

import React, {useState} from 'react'
import "./UpdateModal.css";
import Axios from 'axios';
import DeleteModal from './DeleteModal';

function Modal(props) {
  const id = props.id;
  const time = props.time;
  const [taskName, setTaskName] = useState(props.name);
  const [description, setDescription] = useState(props.description);
  const closeModal = props.closeModal;
  const updateList = props.updateList;
  const removeFromList = props.removeFromList;
  //console.log(id);
  const[openDeleteModal, setOpenDeleteModal] = useState(false);
  

  const updateTask = (id)=>{
    Axios.put('http://localhost:3001/api/update',{
      id: id,
      taskName: taskName,
      taskDescription: description
    });
    console.log(id);
    updateList({id:id, name:taskName, time:time, description:description});
    closeModal("");
  };

    
  return (
    <div className="updateModalBackground">
        <div className="updateModalContainer">
            <div className="closeBtn">
                <button onClick={()=>closeModal("")}> X </button>
            </div>
            <div className="body">
            <label for="taskName">New task name </label><input type="text" 
                name="taskName" 
                className="inputName"
                maxLength={1000} 
                placeholder="Enter new task name (optional)"
                onChange={(e)=>{
                    setTaskName(e.target.value);
                }}/>
                <label for="description">New description </label><input type="text" 
                name="description" 
                className="inputDescription"
                maxLength={1000} 
                placeholder='Enter new task description (optional)'
                onChange={(e)=>{
                    setDescription(e.target.value);
                }}/>
            </div>
            <div className="footer">
                <button id="apply" onClick={()=>{updateTask(id)}}>Apply Changes</button>
                <button id="deleteBtn"
                  onClick = {()=>{
                    setOpenDeleteModal(true);
                  }}>Delete Task</button>
                  {openDeleteModal && <DeleteModal id={id} name={taskName} updateList={removeFromList} closeModal={setOpenDeleteModal}/>}
                   
                {/* <button id="cancel" onClick={()=>{closeModal("")}}>NO</button> */}
            </div>
        </div>
    </div>
  )
}

export default Modal