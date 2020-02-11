import React from 'react';

import './Item.css';
const Item = props => {
    return(
        <li 
        className = "item"
        style={{ textDecoration: props.completed ? "line-through" : "" }}
        >
        <input type="checkbox"
        checked = {props.completed} 
        onClick = {()=>props.toggle(props.index)}/>
        {props.title}
        <img 
        src="https://img.icons8.com/color/50/000000/delete-forever.png" 
        className = "icon-btns delete-btn" 
        alt = "delete"
        onClick={() => props.clicked(props.index)}/>
        </li>
    )
};

export default Item;
