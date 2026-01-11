// weather.js
const fs = require('fs');

async function updateWeather() {
  try {
    // 1. Fetch weather data (Example: London coordinates. Change these!)
    // To find your coords, Google "My city latitude longitude"
    const lat = 51.5074;
    const long = -0.1278;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true`;

    const response = await fetch(url);
    const data = await response.json();
    
    if (!data.current_weather) {
      throw new Error("No weather data found");
    }

    const { temperature, windspeed, weathercode, time } = data.current_weather;

    // 2. Format the log entry
    const logEntry = `
| ${time.replace('T', ' ')} | ${temperature}°C | ${windspeed} km/h | Code: ${weathercode} |
`;

    // 3. Check if file exists to add header
    const fileName = 'WEATHER_LOG.md';
    let fileContent = '';
    
    if (!fs.existsSync(fileName)) {
      fileContent = `## 🌦️ Hourly Weather Log\n| Timestamp | Temp | Wind | Condition |\n|---|---|---|---|\n`;
    }

    // 4. Append the new row to the file
    fs.appendFileSync(fileName, logEntry);
    console.log("Weather log updated!");

  } catch (error) {
    console.error("Error fetching weather:", error);
    process.exit(1);
  }
}

updateWeather();
