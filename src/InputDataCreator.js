// src/InputDataCreator.js

import React from 'react';
import yaml from 'js-yaml';
import Input_SetupData from './Input_SetupData';

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

    const processesData = electricHeaters.length > 0 ? {
      processes: electricHeaters.reduce((acc, heater) => {
        acc[heater.id] = {
          name: heater.id,
          groups: ["p1"],
          conversion: 1,
          is_cf: false,
          is_cf_fix: false,
          is_online: false,
          is_res: false,
          eff: 1.0,
          load_min: 0.0,
          load_max: 1.0,
          start_cost: 0.0,
          min_online: 0.0,
          min_offline: 0.0,
          max_online: 0.0,
          max_offline: 0.0,
          initial_state: 0.0,
          is_scenario_independent: false,
          topos: [
            {
              source: "electricitygrid",
              sink: heater.id,
              capacity: heater.capacity,
              vom_cost: 0.0,
              ramp_up: 1.0,
              ramp_down: 1.0,
              initial_load: 0.0,
              initial_flow: 0.0,
              cap_ts: {
                ts_data: []
              }
            },
            {
              source: heater.id,
              sink: "interiorair",
              capacity: heater.capacity,
              vom_cost: 0.0,
              ramp_up: 1.0,
              ramp_down: 1.0,
              initial_load: 0.0,
              initial_flow: 0.0,
              cap_ts: {
                ts_data: []
              }
            }
          ],
          cf: {
            ts_data: []
          },
          eff_ts: {
            ts_data: []
          },
          eff_ops: [],
          eff_fun: []
        };
        return acc;
      }, {})
    } : {};

    const nodesData = interiorAirSensors.length > 0 ? {
      nodes: interiorAirSensors.reduce((acc, sensor) => {
        acc[sensor.sensorId] = {
          name: sensor.sensorId,
          is_commodity: false,
          is_state: true,
          is_res: false,
          is_market: false,
          is_inflow: false,
          state: {
            in_max: 1e+10,
            out_max: 1e+10,
            state_loss_proportional: 0.0,
            state_max: sensor.maxTemp,
            state_min: sensor.minTemp,
            initial_state: 296.15,
            is_scenario_independent: false,
            is_temp: true,
            t_e_conversion: 0.5,
            residual_value: 0.0
          },
          cost: {
            ts_data: [
              { scenario: "s1", series: [] },
              { scenario: "s2", series: [] }
            ]
          },
          inflow: {
            ts_data: [
              { scenario: "s1", series: [] },
              { scenario: "s2", series: [] }
            ]
          }
        };
        return acc;
      }, {})
    } : {};

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
