import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Lightbulb } from "lucide-react";
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { useSolar } from '../context/solarContext';
import ReactMarkdown from 'react-markdown';

const formatAIResponse = (text) => {
  const sections = text.split(/(?=\*\*\s)/g);

  const renderSection = (section, index) => {
    const parts = section.split(/: (.+)/);
    const title = parts[0]?.replace(/\*\*/g, '');
    const description = parts[1];

    return (
      section.startsWith("**") ? (
        <li key={index} className="mb-2">
          <strong className="block">{title}</strong>
          <span className="ml-4 text-gray-700">{description}</span>
        </li>
      ) : null
    );
  };

  return (
    <ul className="list-disc list-inside space-y-2 text-gray-800 leading-relaxed">
      {sections.map(renderSection)}
    </ul>
  );
};

const AIAnalysis = () => {
  const [aiAnalysis, setAiAnalysis] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const streamingIntervalRef = useRef(null);
  const { solarRadiationScore, shadingScore, roofScore, consumptionScore, financialScore, solarData, energyUsage } = useSolar();

  const analyzeSolarData = async () => {
    setIsTyping(true);
    setAiAnalysis(''); // Clear previous analysis

    const prompt =  `
    You are a solar energy analysis expert. Perform a detailed solar suitability analysis for the following home or area. Use the provided parameters to evaluate solar potential and provide a final summary with a total solar suitability score (0–100).\n
    
    Input Parameters:\n
    - Solar Radiation Score: ${solarRadiationScore}\n
    - Shading Score: ${shadingScore}\n
    - Roof Score: ${roofScore}\n
    - Consumption Score: ${consumptionScore}\n
    - Financial Score: ${financialScore}\n
    - Energy Usage: ${energyUsage} kWh\n
    
    Instructions:\n
    1. Explain the significance of each individual score.\n
    2. Analyze the solarData values to give context (e.g., usable roof area, panel count, sunlight hours).\n
    3. Correlate energy usage with potential solar production to estimate offset and savings.\n
    4. Calculate and explain a final solar suitability score based on all parameters.\n
    5. End with a concise recommendation on whether this property is a good candidate for solar installation.\n
    `;

    try {
      const res = await axios.post("http://localhost:3001/chat", {
        message: prompt,
        userId: "1",
        sessionId: "12",
      });

      setIsTyping(false);

      const fullResponse = res.data.response;
      const words = fullResponse.split(' ');
      let wordIndex = 0;

      streamingIntervalRef.current = setInterval(() => {
        if (wordIndex < words.length) {
          const currentText = words.slice(0, wordIndex + 1).join(' ');
          setAiAnalysis(currentText);
          wordIndex++;
        } else {
          clearInterval(streamingIntervalRef.current);
          streamingIntervalRef.current = null;
        }
      }, 75);
    } catch (error) {
      console.error("Error fetching response:", error);
      if (streamingIntervalRef.current) {
        clearInterval(streamingIntervalRef.current);
        streamingIntervalRef.current = null;
      }
      setAiAnalysis("Sorry, I encountered an error. Please try again.");
      setIsTyping(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <div className="flex items-center mb-4">
        <Lightbulb className="h-6 w-6 text-blue-500 mr-2" />
        <h3 className="text-lg font-semibold">AI Analysis</h3>
      </div>
      {aiAnalysis ? (
        <div className="prose prose-sm max-w-none">
        <ReactMarkdown>{aiAnalysis}</ReactMarkdown>
      </div>
      ) : (
        <Button
          onClick={analyzeSolarData}
          className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-6 py-3 rounded-full shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed hover:text-white"
        >
          {isTyping ? 'Analyzing...' : 'Get AI Analysis'} <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default AIAnalysis;
