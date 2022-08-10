import React from 'react'
import { Link } from 'react-router-dom';

export default function Room({room, bookings}) {
  const isDisabled = !bookings || bookings.length !== 0;

  return (
    <tr key={room.id}>
      <td>{room.name}</td>
      <td>{room.maxVisitorsCount}</td>
      <td>
        <Link 
          className={`btn btn-primary ${isDisabled ? 'disabled': ''}`}
          to={`/bookings/${room.id}`}>
            Book
        </Link>
      </td>
    </tr>
  )
}
