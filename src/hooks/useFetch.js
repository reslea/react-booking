import { useState, useEffect } from "react";


export default function useFetch(url) {
  const [data, setData] = useState(null);
  useEffect(() => {
      fetch(url, { 
          headers: { 'authorization': `Bearer ${localStorage.getItem('token')}` }})
          .then(response => response.json())
          .then(receivedData => setData(receivedData));
  }, [url]);

  return [data, setData];
}