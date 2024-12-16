Names: Jason Candila, Evan Carr, Akshaya Gajula
# WeatherNow
## Description
WeatherNow is a web app designed to provide accurate and up-to-date weather information for users. The app displays current weather conditions and forecasts for the coming days in a simple, user-friendly interface. Whether you're planning your day, a trip, or just curious about the weather, WeatherNow makes staying informed easy and convenient. Simply enter the longitude and latitude of your desired location to view a graph and map displaying the weather conditions for that area.

## Target Platforms
WeatherNow is designed to work seamlessly on both desktop and mobile platforms. Supported platforms include:

iOS: Safari and Chrome (latest versions).
Android: Chrome and Samsung Internet (latest versions).
Desktop: Chrome, Firefox, Edge, and Safari (latest versions).

# Developer Manual
## Introduction
This document serves as a guide for developers who will maintain an enhance this system. It provides detailed instructions for setting uo the application, running it locally or on a server, running tests, interacting with the APU, and understanding the current state of the system.

---

## Prerequisites
Ensure you have the following installed on your machine:
- Node.js
- npm
- Git
- Visual Studio Code
- "Live Server"

### Steps to Install
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd <project-directory>
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

---

## Running the Application

### Locally
1. Start the development server:
   ```bash
   npm start
   ```
   or
   ```bash
   yarn start
   ```
2. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

### On a Server
1. Build the project:
   ```bash
   npm run build
   ```
   or
   ```bash
   yarn build
   ```
2. Deploy the `build` directory to your server.
3. Start the server process using a process manager like `pm2` or similar:
   ```bash
   pm2 start index.js
   ```

---

## Running Tests

1. To run all tests, execute:
   ```bash
   npm test
   ```
   or
   ```bash
   yarn test
   ```
2. Test results will be displayed in the terminal.

---

## API Documentation

### Endpoints

#### `GET /coordinates`
- **Description:** Retrieves all location data.
- **Response:**
  - **200 OK**: Returns an array of location objects.
  - **Error:** Returns an error object.

#### `POST /coords`
- **Description:** Adds a new location to the database.
- **Request Body:**
  ```json
  {
    "local": "<locality>",
    "lat": <latitude>,
    "long": <longitude>
  }
  ```
- **Response:**
  - **201 Created:** Returns the newly added location object.
  - **Error:** Returns an error object.

---

## Known Bugs and Future Roadmap

### Known Bugs
Database Not Working:
Currently our database has not been able to post data nor get data to be displayed on the app itself. The database is acknowledged by Insomnia during tests, and we are able to get current stored data. We believe the reason for this is that the post requires us to use data that the user inputs plus an input from an api that returns locality based on the inputted coordinates. 

We have not figured out a way to access the locality value and therefore we cannot do the following:
1. Post data to the database.
2. Get data from the database to display on the app.
3. Update the database and have it dynamically show new submissions on the app.

### Roadmap for Future Development
1. Add authentication and authorization for secure API access.
2. Implement detailed logging for debugging and monitoring.
3. Optimize the database queries for better performance.
4. Expand the test suite to cover edge cases and integrations.
5. Create a user-friendly front-end interface for API interaction.

---

## Directory Structure

```
|-- project-root
    |-- docs/               # Documentation directory
    |-- public/             # Static assets
    |-- src/                # Source code
        |-- index.js        # Main entry point
    |-- package.json        # Node.js dependencies
    |-- README.md           # Project overview
```

---

## Additional Notes

If you encounter any issues or have questions, please refer to the README file or the 
project repository for additional support.
