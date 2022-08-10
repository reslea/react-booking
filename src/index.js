import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Rooms from './components/Rooms';
import Booking from './components/Booking';
import Login from './components/Login';
import TodoList from './components/TodoList';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<TodoList />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/bookings" element={<Booking/>}>
                <Route path=":roomId" element={<Booking />} />
            </Route>
            <Route path="/login" element={<Login />} />
        </Routes>
    </BrowserRouter>
);