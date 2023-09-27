import React, { useState, useEffect, useRef } from "react";
import "./Clock.css";
import Axios from 'axios';
 
function Clock(props) {
    const [time, setTime] = useState(0);
    const [now, setNow] = useState(null);
    const id = props.id;
    const taskName = props.name;
    const description = props.description;
    const closeModal = props.closeModal;
    const intervalRef = useRef(null);
    const updateList = props.updateList;

    const handleStop = () =>{
        clearInterval(intervalRef.current);

        Axios.get(`http://localhost:3001/api/getTime/${id}`).then((response)=>{
            Axios.put('http://localhost:3001/api/setTime',{
                id: id,
                time: (Math.floor((timePassed / 1000)) + response.data[0].time)
            });
            updateList({id:id, name:taskName, description:description, time: Math.floor((timePassed / 1000) % 60)+ response.data[0].time});
            closeModal("");
            window.location.reload(false);
        });
        
    };

    useEffect(() => {
        setTime(Date.now());
        setNow(Date.now());
        intervalRef.current = setInterval(()=>{
            setTime(Date.now());
        }, 10);
     }, []);

    let timePassed = time - now;
 
    return (
        <div className="clockModalBackground">
            <div className="clockModalContainer">
            <div className="closeClockBtn">
                <button onClick={()=>closeModal("")}> Give Up </button>
            </div>
            <div className="clockBody">
                <div className="timer">
                <span className="digits">
                    {("0" + Math.floor((timePassed / 60000) % 60)).slice(-2)} :{(" ")} 
                </span>
                <span className="digits">
                    {("0" + Math.floor((timePassed / 1000) % 60)).slice(-2)}
                </span>
                </div>
                <button id="stopBtn" onClick={handleStop}>Stop</button>
            </div>
        </div>
        </div>
    );
}
 
export default Clock;