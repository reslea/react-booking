import React, { useReducer, useState } from 'react';

function todoReducer(prevState, action) {
    switch (action.type) {
        case 'new':
            const newTodo = action.payload;
            return [newTodo, ...prevState ];
        case 'delete':
            const deleteId = action.payload;
            return prevState.filter(t => t.id !== deleteId);
        case 'toggle':
            const toggleId = action.payload;

            return prevState.map(t => t.id === toggleId 
                ? {...t, isDone: !t.isDone }
                : t);

        default: return prevState;
    }
}

export default function TodoList() {
    const [todos, dispatch] = useReducer(todoReducer, []);

    const [newTodoTitle, setNewTodoTitle] = useState('');

    const onDelete = (toDeleteId) => dispatch({ 
        type: 'delete', 
        payload: toDeleteId 
    });

    const onAdd = () => dispatch({
        type: 'new',
        payload: { 
            id: (+new Date()), 
            title: newTodoTitle, 
            isDone: false }
    });

    const onToggle = id => dispatch({
        type: 'toggle',
        payload: id
    });
    
    return (
    <>
        <div>TodoList</div>
        <input 
            onChange={e => setNewTodoTitle(e.target.value)} 
            value={newTodoTitle} />
        <button onClick={onAdd} >
            Add
        </button>
        <div>
            <ul>
                {todos.map(t => 
                    <Todo 
                        id={t.id} 
                        title={t.title} 
                        isDone={t.isDone} 
                        onToggle={onToggle}
                        onDelete={onDelete} />)}
            </ul>
        </div>
    </>
    )
}

function Todo({ id, title, isDone, onDelete, onToggle }) {
    return (
        <li 
            key={id} 
            style={isDone ? {'textDecorationLine': 'line-through'} : {}}
        >
            <span onClick={() => onToggle(id)}>{title}</span>
            <span onClick={() => onDelete(id)}>✖️</span>
        </li>)
}
