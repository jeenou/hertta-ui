// src/InputDataCreator.js

import React from 'react';
import yaml from 'js-yaml';
import Input_SetupData from './Input_SetupData';
import generateProcessesData from './Input_Processes';
import generateNodesData from './Input_Nodes';

function InputDataCreator({ setYamlContent, electricHeaters, interiorAirSensors }) {
  const handleGenerateYAML = () => {
    const startDate = new Date();
    let startHour = startDate.getHours();
    const currentMinutes = startDate.getMinutes();

    // If the current minutes are not 00, start from the next full hour
    if (currentMinutes > 0) {
      startHour += 1;
    }

    const timestamps = [];
    for (let i = 0; i < 12; i++) {
      const newDate = new Date(startDate);
      newDate.setHours(startHour + i);
      newDate.setMinutes(0);
      newDate.setSeconds(0);
      timestamps.push(newDate.toLocaleString('de-DE', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      }));
    }

    const temporalsData = {
      temporals: {
        t: timestamps,
        dtf: 0.0,
        is_variable_dt: false,
        variable_dt: [],
        ts_format: ""
      }
    };

    const setupData = Input_SetupData();
    const processesData = electricHeaters.length > 0 ? { processes: generateProcessesData(electricHeaters) } : {};
    const nodesData = { nodes: generateNodesData(interiorAirSensors) };

    const combinedData = {
      ...temporalsData,
      ...setupData,
      ...processesData,
      ...nodesData
    };

    const yamlStr = yaml.dump(combinedData);
    setYamlContent(yamlStr);
  };

  return (
    <div>
      <h1>YAML Generator</h1>
      <button onClick={handleGenerateYAML}>Generate YAML</button>
    </div>
  );
}

export default InputDataCreator;
