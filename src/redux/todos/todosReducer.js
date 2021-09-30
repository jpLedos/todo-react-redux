import { v4 as uuidv4 } from "uuid";

const INITIAL_STATE = {
  todos: [ 
    {   
      "todoId" : 1,
      "title" : "A lire ",
      "color" : "#00ff00",
      "tasks" : [
        {
          "taskId" : 1,
          "task" : "Fondation",
          "done" : true
        },
        {
          "taskId" : 2,
          "task" : "Ravage",
          "done" : false
        },
        {
          "taskId" : 6,
          "task" : "Le seigneur des anneaux",
          "done" : false
        },
        {
          "taskId" : 7,
          "task" : "Cyrano de bergerac",
          "done" : true
        }
      ]
    },
    {   
      "todoId" : 5,
      "title" : "films a voir",
      "color" : "#ff0000",
      "tasks" : [
        {
          "taskId" : 1,
          "task" : "Avatar",
          "done" : true
        },
        {
          "taskId" : 2,
          "task" : "Dune",
          "done" : false
        },
        {
          "taskId" : 6,
          "task" : "Matrix",
          "done" : false
        }
      ]
    },
    {   
      "todoId" : 2,
      "title" : "series a voir",
      "color" : "#2572D9",
      "tasks" : [
        {
          "taskId" : 3,
          "task" : "Le prisonnier",
          "done" : true
        },
        {
          "taskId" : 4,
          "task" : "Dr Who",
          "done" : false
        },
        {
          "taskId" : 5,
          "task" : "Lost",
          "done" : true
        },
      ]
    }
  ]
}


function todosReducer(state = INITIAL_STATE, action){

  switch(action.type){

    case "UPDATE_TODO": {
      const newTodos = state.todos.filter(todo => todo.todoId !== action.payload.selectedTodo.todoId );
      newTodos.unshift(action.payload.selectedTodo);
      return {...state,todos:  newTodos};  
    } 

    case "DELETE_TODO": {
      const idToDelete = action.payload.idToDelete;
      //console.log("deleted " + idToDelete);
      const newTodos = state.todos.filter(todo => todo.todoId!==idToDelete);
      return {...state, todos: newTodos};       
    } 

    case "CREATE_TODO": {
      
      const newTodo = { ...action.payload.newTodo , id : uuidv4() ,tasks : []};
      const NewTodos = [...state.todos];
      NewTodos.unshift(newTodo);
      const newState = {...state,todos : NewTodos };    
      return newState  
    }         
 
    case "DELETE_TASK" : {
      const todoIdToMute = action.payload.todoId
      const taskIdToMute = action.payload.taskId

      const newTodos = state.todos.map((todo) => {
        if (todo.todoId===todoIdToMute) {
          const newTasks = todo.tasks.filter(task => task.taskId!==taskIdToMute)
          return {...todo,tasks : newTasks} 
        } else {
            return {...todo}}
      })
    return {...state,todos: newTodos};
  }

    case "TOOGLE_DONE" : {
        const todoIdToMute = action.payload.todoId
        const taskIdToMute = action.payload.taskId

        const newTodos = state.todos.map((todo) => {
          if (todo.todoId===todoIdToMute) {
            const newTasks = todo.tasks.map(task => {
              if(task.taskId===taskIdToMute) {
                return {...task,done:!task.done}
              } else {
                  return {...task}}
          })
            return {...todo,tasks : newTasks} 
          } else {
              return {...todo}}
        })
      return {...state,todos: newTodos};
    }
     
    case "CREATE_TASK": {
      const todoIdToMute = action.payload.todoId
      const newTask = {
        "taskId" : uuidv4(),
        "task" : action.payload.taskText,
        "done" : false
      }
     
      const newTodos = state.todos.map((todo) => {
        if (todo.todoId===todoIdToMute) {
          const newTasks = [...todo.tasks]
          newTasks.unshift(newTask);
          //console.log("le nouveau tableau : "+newTasks);
          return {...todo,tasks : newTasks} 
        } else {
            return {...todo}}
      })
      //console.log(state.todos);
      return {...state,todos: newTodos};       
    } 

    default: {
    return state;
    }
  }
}
export default todosReducer;



// export const getArticles = () => dispatch => {

//   fetch("https://jsonplaceholder.typicode.com/posts")
//   .then(response => response.json())
//   .then(data => {
//       dispatch({
//           type: 'LOADARTICLES',
//           payload: data
//       })
//   })

// }
