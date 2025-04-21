import React, { useState } from 'react';
// Removed Navbar import
// Removed Footer import
import SolarPotentialResults from '@/components/SolarPotentialResults'; // Reverted to alias
import { useSolar } from '../context/solarContext';
import { Button } from '@/components/ui/button'; // Reverted to alias
import { Input } from '@/components/ui/input'; // Reverted to alias
import { Slider } from '@/components/ui/slider'; // Reverted to alias
import { MapPin, Zap } from 'lucide-react'; // PencilRuler might need checking later
const SolarEstimatorPage = () => {
  // Get state and functions from context
  const { address, setAddress, showResults, solarData, handleAnalyze, updateEnergyUsage,energyUsage } = useSolar();
  // Local state for energy consumption slider


  const handleCalculate = () => {
    // Trigger analysis using the address from context
    handleAnalyze(address);
  };

  return (
    // Removed outer div and Navbar
    // This main element is now the direct child of the container in Layout.jsx
    <main className="flex-1 flex flex-col items-center"> {/* Removed padding, handled by Layout */}
        {/* Removed max-w-3xl to allow full width */}
        <div className="max-w-3xl text-center">
          <h1 className="text-4xl font-bold mb-4">Solar Potential Estimator</h1>
          {/* Kept max-width on paragraph for readability */}
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            Get accurate estimates of your home's solar potential based on location, roof characteristics,
            and local weather patterns.
          </p>

          <div className="flex gap-4 mb-8 justify-center">
                  <Button
          variant="outline"
          className="flex items-center gap-2 h-12 px-6 bg-blue-50 text-blue-700 border-blue-300 hover:bg-blue-100 hover:text-blue-800 transition-colors"
        >
          <MapPin className="h-5 w-5 text-blue-600" />
          <span>Enter Address</span>
        </Button>

          </div>

          <div className="mb-8">
            <Input
              value={address} // Use address from context
              onChange={(e) => setAddress(e.target.value)} // Update context address
              placeholder="Enter your address"
              className="h-12 border-gray-200 rounded-lg"
            />
          </div>

          {/* Energy Consumption Input Section */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="bg-yellow-100 p-2 rounded-full">
                  <Zap className="h-5 w-5 text-yellow-500" />
                </div>
                <h3 className="text-lg font-medium ml-2">Monthly Energy Consumption</h3>
              </div>
              <span className="text-lg font-bold text-yellow-600">{energyUsage} kWh</span>
            </div>

            <p className="text-sm text-gray-500 mb-6">
              Providing your average monthly energy usage helps us calculate more accurate solar panel recommendations and potential savings.
            </p>

            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-500 min-w-12">300 kWh</span>
              <div className="flex-1">
              <Slider
                  value={[energyUsage]}
                  min={300}
                  max={2000}
                  step={50}
                  onValueChange={(value) => {
                    console.log("Slider value changed:", value[0]);
                    updateEnergyUsage(value[0]);
                  }}
              />

                <div className="flex justify-between mt-2">
                  <span className="text-[10px] text-gray-400">Low usage</span>
                  <span className="text-[10px] text-gray-400">Average</span>
                  <span className="text-[10px] text-gray-400">High usage</span>
                </div>
              </div>
              <span className="text-xs text-gray-500 min-w-12 text-right">2000 kWh</span>
            </div>
          </div>

          <Button
            onClick={handleCalculate} // Call handleAnalyze from context
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-6"
          >
            Calculate Solar Potential
          </Button>
        </div>

        {/* Render results below the form */}
        <SolarPotentialResults
          address={address}
          showResults={showResults}
          solarData={solarData}
        />
      {/* Removed Footer */}
    </main>
  );
};

export default SolarEstimatorPage;
