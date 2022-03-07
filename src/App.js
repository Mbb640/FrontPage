import "./App.css";
import { useEffect, useState } from "react";
import WeatherDay from "./WeatherDay";
const env = require("./env.json");

function App() {
    const [getState, setState] = useState("");

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
            console.log(
                "Error when determining location. Do you have location enabled?"
            );
            // TODO: display this to user
            fetch(
                `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly,alerts&APPID=${env.API_KEY}`
            )
                .then((response) => response.json())
                .then((response) => setState(response));
        }
        navigator.geolocation.getCurrentPosition(success, error);
    }, []);

    return (
        <div className="App">
            <div>
                {getState ? (
                    <div className="weather-forecast">
                        <div className="day-wrapper">
                            <WeatherDay current weather={getState.daily[0]} />
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
        </div>
    );
}

export default App;
