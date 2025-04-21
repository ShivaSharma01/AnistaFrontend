
import React from 'react';
import { Home } from 'lucide-react';

const MapVisualization = ({ address }) => {
  return (
    <div className="bg-gray-100 rounded-md p-6 flex flex-col items-center justify-center h-96">
      <Home className="h-12 w-12 text-gray-400 mb-2" />
      <div className="text-gray-500 text-center">
        <p>Map Visualization Placeholder</p>
      </div>
      <p className="text-sm text-gray-500 mt-10">
        Property analysis based on the address: {address}
      </p>
    </div>
  );
};

export default MapVisualization;