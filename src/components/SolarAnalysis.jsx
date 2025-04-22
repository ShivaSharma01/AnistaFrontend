import React from 'react';

const SolarAnalysis = ({ responseText }) => {
  // Extract bullet-style lines using regex
  const analysisPoints = Array.from(responseText.matchAll(/\*\*\s*(.*?)\s*\*\*\s*\(([\d.]+\/100)\):\s*(.+?)(?=(\*|Given|$))/gs)).map(match => ({
    title: match[1],
    score: match[2],
    description: match[3].trim(),
  }));

  // Extract summary & follow-up separately
  const summary = responseText.match(/Given.*?(?=Would|$)/s)?.[0]?.trim() || '';
  const followUp = responseText.match(/Would.*$/s)?.[0]?.trim() || '';

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 space-y-5">
      <h2 className="text-2xl font-bold text-green-700">🌞 Solar Suitability Analysis</h2>
      <div className="space-y-4">
        {analysisPoints.map((point, index) => (
          <div key={index} className="border-l-4 border-green-400 pl-4">
            <p className="font-semibold text-gray-800">{point.title} ({point.score}):</p>
            <p className="text-gray-700">{point.description}</p>
          </div>
        ))}
      </div>
      {summary && <p className="mt-4 text-green-800 font-semibold">✅ {summary}</p>}
      {followUp && <p className="text-gray-700">{followUp}</p>}
    </div>
  );
};

export default SolarAnalysis;
