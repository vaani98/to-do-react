import React, {useState, useEffect} from 'react';
import './Todo.css';
import Item from './Item'
import NewTask from './NewTask'

const Todo = () =>{
// If the functions here are not using any local variables, we can move them out of here, before the Todo definition. 
// It's more performant as the functions will not be reinitialsed every time the component renders
    
    const persistData = () =>{
        localStorage.setItem('todo', JSON.stringify(tasks));
    }    

    const readStorage = () =>{
        const storage = JSON.parse(localStorage.getItem('todo'));
        for(var i=0; i<storage.length; i++){
            storage[i].date = new Date(storage[i].date)
        }
        if(storage){
            setTasks(storage);
            return true;
        }
        return false;   
    }
    
   // Good practice to define these in the beginning of the function. 
    const [tasks, setTasks] = useState([]);
    // Why do we need this variable?
    const [tasksRemaining, setTasksRemaining] = useState(0);

    useEffect(() => {
        readStorage();
    }, []);

    useEffect(() => {
        setTasksRemaining(tasks.filter(task => !task.completed).length);
        persistData(tasks);
        
    }, [tasks]);
    
    const clearInput = () =>{
        document.getElementById("new_item").value = '';
    }

    const addItem = (e) => {
        e.preventDefault();
        let newTask = {
            title: document.getElementById("new_item").value, 
            completed: false, 
            date: new Date()
        };
        const newTasks = [newTask, ...tasks]
        setTasks(newTasks);
        clearInput();
    }

    const toggleComplete = index => {
        const newTasks = [...tasks];
        newTasks[index].completed = !newTasks[index].completed
        setTasks(newTasks);
    }

    const deleteItem = (index) =>{
        const newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);
    }

    const sortDate = () =>{
        console.log(tasks);
        let tasksCopy = [...tasks];
        let newTasks = tasksCopy.sort((a, b) => b.date - a.date);
        setTasks(newTasks);
    }

    const sortAlpha = () =>{
        let tasksCopy = [...tasks];
        let newTasks = tasksCopy.sort((a, b) => a.title.localeCompare(b.title))
        setTasks(newTasks);
    }

    return(
        <div className="container">
            <NewTask addItem = {addItem}></NewTask>
                <div className="tasks">
                <h3>Todo</h3>
                <button className = "sort" 
                id = "sort_date" 
                onClick = {sortDate}>
                    Sort by Date
                    </button>
                <button className = "sort" id = "sort_alpha" onClick = {sortAlpha}>Sort Alphabetically</button>

            <ul>
            {tasks.map((task, index) => (
                <Item
                    title={task.title}
                    completed = {task.completed}
                    index={index}
                    key={index}
                    clicked = {deleteItem}
                    toggle = {toggleComplete}
                />
            ))}
            </ul>
            </div>
        </div>
    )
} 

export default Todo;
