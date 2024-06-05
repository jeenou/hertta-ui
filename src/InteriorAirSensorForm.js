// src/InteriorAirSensorForm.js

/*

import React, { useState } from 'react';

function InteriorAirSensorForm({ addInteriorAirSensor }) {
  const [sensorId, setSensorId] = useState('');
  const [roomId, setRoomId] = useState('');
  const [maxTemp, setMaxTemp] = useState('');
  const [minTemp, setMinTemp] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert Celsius to Kelvin
    const maxTempK = parseFloat(maxTemp) + 273.15;
    const minTempK = parseFloat(minTemp) + 273.15;

    addInteriorAirSensor({
      sensorId,
      roomId,
      maxTemp: maxTempK,
      minTemp: minTempK
    });

    setSensorId('');
    setRoomId('');
    setMaxTemp('');
    setMinTemp('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <label>Sensor ID:</label>
        <input
          type="text"
          value={sensorId}
          onChange={(e) => setSensorId(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <label>Room ID:</label>
        <input
          type="text"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <label>Max Temperature (°C):</label>
        <input
          type="number"
          step="0.01"
          value={maxTemp}
          onChange={(e) => setMaxTemp(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <label>Min Temperature (°C):</label>
        <input
          type="number"
          step="0.01"
          value={minTemp}
          onChange={(e) => setMinTemp(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Interior Air Sensor</button>
    </form>
  );
}

export default InteriorAirSensorForm;

*/
