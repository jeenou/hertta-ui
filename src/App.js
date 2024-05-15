// src/App.js

import React, { useState, useEffect } from 'react';
import './global.css';
import './App.css';
import DeviceDataForm from './DeviceDataForm';
import DeviceControl from './DeviceControl';
import InputDataCreator from './InputDataCreator';
import Input_Room from './Input_Room';

function App() {
  const [deviceControls, setDeviceControls] = useState([]);
  const [yamlContent, setYamlContent] = useState('');
  const [electricHeaters, setElectricHeaters] = useState([]);
  const [interiorAirSensors, setInteriorAirSensors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://your-backend-endpoint/api/device-controls');
        const data = await response.json();
        setDeviceControls(data);
      } catch (error) {
        console.error('Error fetching device controls:', error);
      }
    };

    fetchData();
  }, []);

  const addInteriorAirSensor = (sensor) => {
    setInteriorAirSensors((prevSensors) => [...prevSensors, sensor]);
  };

  return (
    <div className="App">
      <div className="app-container">
        <div className="left-side">
          <h1>Device Data Entry</h1>
          <DeviceDataForm setElectricHeaters={setElectricHeaters} setInteriorAirSensors={setInteriorAirSensors} addInteriorAirSensor={addInteriorAirSensor} />
        </div>
        <div className="middle-section">
          <InputDataCreator setYamlContent={setYamlContent} electricHeaters={electricHeaters} interiorAirSensors={interiorAirSensors} />
          {yamlContent && (
            <div>
              <h2>Generated YAML:</h2>
              <pre>{yamlContent}</pre>
            </div>
          )}
        </div>
        <div className="right-side">
          <DeviceControl deviceControls={deviceControls} />
        </div>
      </div>
    </div>
  );
}

export default App;
