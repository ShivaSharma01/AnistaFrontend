import React from "react";
import { DollarSign, Clock, Zap } from "lucide-react";
import { useSolar } from "../context/solarContext";

const formatNumber = (num) => {
  if (num >= 1000) {
    return Math.floor(num / 1000) + 'k';
  }
  return num;
};

const MetricCard = ({ icon, title, value, subtext }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 text-center">
      <div className="flex justify-center mb-2">
        {icon}
      </div>
      <h3 className="text-gray-600 text-sm mb-2">{title}</h3>
      <div className="font-bold text-3xl mb-1">{value}</div>
      <p className="text-sm text-gray-500">{subtext}</p>
    </div>
  );
};


const KeyMetrics = () => {
  const { solarData } = useSolar();

  if (!solarData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <MetricCard
        icon={<DollarSign className="h-8 w-8 text-green-500" />}
        title="Recommended System Size"
        value={`${solarData.recommendedSystemSize} kW`}
        subtext="Optimal system size"
      />

      <MetricCard
        icon={<DollarSign className="h-8 w-8 text-green-500" />}
        title="Cost Range"
        value={`$${formatNumber(Math.round(solarData?.costRangeMin))} - $${formatNumber(Math.round(solarData?.costRangeMax))}`}
        subtext="Estimated cost"
      />

      <MetricCard
        icon={<Zap className="h-8 w-8 text-yellow-500" />}
        title="Annual CO2 Reduction"
        value={`${Math.round((solarData.annualCO2Reduction))} kg`}
        subtext="Environmental impact"
      />
    </div>
  );
};

export default KeyMetrics;
