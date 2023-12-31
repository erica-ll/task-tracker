import React, {useState, useEffect} from 'react';
import './App.css';
import Axios from 'axios';
import CreateModal from './Components/CreateModal';
import DeleteModal from './Components/DeleteModal';
import UpdateModal from './Components/UpdateModal';
import Clock from './Components/Clock';

function App() {
  const[taskList, setTaskList] = useState([]);
  const[finishedList, setFinishedList] = useState([]);
  
  // Variables for opening modals
  const[openCreateModal, setOpenCreateModal] = useState(false);
  const[openCompleteModal, setOpenCompleteModal] = useState(false);
  const[selectedDelete, setSelectedDelete] = useState("empty");
  const[selectedUpdate, setSelectedUpdate] = useState("empty");
  const[selectedTimer, setSelectedTimer] = useState("empty");
  let timeTotal = 0;

  useEffect(()=>{
    Axios.get('http://localhost:3001/api/get').then((response)=>{
      setTaskList(response.data);
    });

    Axios.get('http://localhost:3001/api/completed/get').then((response)=>{
      setFinishedList(response.data);
    });
  },[]);

  const updateList = (task)=>{
    setTaskList([...taskList, {
      id: task.id,
      taskName: task.taskName, 
      taskDescription: task.description,
      time: 0,
      isDone: task.isDone
    }]);
    window.location.reload(false);
  };

  function removeFromList(task) {
    setTaskList(oldValues => oldValues.filter(item => item.id != task))
  }

  const updateTaskInfo = (task)=>{
    const newState = taskList.map(item =>{
      if(item.id == task.id){
        return {id: task.id, taskName: task.name, taskDescription: task.description, time: task.time, isDone: false}
      }
      return item;
    })
    setTaskList(newState);
  }

  const handleFinish = (id)=>{
    taskList.map(item =>{
      if(item.id == id){
        const temp = {
          id: item.id, 
          taskName: item.taskName, 
          taskDescription: item.taskDescription,
          time: item.time,
          isDone: true
        };
        Axios.post('http://localhost:3001/api/completed/insert', temp)
        .then(response=>{
          console.log(response.data.value);
          setFinishedList([...finishedList, {
            id: response.data.value, 
            taskName: item.taskName, 
            taskDescription: item.taskDescription,
            time: item.time,
            isDone: true
          }]);
          Axios.delete(`http://localhost:3001/api/delete/${id}`);
          setTaskList(oldValues => oldValues.filter(item => item.id != id));
        });
      }
    })
  }


  const handleRetrieve = (id)=>{
    finishedList.map(item =>{
      if(item.id == id){
        const temp = {
          taskName: item.taskName, 
          time: item.time,
          taskDescription: item.taskDescription,
          isDone: false
        };
          Axios.delete(`http://localhost:3001/api/completed/delete/${id}`);
          setFinishedList(oldValues => oldValues.filter(item => item.id != id));
      }
    })
  }

  const calculateTime = ()=>{
    taskList.map(item=>{
      timeTotal = timeTotal + item.time;
      console.log(item);
      console.log(timeTotal);
    });
    finishedList.map(item=>{
      timeTotal = timeTotal + item.time;
      console.log(item);
      console.log(timeTotal);
      });
  }


  return (
    <div className="App">
      <h1 id="title">
        TODO List
      </h1>
      <div className='totalMessage'>
        {calculateTime()}
        <p>You have worked for {("0" + Math.floor(timeTotal / 60)).slice(-2)}:{("0" + Math.floor(timeTotal % 60)).slice(-2)} so far!</p>
      </div>

      <div className="form">
        <div className="header">
          <button id="createModal" 
        onClick={()=>{
          setOpenCreateModal(true);
        }}>Create Task</button>

        <button id="showComplete" 
        onClick={()=>{
          setOpenCompleteModal(true);
        }}>Completed Tasks</button>
        </div>
        

        {openCreateModal && <CreateModal closeModal={setOpenCreateModal} updateList={updateList}/>}
        {openCompleteModal && 
          <div className="completeModalBackground">
            <div className="completeModalContainer">
            <div className="closeBtn">
                <button onClick={()=>setOpenCompleteModal(false)}> X </button>
            </div>
            <h1 className='title'>Completed Tasks </h1>
            {finishedList.slice(-5).map((val)=>{
              return (
                <div className="completeCard" key={val.id}>
                  <h1>{val.taskName}</h1> 
              <button id="retrieveBtn" onClick={()=>{
                handleRetrieve(val.id);
              }}
              >Delete</button>
              {selectedDelete == val.id && <DeleteModal id={val.id} name={val.taskName} closeModal={setSelectedDelete} updateList={removeFromList}
              />}
                  </div>
              )
            })}
            </div>
          </div>}
        {taskList.map((val)=>{
          return (
            <div className="card" key={val.taskName}>
              <input type="checkbox" id="checkBox" onChange={()=>{
                handleFinish(val.id);
              }}/>
            <h1>{val.taskName}:</h1> <p>{val.taskDescription}</p>
            

            <button id="updateBtn"
            onClick={()=>{
              setSelectedUpdate(val.id)}}>Edit</button>
              {selectedUpdate == val.id && <UpdateModal id={val.id} name={val.taskName} description={val.taskDescription} time = {val.time} closeModal={setSelectedUpdate} updateList={updateTaskInfo} removeFromList={removeFromList}
              />}
              <button id="startTimer"
              onClick={()=>{
                setSelectedTimer(val.id)}}>Start</button>
                {selectedTimer == val.id && <Clock id={val.id} name = {val.taskName} description = {val.taskDescription} closeModal={setSelectedTimer} updateList={updateTaskInfo}
                />}
              
              <p id="timeRecord">{("0" + Math.floor(val.time / 60)).slice(-2)}:{("0" + Math.floor(val.time % 60)).slice(-2)}</p>
             
              </div>
            );
        })}
      </div>
      
    </div>
  );
}

export default App;
