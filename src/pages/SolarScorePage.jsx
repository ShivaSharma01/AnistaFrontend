// src/pages/SolarScorePage.jsx
import SolarScoreCircle from "../components/SolarScoreCircle";
import ScoreBreakdown from "../components/ScoreBreakdown";
import AIAnalysis from "../components/AIAnalysis";
import KeyMetrics from "../components/KeyMetrics";
import { useSolar } from "../context/solarContext";
import { useEffect, useState } from "react";

const SolarScorePage = () => {
  const { solarData, handleAnalyze, address } = useSolar();
  const [calculatedScore, setCalculatedScore] = useState(0);

  useEffect(() => {
    if (!solarData) {
      handleAnalyze(address);
    }
  }, [solarData, handleAnalyze, address]);

  const handleScoreCalculated = (score) => {
    setCalculatedScore(score);
  };

  return (
    <main className="flex flex-col items-center py-8">
      <div className="text-center mb-8 w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Your Personalized Solar Score
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Our AI has analyzed your location, energy usage, and solar potential to
          generate your personalized solar score.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 w-full max-w-3xl">
        <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center justify-center">
          <h3 className="text-lg font-semibold mb-4">Your Solar Score</h3>
          <SolarScoreCircle score={calculatedScore} />
        </div>

        <div>
          {solarData ? (
            <ScoreBreakdown onScoreCalculated={handleScoreCalculated} />
          ) : (
            <div>Loading Score Breakdown...</div>
          )}
        </div>
      </div>

      <div className="w-full max-w-3xl mb-8">
        <AIAnalysis  solarData={solarData} />
      </div>

      <div className="w-full max-w-3xl">
        {solarData ? <KeyMetrics /> : <div>Loading Key Metrics...</div>}
      </div>
    </main>
  );
};

export default SolarScorePage;

