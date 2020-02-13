import React from 'react';
import {render, cleanup, fireEvent, getByAltText, getByText, queryByText, toHaveStyle, getByPlaceholderText} from '@testing-library/react'

import '@testing-library/jest-dom/extend-expect'
import Todo from '../components/Todo';
import NewTask from '../components/NewTask';

describe('my test suite', ()=>{

    afterEach(cleanup);

    it('renders', () => {
        const {asFragment} = render(<Todo/>);
        expect(asFragment()).toMatchSnapshot();
    });
    
    it('enters input', () =>{
        const renderDOM = render(<NewTask/>);
        let newText = 'Get Milk';
        const inputElement = renderDOM.getByPlaceholderText('Add a new task');
        inputElement.value = newText;
        fireEvent.change(inputElement);
        expect(inputElement.value).toBe('Get Milk');
    });
    
    it('calls add item function', () => {
        const addItem = jest.fn();
        const renderDOM = render(<NewTask addItem = {addItem} />)
        let newText = 'Get Milk'
        fireEvent.change(renderDOM.getByPlaceholderText('Add a new task'), {target: {value: newText}})
        renderDOM.getByAltText('Add Task').click()  
        expect(addItem).toHaveBeenCalledTimes(1);
    });
    
    
    it('adds item to DOM ul', () => {
        const reactDOM = render(<Todo/>);
        const taskList = document.querySelector('.todo');
        const numberOfItems = taskList.children.length;
        let newText = 'Get Milk';
        fireEvent.change(reactDOM.getByPlaceholderText('Add a new task'), {target: {value: newText}});
        reactDOM.getByAltText('Add Task').click();
        expect(taskList.children.length).toBe(numberOfItems + 1);
    });
    
    it("doesn't add empty task", () => {
        const reactDOM = render(<Todo/>);
        let newText = '';
        const taskList = document.querySelector('.todo');
        const numberOfItems = taskList.children.length;
        fireEvent.change(reactDOM.getByPlaceholderText('Add a new task'), {target: {value: newText}});
        reactDOM.getByAltText('Add Task').click();
        expect(taskList.children.length).toBe(numberOfItems);
    })
    
    it('adds right text', () => {
        const reactDOM = render(<Todo/>);
        let newText = 'Buy Bread';
        fireEvent.change(reactDOM.getByPlaceholderText('Add a new task'), {target: {value: newText}});
        reactDOM.getByAltText('Add Task').click();
        const taskList = document.querySelector('.todo');
        expect(taskList.children[0].textContent).toBe(newText);
    })
        
    it("doesn't add duplicate tasks", () => {
        const reactDOM = render(<Todo/>);
        let newText = 'Brush Teeth';
        const taskList = document.querySelector('.todo');
        const numberOfItems = taskList.children.length;
        fireEvent.change(reactDOM.getByPlaceholderText('Add a new task'), {target: {value: newText}});
        reactDOM.getByAltText('Add Task').click();

        fireEvent.change(reactDOM.getByPlaceholderText('Add a new task'), {target: {value: newText}});
        reactDOM.getByAltText('Add Task').click();
        expect(taskList.children.length).toBe(numberOfItems + 1);
    })

    it("deletes items", () =>{
        const reactDOM = render(<Todo/>);
        let newText = 'Go to the doctor';
        fireEvent.change(reactDOM.getByPlaceholderText('Add a new task'), {target: {value: newText}});
        reactDOM.getByAltText('Add Task').click();
        
        const taskList = document.querySelector('.todo');
        const newItem = taskList.children[0];
        var deleteBtn = getByAltText(newItem, 'delete');
        deleteBtn.click();

        expect(queryByText(taskList, newText)).toBeNull();
    })

    it("toggles strikethrough property", () =>{
        const reactDOM = render(<Todo/>);
        let newText = 'Take a nap';
        fireEvent.change(reactDOM.getByPlaceholderText('Add a new task'), {target: {value: newText}});
        reactDOM.getByAltText('Add Task').click();        
        const taskList = document.querySelector('.todo');
        const newItem = taskList.children[0];
        var checkbox = newItem.querySelector("input[type='checkbox']");
        checkbox.click();
        expect(queryByText(taskList, newText)).toHaveStyle(`text-decoration: line-through`);
        checkbox.click();
        expect(queryByText(taskList, newText)).toHaveStyle(`text-decoration: `);
    })

});
