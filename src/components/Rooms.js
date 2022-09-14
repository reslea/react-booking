import { apiUrl } from "../constants";
import useFetch from "../hooks/useFetch";
import useSignalr from "../hooks/useSignalr";
import Room from "./Room";

const Rooms = function() {
    const [rooms] = useFetch(`${apiUrl}/api/room`);

    const [bookings, setBookings] = useFetch(`${apiUrl}/api/booking`);

    useSignalr(`${apiUrl}/hubs/booking`, {
        "RoomBooked": (bookingJson) => {
            setBookings(prevBookings => 
                [...prevBookings, JSON.parse(bookingJson)]);
        },
    });

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
                <Room key={r.id} room={r} bookings={bookings?.filter(b => b.roomId === r.id)} />
            )} 
            </tbody>
        </table>
    )
}

export default Rooms;