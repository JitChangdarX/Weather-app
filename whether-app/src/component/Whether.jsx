import React, { useState } from "react";
import axios from "axios";

function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city.trim()) {
      alert("Please enter a city name.");
      return;
    }

    const apiKey = "2269b14901237d2c60bd26b6e1de37b4";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=en`;

    try {
      setLoading(true);
      const response = await axios.get(url);
      setWeather(response.data);
    } catch (error) {
      alert("City not found!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // CSS styles moved to constants for better readability
  const styles = {
    container: { padding: "20px", textAlign: "center", maxWidth: "500px", margin: "0 auto" },
    input: { padding: "12px 15px", fontSize: "16px", width: "70%", borderRadius: "25px", border: "1px solid #ddd" },
    button: { 
      padding: "12px 25px", 
      marginLeft: "10px", 
      cursor: "pointer", 
      background: "#4CAF50", 
      color: "white", 
      border: "none", 
      borderRadius: "25px",
      fontWeight: "bold"
    },
    weatherCard: {
      marginTop: "30px",
      background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      padding: "25px",
      borderRadius: "20px",
      boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
    }
  };

  return (
    <div style={styles.container}>
      <style jsx="true">{`
        .title {
          animation: slideIn 0.8s ease-out forwards;
          color: #2c3e50;
          margin-bottom: 30px;
        }
        
        .weather-button {
          transition: all 0.3s ease;
        }
        
        .weather-button:hover {
          transform: scale(1.05);
          background: #45a049 !important;
        }
        
        .weather-button:active {
          transform: scale(0.98);
        }
        
        .weather-card {
          animation: fadeInUp 0.5s ease-in-out forwards;
        }
        
        @keyframes slideIn {
          from { transform: translateY(-50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes fadeInUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        .pulse {
          animation: pulse 1.5s infinite;
        }
        
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
      `}</style>

      <h1 className="title pulse">🌤️ Weather Radar</h1>
      
      <div style={{ margin: "30px 0" }}>
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && fetchWeather()}
          style={styles.input}
        />
        <button
          className="weather-button"
          onClick={fetchWeather}
          disabled={loading}
          style={styles.button}
        >
          {loading ? "Loading..." : "Get Weather"}
        </button>
      </div>

      {weather && (
        <div className="weather-card" style={styles.weatherCard}>
          <h2 style={{ marginTop: 0 }}>{weather.name}, {weather.sys.country}</h2>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img 
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
              alt={weather.weather[0].description}
              style={{ width: "80px" }}
            />
            <p style={{ fontSize: "24px", margin: "0 10px" }}>
              <strong>{Math.round(weather.main.temp)}°C</strong>
            </p>
          </div>
          <p style={{ fontSize: "20px" }}>
            <strong>{weather.weather[0].main}</strong>
          </p>
          <div style={{ display: "flex", justifyContent: "space-around", marginTop: "20px" }}>
            <div>
              <p>💧 Humidity</p>
              <p><strong>{weather.main.humidity}%</strong></p>
            </div>
            <div>
              <p>💨 Wind</p>
              <p><strong>{weather.wind.speed} m/s</strong></p>
            </div>
            <div>
              <p>🌡️ Feels Like</p>
              <p><strong>{Math.round(weather.main.feels_like)}°C</strong></p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;