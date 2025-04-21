import { useNavigate } from "react-router-dom";
import { useSurvey } from "@/context/SurveyContext";
import { Button } from "@/components/ui/button";
import SurveyContainer from "@/components/SurveryContainer";
import RadioOption from "@/components/RadioOpiton";
import { ArrowRight, ArrowLeft } from "lucide-react";

const ShadingAnalysis = () => {
  const navigate = useNavigate();
  const { surveyData, updateShadeAmount, nextStep, prevStep } = useSurvey();
  
  const handleContinue = () => {
    nextStep();
    navigate("/readiness-checklist/electrical-system");
  };

  const handleBack = () => {
    prevStep();
    navigate("/readiness-checklist/roof-information");
  };

  const shadeOptions = [
    'Little to no shade throughout the day',
    'Partial shade in the morning',
    'Partial shade in the afternoon',
    'Heavy shade most of the day',
  ];

  return (
    <SurveyContainer title="Shading Analysis">
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-medium mb-4">How much shade does your roof receive during the day?</h3>
          <div className="space-y-2">
            {shadeOptions.map((option) => (
              <RadioOption
                key={option}
                id={`shade-${option}`}
                name="shade-amount"
                value={option}
                checked={surveyData.shadeAmount === option}
                onChange={(value) => updateShadeAmount(value)}
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
            disabled={!surveyData.shadeAmount}
          >
            Continue <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </SurveyContainer>
  );
};

export default ShadingAnalysis;