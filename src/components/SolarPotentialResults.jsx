import React from 'react';
import { Button } from '@/components/ui/button';
import MapVisualization from './MapVisualization';
import ResultsCard from './ResultsCard';

const SolarPotentialResults = ({ address, showResults, solarData }) => {
  if (!showResults || !solarData) return null;

  return (
    <div className="max-w-5xl mx-auto my-10">
      <h2 className="text-3xl font-bold text-center mb-8">Your Solar Potential Results</h2>

      <MapVisualization address={address} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 my-8">
        <ResultsCard 
          icon="sun"
          value={solarData?.monthlyGeneration}
          unit="kWh"
          description="Monthly Generation"
          color="text-yellow-500"
        />

        <ResultsCard
          icon="zap"
          value={solarData?.recommendedSystemSize}
          unit="kW"
          description="Recommended System Size"
          color="text-anista-blue"
        />

        <ResultsCard
          icon="money"
          value={`$${Math.round(solarData?.costRangeMin)} - $${Math.round(solarData?.costRangeMax)}`}
          description="Estimated Cost Range"
          color="text-green-500"
        />

        <ResultsCard
          icon="leaf"
          value={Math.round(solarData?.annualCO2Reduction)}
          unit="tons"
          description="Annual CO2 Reduction"
          color="text-purple-500"
        />
      </div>

      <div className=" flex items-center justify-center text-center">
              <Button
          variant="outline"
          className="flex items-center gap-2 h-12 px-6 bg-blue-50 text-blue-700 border-blue-300 hover:bg-blue-100 hover:text-blue-800 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16h8M8 12h8m-8-4h8M4 6h16M4 18h16" />
          </svg>
          <span>Get Detailed Report</span>
        </Button>

      </div>
    </div>
  );
};

export default SolarPotentialResults;
