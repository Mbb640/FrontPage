import "./App.css";
import { useEffect, useRef, useState } from "react";
import WeatherDay from "./WeatherDay";
import Todo from "./Todo";
const env = require("./env.json");
const todoList = require("./Todos.json");

function App() {
    const [getWeather, setWeather] = useState("");
    let errorWhenFetchingLocation = useRef(false);
    // default location as St. John's, NL. Will be overwritten by successful Geolocation call
    let geocoords = useRef({ lat: 47.5649, lng: -52.7093 });

    useEffect(() => {
        // use Geolocation to determine user's current location

        function success(pos) {
            geocoords.current = {
                lat: pos.coords.latitude,
                lng: pos.coords.longitude,
            };

            fetch(
                `https://api.openweathermap.org/data/2.5/onecall?lat=${geocoords.current.lat}&lon=${geocoords.current.lng}&units=metric&exclude=minutely,hourly,alerts&APPID=${env.API_KEY}`
            )
                .then((response) => response.json())
                .then((response) => setWeather(response));
        }

        function error() {
            errorWhenFetchingLocation.current = true;
        }

        navigator.geolocation.getCurrentPosition(success, error);
    }, []);

    return (
        <div className="App">
            {errorWhenFetchingLocation.current ? (
                <div>
                </div>
            ) : (
                <div className="days-wrapper">
                    {getWeather ? (
                        <div className="weather-forecast">
                            <div className="day-wrapper">
                                <WeatherDay
                                    current
                                    weather={getWeather.daily[0]}
                                />
                            </div>
                            <div className="day-wrapper">
                                <WeatherDay weather={getWeather.daily[1]} />
                            </div>
                            <div className="day-wrapper">
                                <WeatherDay weather={getWeather.daily[2]} />
                            </div>
                        </div>
                    ) : (
                        // had a loading spinner here, but API seems fast enough for loading time to be insignificant.
                        // suggest react-loading-icons in case of change.
                        ""
                    )}
                </div>
            )}

            <div className="todos-wrapper">
                {todoList.map((todo) => (
                    <Todo todo={todo} key={todo.description} />
                ))}
            </div>
        </div>
    );
}

export default App;
