import React, { useState } from 'react';
import './global.css';
import './App.css';
import DeviceDataForm from './DeviceDataForm';
import DeviceControl from './DeviceControl';
import InputDataCreator from './InputDataCreator';
import InputDataSender from './InputDataSender'; // Import the sender component

function App() {
  const [jsonContent, setJsonContent] = useState({});
  const [electricHeaters, setElectricHeaters] = useState([]);
  const [interiorAirSensors, setInteriorAirSensors] = useState([]);

  const handleJsonContentChange = async (jsonObj) => {
    setJsonContent(jsonObj);
  };

  return (
    <div className="App">
      <div className="app-container">
        <div className="left-side">
          <h1>Device Data Entry</h1>
          <DeviceDataForm setElectricHeaters={setElectricHeaters} setInteriorAirSensors={setInteriorAirSensors} />
        </div>
        <div className="middle-section">
          {/* Use InputDataCreator component */}
          <InputDataCreator
            setJsonContent={handleJsonContentChange}
            electricHeaters={electricHeaters}
            interiorAirSensors={interiorAirSensors}
          />
          {/* Display JSON content if available */}
          {jsonContent && (
            <div>
              <h2>Generated JSON:</h2>
              <pre>{JSON.stringify(jsonContent, null, 2)}</pre>
            </div>
          )}
        </div>
        <div className="right-side">
          <DeviceControl deviceControls={[]} /> {/* Pass an empty array if necessary */}
          {/* Use InputDataSender component */}
          <InputDataSender jsonContent={jsonContent} />
        </div>
      </div>
    </div>
  );
}

export default App;
