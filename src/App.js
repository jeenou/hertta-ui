import React, { useState, useEffect } from 'react';
import './global.css'; // Import global styles first
import './App.css'; // Then import App-specific styles
import DeviceDataForm from './DeviceDataForm';
import DeviceControl from './DeviceControl';
import InputDataCreator from './InputDataCreator';

function App() {
  // State to hold the device controls data
  const [deviceControls, setDeviceControls] = useState([]);
  // State to hold the generated YAML content
  const [yamlContent, setYamlContent] = useState('');
  // State to hold the electric heaters data
  const [electricHeaters, setElectricHeaters] = useState([]);
  // State to hold the interior air sensors data
  const [interiorAirSensors, setInteriorAirSensors] = useState([]);

  // Fetch the device control data from the backend when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch('http://your-backend-endpoint/api/device-controls');
        const data = await response.json();
        setDeviceControls(data);
      } catch (error) {
        console.error('Error fetching device controls:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <div className="app-container">
        <div className="left-side">
          <h1>Device Data Entry</h1>
          <DeviceDataForm setElectricHeaters={setElectricHeaters} setInteriorAirSensors={setInteriorAirSensors} />
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
