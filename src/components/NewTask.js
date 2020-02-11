import React from 'react';
import './NewTask.css'
const NewTask = props =>{
    return(
        // Can use Fragments here, it's helpful when we're operating on a large app, saves an html DOM node
        <div> 
        <label htmlFor="new-task">Add Item</label><br/>
        <form onSubmit={(e)=>props.addItem(e)}>
            <input id ="new_item"
            type="text"
            className="input"
            placeholder="Add a new task"
            style={{border: '1px solid #ddd'}}
            />
            <img 
            src="https://img.icons8.com/color/96/000000/add.png" 
            alt = "Add Task" className = "icon-btns" 
            id = "add-btn" 
            onClick = {(e)=>props.addItem(e)}>
            </img>
        </form>
        </div>
    )
}
export default NewTask;
