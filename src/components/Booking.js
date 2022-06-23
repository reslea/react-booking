import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";

import './Booking.css';

export default function Booking()
{
    const { roomId } = useParams();
    
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [visitorsCount, setVisitorsCount] = useState(1);

    const [uploaded, setUploaded] = useState(false);

    function submit(e) {
        e.preventDefault();

        const booking = { roomId: parseInt(roomId), dateFrom, dateTo, visitorsCount };
        const strBooking = JSON.stringify(booking);
        
        fetch('https://localhost:7286/api/bookings', 
            { 
                method: 'Post', 
                body: strBooking,
                headers: {
                    'content-type': 'application/json'
                }
             })
        .then(() => setUploaded(true));
    }

    if (uploaded) {
        return <Navigate to="/rooms" />
    }

    return (
        <form onSubmit={submit}>
            <div>
                <label>
                    Date from:
                    <input type="date" value={dateFrom} onChange={(e) => { setDateFrom(e.target.value) }} />
                </label>
            </div>
            <div>
                <label>
                    Date to:
                    <input type="date" value={dateTo} onChange={(e) => { setDateTo(e.target.value) }} />
                </label>
            </div>
            <div>
                <label>
                    Visitors count:
                    <input type="number" value={visitorsCount} onChange={(e) => { setVisitorsCount(parseInt(e.target.value)) }} />
                </label>
            </div>
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
    )
}