// create a delete confirmation message

import React from 'react'
import "./DeleteModal.css";
import Axios from 'axios';

function Modal(props) {
  const key = props.id;
  const name = props.name;
  const closeModal = props.closeModal;
  const updateList = props.updateList;
  console.log(key);
  

  const deleteTask = (key) =>{
    Axios.delete(`http://localhost:3001/api/delete/${key}`);
    updateList(key);
    closeModal("");
  };

    
  return (
    <div className="deleteModalBackground">
        <div className="deleteModalContainer">
            <div className="closeBtn">
                <button onClick={()=>closeModal("")}> X </button>
            </div>
            <div className="question">
                <p>Are your sure to remove task: {name}?</p>
            </div>
            <div className="deleteFooter">
                <button onClick={()=>{deleteTask(key)}}>YES</button>
                <button id="cancel" onClick={()=>{closeModal("")}}>NO</button>
            </div>
        </div>
    </div>
  )
}

export default Modal