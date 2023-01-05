import "./App.css";
import { useEffect, useRef, useState } from "react";
import WeatherDay from "./WeatherDay";
import Todo from "./Todo";
const env = require("./env.json");

function setCookie(todosCookieInput) {
    // set cookie to expire 5 years from date last set
    // if the user is visiting the site 5 years after last setting a todo, odds are they'll want a new list anyway
    var now = new Date();
    now.setFullYear(now.getFullYear() + 5);
    document.cookie = `todos=${JSON.stringify(
        todosCookieInput
    )}; expires=${now.toUTCString()};`;
}

function getCookie() {
    // search for todos JSON in cookie, parse it, then return the parsed object
    return JSON.parse(
        document.cookie
            .split("; ")
            .find((row) => row.startsWith("todos="))
            ?.split("=")[1]
    );
}

function App() {
    const [getWeather, setWeather] = useState("");
    const [todos, setTodos] = useState([]);
    let errorWhenFetchingLocation = useRef(false);
    // default location as St. John's, NL. Will be overwritten by successful Geolocation call
    let geocoords = useRef({ lat: 47.5649, lng: -52.7093 });

    // submitTodo and onTodoChange must be in App(), as they use the var todos which is created by a hook call
    // Hook calls can't be placed in the top level, they must be in the function
    function submitTodo(todo) {
        // executed when the "Add" button is clicked
        // updates todos state and cookie
        const errorField = document.getElementById("error");
        for (let t of todos) {
            if (t.description === todo) {
                // if the user submits two todos with the same name, break
                errorField.textContent =
                    "A todo with this text already exists!";
                return;
            } else {
                errorField.textContent = "";
            }
        }
        let tempArray = todos.slice();
        tempArray.push({ completed: false, description: todo });
        setTodos(tempArray);
        setCookie(tempArray);
    }

    function deleteTodo(todo) {
        // executed when a todo's X button is clicked
        const index = todos.indexOf(todo);
        let tempArray = todos.slice();
        // only splice array when item is found
        if (index > -1) {
            tempArray.splice(index, 1); // remove todo
        }
        setTodos(tempArray);
        setCookie(tempArray);
    }

    function onTodoChange(todoDescription) {
        // executed when a todo's checkbox is clicked
        // finds the todo clicked and then toggles between complete and incomplete
        for (let todo of todos) {
            if (todo.description === todoDescription) {
                todo.completed = !todo.completed;
            }
        }
        setCookie(todos);
    }

    useEffect(() => {
        // use Geolocation to determine user's current location

        function success(pos) {
            geocoords.current = {
                lat: pos.coords.latitude,
                lng: pos.coords.longitude,
            };
        }

        function error() {
            errorWhenFetchingLocation.current = true;
        }

        navigator.geolocation.getCurrentPosition(success, error);
        fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${geocoords.current.lat}&lon=${geocoords.current.lng}&units=metric&exclude=minutely,hourly,alerts&APPID=${env.API_KEY}`
        )
            .then((response) => response.json())
            .then((response) => setWeather(response));

        if (document.cookie) {
            setTodos(getCookie());
        }
    }, []);

    return (
        <div className="App">
            {errorWhenFetchingLocation.current ? (
                <div>
                    Error fetching location. Weather requires location enabled.
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
                        ""
                    )}
                </div>
            )}

            <div>
                {todos.map((todo) => (
                    <div className="todo-wrapper">
                        <Todo
                            todo={todo}
                            key={todo.description}
                            onChange={() => onTodoChange(todo.description)}
                            onDelete={() => deleteTodo(todo)}
                        />
                    </div>
                ))}
                <div className="todo-field">
                    <input
                        type="text"
                        id="newTodo"
                        name="newTodo"
                        placeholder="New todo"
                    />
                    {/* when clicked, button takes current entry of newTodo input and appends it to the existing array
                            also replaces cookie with new array */}
                    <button
                        onClick={() => {
                            submitTodo(
                                document.getElementById("newTodo").value
                            );
                            document.getElementById("newTodo").value = "";
                        }}
                    >
                        Add
                    </button>
                </div>
                {/* error box
                    if the todo is invalid (for now, just if there are two with the same text) then the error is displayed to the user here
                    text set in submitTodo */}
                <span className="error" id="error" />
            </div>
        </div>
    );
}

export default App;
