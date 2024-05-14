// src/DeviceDataForm.js

import React, { useState } from 'react';
import './DeviceDataForm.css';
import ElectricHeaterForm from './ElectricHeaterForm';
import InteriorAirSensorForm from './InteriorAirSensorForm';

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

  return (
    <div>
      <h3>Add Electric Heater</h3>
      <ElectricHeaterForm addElectricHeater={addElectricHeater} />
      <h3>Added Electric Heaters</h3>
      <ul>
        {electricHeaters.map((heater, index) => (
          <li key={index}>
            ID: {heater.id}, Capacity: {heater.capacity}
          </li>
        ))}
      </ul>

      <h3>Add Interior Air Sensor</h3>
      <InteriorAirSensorForm addInteriorAirSensor={addInteriorAirSensor} />
      <h3>Added Interior Air Sensors</h3>
      <ul>
        {interiorAirSensors.map((sensor, index) => (
          <li key={index}>
            Sensor ID: {sensor.sensorId}, Room ID: {sensor.roomId}, Max Temp: {sensor.maxTemp - 273.15}°C, Min Temp: {sensor.minTemp - 273.15}°C
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DeviceDataForm;
