import "./App.css";
import { useEffect, useRef, useState } from "react";
import WeatherDay from "./WeatherDay";
import Todo from "./Todo";
const env = require("./env.json");
const todoList = require("./Todos.json");

function App() {
    const [getState, setState] = useState("");
    let errorWhenFetchingLocation = useRef(false);

    useEffect(() => {
        // use Geolocation to determine user's current location. Default to St. John's, CA
        let lat = 47.5649;
        let lon = -52.7093;

        function success(pos) {
            lat = pos.coords.latitude;
            lon = pos.coords.longitude;

            fetch(
                `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly,alerts&APPID=${env.API_KEY}`
            )
                .then((response) => response.json())
                .then((response) => setState(response));
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
                    Error when determining location. Do you have location
                    enabled?
                </div>
            ) : (
                <div className="days-wrapper">
                    {getState ? (
                        <div className="weather-forecast">
                            <div className="day-wrapper">
                                <WeatherDay
                                    current
                                    weather={getState.daily[0]}
                                />
                            </div>
                            <div className="day-wrapper">
                                <WeatherDay weather={getState.daily[1]} />
                            </div>
                            <div className="day-wrapper">
                                <WeatherDay weather={getState.daily[2]} />
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
