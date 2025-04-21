import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { CheckCircle } from "lucide-react";
import { Button } from '@/components/ui/button';

const SolarScoreCircle = ({ score }) => {
  const pathColor = "#4ade80"; // Green for top part
  const secondaryColor = "#60a5fa"; // Blue for bottom part (not used here, but you can use gradient if needed)

  return (
    <div className="flex flex-col items-center">
      <div className="w-48 h-48 relative">
        <CircularProgressbar
          value={score}
          maxValue={100}
          text={`${score}`}
          styles={buildStyles({
            textSize: "2rem",
            pathColor: pathColor,
            textColor: "#1f2937",
            trailColor: "#f3f4f6",
            pathTransitionDuration: 0.5,
            rotation: 0.75, // start at bottom
          })}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-sm text-gray-500 mt-8">out of 100</div>
      </div>

      <div className="mt-6 bg-green-100 text-green-800 px-4 py-1 rounded-full flex items-center justify-center">
        <CheckCircle size={16} className="mr-1" />
        <span className="font-medium">Excellent</span>
      </div>

      <div className="mt-6 text-center max-w-xs">
        <p className="text-gray-700 text-sm">
          Your home is an excellent candidate for solar power. 
          You can expect significant savings and environmental benefits.
        </p>
      </div>

      <Button className="mt-6 px-8 py-2">
        Get Full Report
      </Button>
    </div>
  );
};

export default SolarScoreCircle;
