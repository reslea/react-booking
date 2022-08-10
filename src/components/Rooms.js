import { HubConnectionBuilder } from "@microsoft/signalr";
import { useEffect, useState } from "react";
import Room from "./Room";

const Rooms = function() {
    const [rooms, setRooms] = useState(null);
    const [bookings, setBookings] = useState([]);

    const [connection, setConnection] = useState(null);

    // создание SignalR соединения
    useEffect(() => {
    const newConnection = new HubConnectionBuilder()
        .withUrl("https://localhost:7286/hubs/booking")
        .withAutomaticReconnect()
        .build();

    setConnection(newConnection);
    }, []);

    useEffect(() => {
        if (!connection) return;

        connection.on("RoomBooked", (bookingJson) => {
            console.log(bookingJson);
            setBookings(prevBookings => 
                [...prevBookings, JSON.parse(bookingJson)]);
        });
        console.log('subscribed to messages');

        connection.start().then(() => console.log('connection started'));
      }, [connection]);

    // загрузить комнаты
    useEffect(() => {
        fetch('https://localhost:7286/api/room', { 
            headers: { 'authorization': `Bearer ${localStorage.getItem('token')}` }})
            .then(response => response.json())
            .then(data => setRooms(data));
    }, []);

    // загрузить букинги
    useEffect(() => {
        // const today = new Date().toLocaleDateString("en-US");
        fetch(`https://localhost:7286/api/booking`)
        .then(response => response.json())
        .then(data => setBookings(data));
    }, []);

    if (rooms === null)
    {
        return <div>Loading...</div>
    }
    
    return (
        <table className="table table-striped table-bordered">
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Max visitors count</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
            {rooms.map(r => 
                <Room key={r.id} room={r} bookings={bookings.filter(b => b.roomId === r.id)} />
            )} 
            </tbody>
        </table>
    )
}

export default Rooms;