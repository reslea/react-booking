import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Rooms from './components/Rooms';
import Booking from './components/Booking';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Rooms />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/bookings" element={<Booking/>}>
                <Route path=":roomId" element={<Booking />} />
            </Route>
        </Routes>
    </BrowserRouter>
);