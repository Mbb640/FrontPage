import "./App.css";
import { useEffect, useState } from "react";
import WeatherDay from "./WeatherDay";
const env =  require("./env.json")

function App() {
    const [getState, setState] = useState("");
    useEffect(() => {
        fetch(
            "https://api.openweathermap.org/data/2.5/onecall?lon=47.56494&lat=-52.7093&units=metric&exclude=minutely,hourly,alerts&APPID=" + env.API_KEY
        )
            .then((response) => response.json())
            .then((response) => setState(response));
    }, []);
    return (
        <div className="App">
            <div>
                {getState ? (
                    <div className="weather-forecast">
                        <div className="day-wrapper">{WeatherDay([true, getState.daily[0]])}</div>
                        <div className="day-wrapper">{WeatherDay([false, getState.daily[1]])}</div>
                        <div className="day-wrapper">{WeatherDay([false, getState.daily[2]])}</div>
                    </div>
                    // had a loading spinner here, but API seems fast enough for loading time to be insignificant. 
                    // suggest react-loading-icons in case of change.
                ) : ""}
            </div>
        </div>
    );
}

export default App;
