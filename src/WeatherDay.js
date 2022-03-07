import "./WeatherDay.css";

function WeatherDay(props) {
    let {current, weather} = props;
    const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return (
        <div className={current ? "current-day" : "future-day"}>
            <div className="day">
                {/* given date is a Unix timestamp, in seconds. Change to ms for correct JS Date conversion */}
                {/* .getDay() returns day of the week as an int 0-6. Have to convert to human-readable */}
                {week[new Date(weather.dt * 1000).getDay()]}
            </div>
            <div className="img">
                <img
                    src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt=""
                />
                <p>
                    {weather.weather[0].description.charAt(0).toUpperCase() +
                        weather.weather[0].description.slice(1)}
                </p>
            </div>
            <div className="temp-wrapper">
                <div>{Math.round(weather.temp.max)}</div>
                <div>{Math.round(weather.temp.min)}</div>
            </div>
        </div>
    );
}

export default WeatherDay;
