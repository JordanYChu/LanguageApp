import React, { useState } from 'react';

const InteractableSlider = ({ emotion = "Happiness" }) => {
  const [value, setValue] = useState(50);

  const handleChange = (event) => {
    setValue(Number(event.target.value));
  };

  return (
    <div className='radius-lg my-4 shadow-md px-4 py-1 rounded-xl'>
      <h2 className='text-center text-xl my-2'>{emotion}</h2>
      <input 
        type="range"
        min={0}
        max={100}
        step={1}
        value={value}
        onChange={handleChange}
        style={{ width: '100%' }}
      />
    </div>
  );
};

export default InteractableSlider;