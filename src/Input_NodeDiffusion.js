// src/Input_NodeDiffusion.js

const generateNodeDiffusions = (interiorAirSensors) => {
  const frac_windows = 0.1;
  const hight_wall = 3.0;
  const cond_env_int = 0.04; // Example value for conductivity between environment and interior
  const cond_windows = 0.8;  // Example value for window conductivity
  const cond_wall_ext_env = 0.001;  // Conductivity between wall and external environment
  const cond_ceil_ext_env = 0.001;  // Conductivity between ceiling and external environment
  const cond_soil_env = 0.001;  // Conductivity between soil and environment

  return interiorAirSensors.reduce((acc, sensor, index) => {
    const diffusionIndex = index * 3 + 1; // Adjust index to ensure unique keys for each diffusion

    const roomWidth = parseFloat(sensor.roomWidth);
    const roomLength = parseFloat(sensor.roomLength);
    const surf_area_walls_total = 2 * hight_wall * (roomWidth + roomLength);
    const surf_area_walls = surf_area_walls_total * (1.0 - frac_windows);
    const surf_area_windows = surf_area_walls_total * frac_windows;
    const surf_area_floor = roomWidth * roomLength;
    const surf_area_ceiling = surf_area_floor;

    const diff_env_int = surf_area_walls * cond_env_int +
                         surf_area_windows * cond_windows +
                         surf_area_floor * cond_env_int +
                         surf_area_ceiling * cond_env_int;

    const diff_ext_env = surf_area_walls * cond_wall_ext_env +
                         surf_area_windows * cond_windows +
                         surf_area_ceiling * cond_ceil_ext_env;

    const diff_soil_env = surf_area_floor * cond_soil_env;

    acc[`diffusion_${diffusionIndex}`] = {
      diff_coeff: diff_env_int,
      name: `diffusion_${diffusionIndex}`,
      node1: sensor.sensorId,
      node2: sensor.roomId
    };
    acc[`diffusion_${diffusionIndex + 1}`] = {
      diff_coeff: diff_ext_env,
      name: `diffusion_${diffusionIndex + 1}`,
      node1: sensor.roomId,
      node2: "outside"
    };
    acc[`diffusion_${diffusionIndex + 2}`] = {
      diff_coeff: diff_soil_env,
      name: `diffusion_${diffusionIndex + 2}`,
      node1: sensor.roomId,
      node2: "soil"
    };

    return acc;
  }, {});
};

export default generateNodeDiffusions;
