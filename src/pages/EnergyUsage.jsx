import { useNavigate } from "react-router-dom";
import { useSolar } from "@/context/solarContext";
import { useSurvey } from "@/context/SurveyContext";
import { Button } from "@/components/ui/button";
import SurveyContainer from "@/components/SurveryContainer";
import RadioOption from "@/components/RadioOpiton";
import { ArrowRight, ArrowLeft } from "lucide-react";

const EnergyUsage = () => {
  const navigate = useNavigate();
  const { energyUsage, updateEnergyUsage } = useSolar();
  const { surveyData, nextStep, prevStep } = useSurvey();

  const handleContinue = () => {
    nextStep();
    navigate("/readiness-checklist/home-ownership");
  };

  const handleBack = () => {
    prevStep();
    navigate("/readiness-checklist/electrical-system");
  };

  const energyOptions = [
    'High daytime usage (home occupied during day)',
    'High evening usage (home occupied mainly evenings/nights)',
    'Consistent usage throughout day and night',
    'Highly seasonal or variable usage',
  ];

  return (
    <SurveyContainer title="Energy Usage">
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-medium mb-4">What best describes your energy usage pattern?</h3>
          <div className="space-y-2">
            {energyOptions.map((option) => (
              <RadioOption
                key={option}
                id={`energy-${option}`}
                name="energy-usage"
                value={option}
                checked={energyUsage === option}
                onChange={(value) => updateEnergyUsage(value)}
                label={option}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <Button 
            variant="outline"
            onClick={handleBack}
            className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-6 py-3 rounded-full shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          
          <Button 
            onClick={handleContinue}
            className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-6 py-3 rounded-full shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed hover:text-white"
            disabled={!energyUsage}
          >
            Continue <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </SurveyContainer>
  );
};

export default EnergyUsage;
