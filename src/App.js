// src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './global.css';
import './App.css';
import DeviceDataForm from './DeviceDataForm';
import DataTable from './DataTable';
import InputDataCreator from './InputDataCreator';
import InputDataSender from './InputDataSender';
import Layout from './Layout';

function App() {
  const [jsonContent, setJsonContent] = useState({});
  const [electricHeaters, setElectricHeaters] = useState([]);
  const [interiorAirSensors, setInteriorAirSensors] = useState([]);

  const handleJsonContentChange = async (jsonObj) => {
    setJsonContent(jsonObj);
  };

  const deleteHeater = (id) => {
    const updatedHeaters = electricHeaters.filter(heater => heater.id !== id);
    setElectricHeaters(updatedHeaters);
  };

  const deleteSensor = (id) => {
    const updatedSensors = interiorAirSensors.filter(sensor => sensor.sensorId !== id);
    setInteriorAirSensors(updatedSensors);
  };

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={
            <div className="app-container">
              <div className="left-side">
                <h1>Device Data Entry</h1>
                <DeviceDataForm setElectricHeaters={setElectricHeaters} setInteriorAirSensors={setInteriorAirSensors} />
              </div>
              <div className="middle-section">
                <InputDataCreator
                  setJsonContent={handleJsonContentChange}
                  electricHeaters={electricHeaters}
                  interiorAirSensors={interiorAirSensors}
                />
                {jsonContent && (
                  <div>
                    <h2>Generated JSON:</h2>
                    <pre>{JSON.stringify(jsonContent, null, 2)}</pre>
                  </div>
                )}
              </div>
              <div className="right-side">
                <InputDataSender jsonContent={jsonContent} />
              </div>
            </div>
          } />
          <Route path="/data-table" element={
            <DataTable 
              electricHeaters={electricHeaters} 
              interiorAirSensors={interiorAirSensors} 
              deleteHeater={deleteHeater} 
              deleteSensor={deleteSensor} 
            />
          } />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
