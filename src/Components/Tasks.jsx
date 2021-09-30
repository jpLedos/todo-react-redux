import React,{useState} from 'react'
import {DeleteOutlined} from '@ant-design/icons'
import {  PlusOutlined} from '@ant-design/icons'


export default function Tasks(props) {

  const [taskText, setTaskText] = useState("");
  //console.log(props.tasks)
 
  return (
    <> 
     {props.tasks.map((task,index) => {
       return(
         <div className="taskContainer">
         <p key={index} 
          className= {!task.done ? 'task'  :'task , done'}
          onClick = {() => props.toogleDone(props.todoId,task.taskId)} >
          {task.task} </p> 
          <span className="task" onClick = {() =>props.deleteTask(props.todoId,task.taskId)}><DeleteOutlined /></span>
         </div>
       )
     })}

     <p className="addTask">
       <input  type="text" placeholder="Ajouter un element" value={taskText} onChange={(e)=>setTaskText(e.target.value) }/>
      <PlusOutlined onClick={()=> {
        props.createTask(props.todoId,taskText)
        setTaskText("")}} /> 
    </p>
 </>
  )
}

