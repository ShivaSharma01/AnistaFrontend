import React from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '0.5rem',
};

const MapVisualization = ({ latitude, longitude, address }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyC-hSX-g67G4S9sDUgu9JRgxzaOxtVLaEk', // 🔑 Replace this!
  });

  const center = {
    lat: latitude,
    lng: longitude,
  };

  return (
    <div className="bg-gray-100 rounded-md p-6 flex flex-col items-center justify-center h-96 w-full">
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={20} // Adjusted for a closer house-level view
          mapTypeId="satellite" // Set to satellite view
        >
          <Marker position={center} />
        </GoogleMap>
      ) : (
        <p className="text-gray-500">Loading map...</p>
      )}
      <p className="text-sm text-gray-500 mt-4">
        Property analysis based on the address: {address}
      </p>
    </div>
  );
};

export default MapVisualization;

