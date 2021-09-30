import React,{useState} from 'react'
//import CardTodo from './CardTodo'
import {useSelector, useDispatch} from 'react-redux'
import Tasks from './Tasks'
import ModalTodo from './ModalTodo'
import {EditOutlined, DeleteOutlined, PlusOutlined} from '@ant-design/icons'
import { Button } from 'antd';



export default function TodosList() {

  const {todos} = useSelector(state => ({
    ...state.todosReducer
  }))

  const dispatch = useDispatch()

  const createTask = (todoId,taskText) => {
    dispatch({
      type: "CREATE_TASK",
      payload : {todoId,taskText}
    })}
    
  const toogleDone = (todoId,taskId) => {
    dispatch({
      type: "TOOGLE_DONE",
      payload : {todoId,taskId}
    })}

  const deleteTask = (todoId,taskId) => {
    dispatch({
      type: "DELETE_TASK",
      payload : {todoId,taskId}
    })}

  const updateTodo = (selectedTodo) => {
    //console.log("update : " + selectedTodo.title )
    dispatch({
      type: "UPDATE_TODO",
      payload : {selectedTodo}
    })}

  const DeleteTodo = (idToDelete) => {
    dispatch({
      type: "DELETE_TODO",
      payload : {idToDelete}
    })}

    const createTodo = (newTodo) => {
      dispatch({
        type: "CREATE_TODO",
        payload : {newTodo}
      })}



  const [showModalTodo, setShowModalTodo] = useState(false)      
  const [selectedTodo, setSelectedTodo] = useState()


   return (
    <>
      <h1 className="home-title">Les choses à faire</h1>
      <p><Button
              id="addTodoButton"
              shape="round"
              type="primary"
              size="large"
              onClick={() => {
                setSelectedTodo(undefined)
                setShowModalTodo(true)
              }}
              icon={<PlusOutlined />}>
            Ajouter une liste
            </Button></p>


      <div className="container-cards">
        {todos.map((todo,index) => {
          return(
           <>
           <div className="card" key={index}> 
              <h2 
                style ={{background : todo.color}}
                onFocus={()=> {setSelectedTodo(todo)}}>
                
               <DeleteOutlined onClick={(e) => {
                 setSelectedTodo(todo)
                 DeleteTodo(selectedTodo.todoId)}} />
                <span> {todo.title}  </span>
                
                <EditOutlined  onClick={() =>{
                  setSelectedTodo(todo)
                  //console.log(selectedTodo)
                  setShowModalTodo(true)
                  }}  />
              </h2>
              
              <Tasks 
                tasks = {todo.tasks}   
                todoId = {todo.todoId}
                toogleDone={toogleDone}
                deleteTask = {deleteTask}
                createTask = {createTask}
              />
            </div>
          </>
          )
        })}


            <ModalTodo 
                showModalTodo = {showModalTodo} 
                setShowModalTodo = {setShowModalTodo}
                selectedTodo = {selectedTodo}
                updateTodo = {updateTodo}  
                createTodo = {createTodo}
              />

      </div>
    </>
  )
}
