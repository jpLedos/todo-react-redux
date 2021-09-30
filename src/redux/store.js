import {createStore, combineReducers} from 'redux';
import todosReducer from './todos/todosReducer'



const rootReducer = combineReducers({
    todosReducer
})

const store = createStore(rootReducer)

export default store;