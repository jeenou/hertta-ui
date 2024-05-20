// src/Input_NodeDiffusion.js

const generateNodeDiffusions = (interiorAirSensors) => {
  return interiorAirSensors.reduce((acc, sensor, index) => {
    const diffusionIndex = index * 2 + 1; // Adjust index to ensure unique keys for each diffusion
    acc[`diffusion_${diffusionIndex}`] = {
      diff_coeff: 0.5,
      name: `diffusion_${diffusionIndex}`,
      node1: sensor.sensorId,
      node2: sensor.roomId
    };
    acc[`diffusion_${diffusionIndex + 1}`] = {
      diff_coeff: 0.4,
      name: `diffusion_${diffusionIndex + 1}`,
      node1: sensor.roomId,
      node2: "outside"
    };
    return acc;
  }, {});
};

export default generateNodeDiffusions;
