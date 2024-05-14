// src/ElectricHeaterForm.js

import React, { useState } from 'react';

function ElectricHeaterForm({ addElectricHeater }) {
  const [id, setId] = useState('');
  const [capacity, setCapacity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addElectricHeater({ id, capacity: parseFloat(capacity) });
    setId('');
    setCapacity('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <label>Electric Heater ID:</label>
        <input 
          type="text" 
          value={id} 
          onChange={(e) => setId(e.target.value)} 
          required 
        />
      </div>
      <div className="input-group">
        <label>Capacity (float):</label>
        <input 
          type="number" 
          step="0.01" 
          value={capacity} 
          onChange={(e) => setCapacity(e.target.value)} 
          required 
        />
      </div>
      <button type="submit">Add Electric Heater</button>
    </form>
  );
}

export default ElectricHeaterForm;
