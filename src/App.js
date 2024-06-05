import React, { useState, useEffect } from 'react';
import './global.css';
import './App.css';
import DeviceDataForm from './DeviceDataForm';
import DeviceControl from './DeviceControl';
import InputDataCreator from './InputDataCreator';
import NetworkGraph from './NetworkGraph';
import ControlDataBarChart from './ControlDataBarChart';

function App() {
  const [deviceControls, setDeviceControls] = useState([]);
  const [jsonContent, setJsonContent] = useState('');
  const [controlData, setControlData] = useState({});
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

  const handleJsonContentChange = async (jsonString) => {
    setJsonContent(jsonString);

    // Send the JSON data to the backend and get control data
    try {
      console.log('Sending request to backend with JSON content:', jsonString);
      const response = await fetch('http://localhost:5551/process_json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonString,
      });

      if (response.ok) {
        const controlData = await response.json();
        console.log('Received control data:', controlData);
        setControlData(controlData);
      } else {
        console.error('Failed to send JSON data to the backend');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="App">
      <div className="app-container">
        <div className="left-side">
          <h1>Device Data Entry</h1>
          <DeviceDataForm setElectricHeaters={setElectricHeaters} setInteriorAirSensors={setInteriorAirSensors} />
        </div>
        <div className="middle-section">
          <InputDataCreator
            setJsonContent={setJsonContent}
            electricHeaters={electricHeaters}
            interiorAirSensors={interiorAirSensors}
            sendJsonData={() => handleJsonContentChange(jsonContent)}
          />
          {jsonContent && (
            <div>
              <h2>Generated JSON:</h2>
              <pre>{jsonContent}</pre> {/* Display JSON content as a string */}
            </div>
          )}
        </div>
        <div className="right-side">
          <DeviceControl deviceControls={deviceControls} />
          {jsonContent && (
            <div className="diagram-section">
              <NetworkGraph yamlContent={jsonContent} />
            </div>
          )}
          {Object.keys(controlData).length > 0 && (
            <div className="control-data-section">
              <ControlDataBarChart controlData={controlData} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
