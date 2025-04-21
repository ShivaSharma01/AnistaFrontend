import React from 'react';

const ResultsGradientBar = ({ percentage }) => {
  const clampedPercentage = Math.min(Math.max(percentage, 0), 100);

  return (
    <div className="relative py-6 w-full">
      {/* Background Bar */}
      <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
        {/* Filled Gradient Bar */}
        <div
          className="h-4 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 rounded-full"
          style={{ width: `${clampedPercentage}%` }}
        ></div>
      </div>

      {/* Thumb and Label */}
      <div
        className="absolute -top-6 transform -translate-x-1/2"
        style={{ left: `${clampedPercentage}%` }}
      >
        <div className="flex flex-col items-center">
          {/* Tooltip */}
          <div className="bg-gray-800 text-white text-xs font-medium rounded-md px-2 py-1 shadow-md">
            {clampedPercentage}%
          </div>
          <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-t-gray-800"></div>

          {/* Thumb */}
          <div className="w-4 h-4 bg-white rounded-full border-2 border-gray-800 shadow-md mt-1"></div>

          {/* Status Text */}
          <div className="text-sm font-semibold text-gray-800 mt-4">
            {clampedPercentage}% Ready
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsGradientBar;
