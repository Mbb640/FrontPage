# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Purpose

This site is intended as a practice and learning area for improving my own skills. It currently has a Forecast for the current day's weather and the following two days in St. John's, Newfoundland.

Expected additions: 
- Allowing the user to enter their own location rather than having St. John's hardcoded. Perhaps automatically identifying the user's location, if location data is offered.
- Improving the weather interface. Currently the weather only shows the high for the day.
- TODOs stored in cookies, with each TODO assignable to a day. This may eventually change to a login system with a database.

Possible additions:
- Proper hosting, on my own machine or through a service.

## To Run

OpenWeatherMap requires signup to get an API key, and forbids the dissemination of the personal API keys, so my own is not included in this code. You must sign up at https://home.openweathermap.org/users/sign_up for access to an API key, then replace the placeholder text in src/env.json with your API key.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
