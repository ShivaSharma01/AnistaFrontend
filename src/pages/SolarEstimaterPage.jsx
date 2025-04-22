import React, { useState, useCallback } from 'react';
import SolarPotentialResults from '@/components/SolarPotentialResults';
import { useSolar } from '../context/solarContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { MapPin, Zap, Home, Factory } from 'lucide-react';

const SolarEstimatorPage = () => {
  const {
    address,
    setAddress,
    showResults,
    solarData,
    handleAnalyze,
    updateEnergyUsage,
    energyUsage,
    setPropertyType
  } = useSolar();

  const [localPropertyType, setLocalPropertyType] = useState('Residential');

  const handleCalculate = () => {
    // You can use propertyType in analysis if needed
    handleAnalyze(address);
  };

  const handlePropertyTypeChange = (type) => {
    setLocalPropertyType(type);
    setPropertyType(type);
  };

  return (
    <main className="flex-1 flex flex-col items-center">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl font-bold mb-4">Solar Potential Estimator</h1>
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
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your address"
            className="h-12 border-gray-200 rounded-lg"
          />
        </div>

       {/* Energy Consumption Input Section with Property Type */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8 border border-gray-200 shadow-sm">
        {/* Energy Consumption Header */}
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

        <div className="flex items-center gap-4 mb-6">
          <span className="text-xs text-gray-500 min-w-12">300 kWh</span>
          <div className="flex-1">
            <Slider
              value={[energyUsage]}
              min={300}
              max={2000}
              step={50}
              onValueChange={(value) => updateEnergyUsage(value[0])}
            />
            <div className="flex justify-between mt-2">
              <span className="text-[10px] text-gray-400">Low usage</span>
              <span className="text-[10px] text-gray-400">Average</span>
              <span className="text-[10px] text-gray-400">High usage</span>
            </div>
          </div>
          <span className="text-xs text-gray-500 min-w-12 text-right">2000 kWh</span>
        </div>

        {/* Property Type Section (inline below energy) */}
        <div className="mt-2">
          <h3 className="text-sm font-medium mb-3 text-gray-800">Property Type</h3>
          <div className="flex justify-center gap-4">
            <Button
              variant={localPropertyType === 'Residential' ? 'default' : 'outline'}
              className={`flex items-center gap-2 h-10 px-5 ${
                localPropertyType === 'Residential'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
              onClick={() => handlePropertyTypeChange('Residential')}
            >
              <Home className="h-4 w-4" />
              Residential
            </Button>

            <Button
              variant={localPropertyType === 'Commercial' ? 'default' : 'outline'}
              className={`flex items-center gap-2 h-10 px-5 ${
                localPropertyType === 'Commercial'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
              onClick={() => handlePropertyTypeChange('Commercial')}
            >
              <Factory className="h-4 w-4" />
              Commercial
            </Button>
          </div>
        </div>
      </div>

        <Button
          onClick={handleCalculate}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-6"
        >
          Calculate Solar Potential
        </Button>
      </div>

      <SolarPotentialResults
        address={address}
        showResults={showResults}
        solarData={solarData}
      />
    </main>
  );
};

export default SolarEstimatorPage;
