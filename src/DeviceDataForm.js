// src/DeviceDataForm.js

import React, { useState } from 'react';
import './DeviceDataForm.css';
import ElectricHeaterForm from './ElectricHeaterForm';
import InputRoom from './InputRoom';

function DeviceDataForm({ setElectricHeaters, setInteriorAirSensors }) {
  const [electricHeaters, setLocalElectricHeaters] = useState([]);
  const [interiorAirSensors, setLocalInteriorAirSensors] = useState([]);

  const addElectricHeater = (heater) => {
    const updatedHeaters = [...electricHeaters, heater];
    setLocalElectricHeaters(updatedHeaters);
    setElectricHeaters(updatedHeaters);
  };

  const addInteriorAirSensor = (sensor) => {
    const updatedSensors = [...interiorAirSensors, sensor];
    setLocalInteriorAirSensors(updatedSensors);
    setInteriorAirSensors(updatedSensors);
  };

  const rooms = interiorAirSensors.map(sensor => ({ roomId: sensor.roomId }));

  return (
    <div>
      <h3>Add Interior Air Sensor and Room</h3>
      <InputRoom addInteriorAirSensor={addInteriorAirSensor} />
      <h3>Added Interior Air Sensors</h3>
      <ul>
        {interiorAirSensors.map((sensor, index) => (
          <li key={index}>
            Sensor ID: {sensor.sensorId}, Room ID: {sensor.roomId}, Room Width: {sensor.roomWidth}m, Room Length: {sensor.roomLength}m, Max Temp: {sensor.maxTemp - 273.15}°C, Min Temp: {sensor.minTemp - 273.15}°C
          </li>
        ))}
      </ul>

      <h3>Add Electric Heater</h3>
      <ElectricHeaterForm addElectricHeater={addElectricHeater} rooms={rooms} />
      <h3>Added Electric Heaters</h3>
      <ul>
        {electricHeaters.map((heater, index) => (
          <li key={index}>
            ID: {heater.id}, Capacity: {heater.capacity}, Room ID: {heater.roomId}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DeviceDataForm;
