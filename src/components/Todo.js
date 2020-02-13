import React, {useState, useEffect} from 'react';
import './Todo.css';
import Item from './Item'
import NewTask from './NewTask'
import ErrorModal from './ErrorModal'

const persistData = tasks =>{
    localStorage.setItem('todo', JSON.stringify(tasks));
}    
const readStorage = () =>{
    const storage = JSON.parse(localStorage.getItem('todo'));
    if(storage){
        for(var i=0; i<storage.length; i++){
            storage[i].date = new Date(storage[i].date)
        }
        return storage;
    }
    else 
        return []
}

const Todo = () =>{

    // defined these in the beginning of the function. 
    const [tasks, setTasks] = useState([]);
    const [errorText, setErrorText] = useState(null);
    //removed tasksRemaining variable
    //moved persistData and readStorage outside the component 
    
    useEffect(() => {
        const tasksRead = readStorage();
        setTasks(tasksRead);
    }, []);

    useEffect(() => {
        persistData(tasks);
        
    }, [tasks]);
    
    const clearInput = () =>{
        document.getElementById("new_item").value = '';
    }

    const addItem = (e) => {
        e.preventDefault();
        const itemText = document.getElementById("new_item").value;
        var titles = tasks.map(el => el.title);    
        var duplicate = titles.includes(itemText);  
        //added logic to avoid adding duplicates, empty tasks, and tasks that are longer than 20 characters, setting error text accordingly  
        if(!duplicate && itemText.length<=20 && itemText.length>0){
            let newTaskItem = {
                title:  itemText,
                completed: false, 
                date: new Date()
            };
            // populate your original data and then added the new data
            let newTasks = [...tasks];
            //add to beginning of array 
            newTasks.unshift(newTaskItem);
            setTasks(newTasks);    
        }
        else if(itemText.length>20){
            setErrorText("task too long to add! (max 20 characters)");
        }
        else if(duplicate){
            setErrorText("can't add duplicate task!");
        }
        else{
            setErrorText("can't add empty task!");
        }
        clearInput();
    }

    const clearError = () =>{
        setErrorText(null);
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
            {errorText && <ErrorModal onClose = {clearError}>{errorText}</ErrorModal>}
            <NewTask addItem = {addItem}></NewTask>
            <div className="tasks">
                <h3>Todo</h3>
                <button 
                className = "sort" 
                id = "sort_date" 
                onClick = {sortDate}>
                    Sort by Date
                </button>
                <button 
                className = "sort" 
                id = "sort_alpha" 
                onClick = {sortAlpha}>
                    Sort Alphabetically
                </button>
                <ul className = "todo">
                {tasks.map((task, index) => (
                    <Item
                        title={task.title}
                        completed = {task.completed}
                        index={index}
                        key={index}
                        deleteTask = {deleteItem}
                        toggle = {toggleComplete}
                    />
                ))}
                </ul>
            </div>
        </div>
    )
} 

export default Todo;
