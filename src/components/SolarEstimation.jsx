// src/components/SolarEstimator.jsx
import React from 'react';
import AddressForm from './AddressForm';
import SolarPotentialResults from './SolarPotentialResults';
import { useSolar } from '../context/solarContext'; // adjust the path if needed

const SolarEstimator = () => {
  const { address, showResults, solarData, handleAnalyze } = useSolar();
  console.log(solarData)
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Solar Potential Estimator</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Get accurate estimates of your home's solar potential based on location, roof characteristics, and
          local weather patterns.
        </p>
      </div>

      <AddressForm onAnalyze={handleAnalyze} />

      <SolarPotentialResults
        address={address}
        showResults={showResults}
        solarData={solarData}
      />
    </div>
  );
};

export default SolarEstimator;
