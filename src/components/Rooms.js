import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Rooms = function() {
    const [rooms, setRooms] = useState(null);

    useEffect(() => {
        fetch('https://localhost:7286/api/rooms')
            .then(response => response.json())
            .then(data => setRooms(data));
    }, []);

    if (rooms === null)
    {
        return <div>Loading...</div>
    }
    
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Max visitors count</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
            {rooms.map(r => 
               <tr key={r.id}>
                   <td>{r.name}</td>
                   <td>{r.maxVisitorsCount}</td>
                   <td>
                       <Link to={`/bookings/${r.id}`}>Book</Link>
                   </td>
               </tr>)} 
            </tbody>
        </table>
    )
}

export default Rooms;