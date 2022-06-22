import { useEffect, useState } from "react";

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
        <div>
            <ul> {rooms.map(r => 
               <li key={r.id}>{r.name}</li>)} 
            </ul>
        </div>
    )
}

export default Rooms;