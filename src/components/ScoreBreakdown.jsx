// src/components/ScoreBreakdown.jsx
import React, { useEffect, useState } from "react";
import { Sun, Home, Zap, Cloud, DollarSign } from "lucide-react";
import { useSolar } from "../context/solarContext";

const ScoreItem = ({ icon, title, score, description }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center">
          {icon}
          <span className="ml-2 font-medium">{title}</span>
        </div>
        <span className="font-bold text-gray-700">{score}/100</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="h-2.5 rounded-full"
          style={{
            width: `${score}%`,
            backgroundColor: score > 90 ? "#22c55e" : "#3b82f6",
          }}
        ></div>
      </div>
      <p className="mt-1 text-sm text-gray-600">{description}</p>
    </div>
  );
};

const ScoreBreakdown = ({ onScoreCalculated }) => {
  const { solarData, energyUsage } = useSolar();
  const [dummyState, setDummyState] = useState(0);

  console.log("Inscore breakdown page ", energyUsage)

  const solarRadiationScore = Math.min(
    (solarData?.solarRadiation / 150) * 100,
    100
  );
  const shadingScore =
    100 - (solarData?.shadingAnalysis?.annualShadingLossPercent || 0);
  const roofScore = Math.min(
    (solarData?.solarPotential?.maxArrayAreaMeters2 / 200) * 100,
    100
  );
    

  const getConsumptionScore = (kwh) => {
    if (kwh <= 200) return 20;
    if (kwh <= 400) return 40;
    if (kwh <= 700) return 60;
    if (kwh <= 1000) return 80;
    return 100;
  };
  const consumptionScore = getConsumptionScore(energyUsage);

  const calculateFinancialScore = ({ annualSavings, paybackYears, lifetimeSavings }) => {
    const savingsScore = Math.min((annualSavings / 3000) * 40, 40);
    const paybackScore = paybackYears < 10 ? (10 - paybackYears) * 4 : 0;
    const lifetimeScore = Math.min((lifetimeSavings / 50000) * 20, 20);
    return Math.round(savingsScore + paybackScore + lifetimeScore);
  };

  const financialMetrics = solarData?.solarPotential?.financialMetrics;
  const financialScore = financialMetrics
    ? calculateFinancialScore({
        annualSavings: Number(financialMetrics.annualSavings),
        paybackYears: Number(financialMetrics.paybackYears),
        lifetimeSavings: Number(financialMetrics.lifetimeSavings),
      })
    : 0;

  useEffect(() => {
    if (solarData) {
      const scores = [
        solarRadiationScore,
        shadingScore,
        roofScore,
        consumptionScore,
        financialScore,
      ];
      console.log(solarRadiationScore, "solarRadiationScore");
      console.log(shadingScore, "shadingScore");
      console.log(roofScore, "roofScore");
      console.log(shadingScore, "shadingScore");
      
      console.log(consumptionScore, "consumptionScore");
      console.log(financialScore, "financialScore");



      const validScores = scores.filter((score) => !isNaN(score));
      const averageScore =
        validScores.length > 0
          ? Math.round(
              validScores.reduce((sum, score) => sum + score, 0) /
                validScores.length
            )
          : 0;

      onScoreCalculated(averageScore);
    }
    setDummyState(prev => prev + 1);
  }, [
    solarData,
    solarRadiationScore,
    shadingScore,
    roofScore,
    consumptionScore,
    financialScore,
    energyUsage,
    onScoreCalculated,
  ]);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Score Breakdown</h3>

      <ScoreItem
        icon={<Sun className="h-5 w-5 text-yellow-500" />}
        title="Solar Radiation"
        score={Math.round(solarRadiationScore)}
        description="Your location receives excellent sunlight year-round."
      />

      <ScoreItem
        icon={<Home className="h-5 w-5 text-blue-500" />}
        title="Roof Suitability"
        score={Math.round(roofScore)}
        description="Your roof orientation and tilt are good for solar panels."
      />

      <ScoreItem
        icon={<Zap className="h-5 w-5 text-orange-500" />}
        title="Energy Consumption"
        score={Math.round(consumptionScore)}
        description="Your energy usage makes solar a worthwhile investment."
      />

      <ScoreItem
        icon={<Cloud className="h-5 w-5 text-gray-500" />}
        title="Shading Analysis"
        score={Math.round(shadingScore)}
        description="Minimal shading issues detected on your property."
      />

      <ScoreItem
        icon={<DollarSign className="h-5 w-5 text-green-500" />}
        title="Financial Benefit"
        score={Math.round(financialScore)}
        description="Strong ROI potential based on your location's incentives."
      />
    </div>
  );
};

export default ScoreBreakdown;
