import { useReducer } from "react";

function counterReducer(state, action) {
    // const { type, .. } = action;

    switch (action.type) {
        case 'increment':
            return state += 1;
        case 'decrement':
            return state -= 1;
        default:
             return state;
    }
}

export default function Counter() {
    const [counter, dispatch] = useReducer(counterReducer, 0);

    return (
        <>
            <button onClick={() => dispatch({ type: 'increment' })}>+</button>
            <span>{counter}</span>
            <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
        </>
    )
}