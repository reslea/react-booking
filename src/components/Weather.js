import { useEffect, useState } from "react";

const Weather = function()
{
    const [weather, setWeather] = useState([]);

    const [counter, setCounter] = useState(1);

    useEffect(() => {
        fetch('https://localhost:7286/weatherForecast')
            .then(response => response.json())
            .then(data => setWeather(data));
    }, []);

    return (
    <div>
        <div>
            <div>{counter}</div>
            <button onClick={() => setCounter(counter+1)}>Increment</button>
        </div>

        <ol>
            {weather.map(w => (
                <li key={w.date}>{w.temperatureC}°C {w.summary}</li>
            ))}
        </ol>
    </div>
    )
};

export default Weather;