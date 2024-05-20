// src/Input_Nodes.js

const generateNodesData = (interiorAirSensors) => {
  const nodes = {
    outside: {
      name: "outside",
      is_commodity: false,
      is_state: true,
      is_res: false,
      is_market: false,
      is_inflow: true,
      state: {
        in_max: 1e+10,
        out_max: 1e+10,
        state_loss_proportional: 0.0,
        state_max: 308.15,
        state_min: 238.15,
        initial_state: 268.15,
        is_scenario_independent: false,
        is_temp: true,
        t_e_conversion: 1e+9,
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
    },
    electricitygrid: {
      name: "electricitygrid",
      is_commodity: false,
      is_state: false,
      is_res: false,
      is_market: false,
      is_inflow: false,
      state: {
        in_max: 0.0,
        out_max: 0.0,
        state_loss_proportional: 0.0,
        state_max: 0.0,
        state_min: 0.0,
        initial_state: 0.0,
        is_scenario_independent: false,
        is_temp: true,
        t_e_conversion: 0.0,
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
    }
  };

  interiorAirSensors.forEach(sensor => {
    nodes[sensor.sensorId] = {
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

    nodes[sensor.roomId] = {
      name: sensor.roomId,
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
        initial_state: 273.15,
        is_scenario_independent: false,
        is_temp: true,
        t_e_conversion: 1.0,
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
  });

  return nodes;
};

export default generateNodesData;
