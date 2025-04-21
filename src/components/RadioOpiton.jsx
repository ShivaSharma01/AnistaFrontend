import React from 'react';

const RadioOption = ({ id, name, value, checked, onChange, label }) => {
  return (
    <div className="flex items-center mb-4">
      <div className="relative flex items-start">
        <div className="flex items-center h-5">
          <input
            id={id}
            name={name}
            type="radio"
            value={value}
            checked={checked}
            onChange={() => onChange(value)}
            className="h-4 w-4 text-anista-blue border-gray-300 focus:ring-anista-blue cursor-pointer"
          />
          <div className={`absolute w-5 h-5 border rounded-full pointer-events-none ${checked ? 'border-anista-blue' : 'border-gray-300'}`}>
            {checked && (
              <div className="absolute inset-1 rounded-full bg-anista-blue"></div>
            )}
          </div>
        </div>
        <div className="ml-7 text-sm">
          <label htmlFor={id} className="font-medium text-gray-700 cursor-pointer">
            {label}
          </label>
        </div>
      </div>
    </div>
  );
};

export default RadioOption;
