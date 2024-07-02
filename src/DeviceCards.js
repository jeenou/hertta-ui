import React from 'react';
import './DeviceCards.css';

function DeviceCards({ electricHeaters, interiorAirSensors, activeDevices, toggleDeviceStatus }) {
  return (
    <div className="device-cards">
      <h2>Device Cards</h2>
      <div className="cards-container">
        {electricHeaters.map((heater) => (
          <div key={heater.id} className="device-card">
            <h3>Heater ID: {heater.id}</h3>
            <p>Capacity: {heater.capacity}</p>
            <p>Room ID: {heater.roomId}</p>
            <label>
              <input 
                type="checkbox" 
                checked={activeDevices[heater.id]} 
                onChange={() => toggleDeviceStatus(heater.id)} 
              />
              On/Off
            </label>
          </div>
        ))}
        {interiorAirSensors.map((sensor) => (
          <div key={sensor.sensorId} className="device-card">
            <h3>Sensor ID: {sensor.sensorId}</h3>
            <p>Room ID: {sensor.roomId}</p>
            <p>Room Width: {sensor.roomWidth}m</p>
            <p>Room Length: {sensor.roomLength}m</p>
            <p>Max Temp: {(sensor.maxTemp - 273.15).toFixed(2)}°C</p>
            <p>Min Temp: {(sensor.minTemp - 273.15).toFixed(2)}°C</p>
            <label>
              <input 
                type="checkbox" 
                checked={activeDevices[sensor.sensorId]} 
                onChange={() => toggleDeviceStatus(sensor.sensorId)} 
              />
              On/Off
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DeviceCards;
