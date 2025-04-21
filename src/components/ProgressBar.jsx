import React from 'react';
import { useSurvey } from '@/context/SurveyContext';

const ProgressBar = () => {
  const { getCompletionPercentage, surveyData } = useSurvey();
  const percentage = getCompletionPercentage();

  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="text-sm text-gray-600">Getting Started</span>
        <span className="text-sm text-gray-600">Report Complete</span>
      </div>
      <div className="h-2 w-full bg-gray-100 rounded-full mb-2">
        <div
          className="h-full rounded-full bg-blue-500 transition-all duration-500 motion-reduce:transition-none"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="flex justify-between">
        <span className="text-sm text-gray-600">
          Step {surveyData.currentStep} of {surveyData.totalSteps}
        </span>
        <span className="text-sm text-gray-600">{percentage}% Complete</span>
      </div>
    </div>
  );
};

export default ProgressBar;
