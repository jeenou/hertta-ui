// src/DeviceDataForm.js

import React, { useState, useEffect } from 'react';
import './DeviceDataForm.css';
import ElectricHeaterForm from './ElectricHeaterForm';
import InputRoom from './InputRoom';

function DeviceDataForm({ setElectricHeaters, setInteriorAirSensors }) {
  const [electricHeaters, setLocalElectricHeaters] = useState([]);
  const [interiorAirSensors, setLocalInteriorAirSensors] = useState([]);

  // Default data for testing
  useEffect(() => {
    const defaultSensors = [
      {
        sensorId: 'sensor1',
        roomId: 'room1',
        roomWidth: 5,
        roomLength: 4,
        maxTemp: 298.15,
        minTemp: 288.15,
        t_e_conversion_int: 1,
        t_e_conversion_env: 1
      },
      {
        sensorId: 'sensor2',
        roomId: 'room2',
        roomWidth: 6,
        roomLength: 5,
        maxTemp: 299.15,
        minTemp: 289.15,
        t_e_conversion_int: 1,
        t_e_conversion_env: 1
      }
    ];

    const defaultHeaters = [
      {
        id: 'heater1',
        capacity: 2,
        roomId: 'room1'
      },
      {
        id: 'heater2',
        capacity: 3,
        roomId: 'room2'
      }
    ];

    setLocalElectricHeaters(defaultHeaters);
    setLocalInteriorAirSensors(defaultSensors);
    setElectricHeaters(defaultHeaters);
    setInteriorAirSensors(defaultSensors);
  }, [setElectricHeaters, setInteriorAirSensors]);

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
            Sensor ID: {sensor.sensorId}, Room ID: {sensor.roomId}, Room Width: {sensor.roomWidth}m, Room Length: {sensor.roomLength}m, Max Temp: {(sensor.maxTemp - 273.15).toFixed(2)}°C, Min Temp: {(sensor.minTemp - 273.15).toFixed(2)}°C
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
