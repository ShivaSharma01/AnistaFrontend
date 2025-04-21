import { useNavigate } from "react-router-dom";
import { useSurvey } from "@/context/SurveyContext";
import { Button } from "@/components/ui/button";
import SurveyContainer from "@/components/SurveryContainer";
import RadioOption from "@/components/RadioOpiton";
import { ArrowRight, ArrowLeft } from "lucide-react";

const HomeOwnership = () => {
  const navigate = useNavigate();
  const { surveyData, updateHomeOwnership, nextStep, prevStep } = useSurvey();
  
  const handleContinue = () => {
    nextStep();
    navigate("/readiness-checklist/results");
  };

  const handleBack = () => {
    prevStep();
    navigate("/readiness-checklist/energy-usage");
  };

  const ownershipOptions = [
    'Yes, I own my home',
    'No, but I plan to buy soon',
    'No, I rent my home',
  ];

  return (
    <SurveyContainer title="Home Ownership">
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-medium mb-4">Do you own your home?</h3>
          <div className="space-y-2">
            {ownershipOptions.map((option) => (
              <RadioOption
                key={option}
                id={`ownership-${option}`}
                name="home-ownership"
                value={option}
                checked={surveyData.homeOwnership === option}
                onChange={(value) => updateHomeOwnership(value)}
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
        className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-6 py-3 rounded-full shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!surveyData.homeOwnership}
      >
        Continue <ArrowRight className="ml-2 h-4 w-4" />
      </Button>

        </div>
      </div>
    </SurveyContainer>
  );
};

export default HomeOwnership;
