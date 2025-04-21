
import { useNavigate } from "react-router-dom";
import { useSurvey } from "@/context/SurveyContext";
import { Button } from "@/components/ui/button";
import SurveyContainer from "@/components/SurveryContainer";
import RadioOption from "@/components/RadioOpiton";
import { ArrowRight } from "lucide-react";

const RoofInformation = () => {
  const navigate = useNavigate();
  const { surveyData, updateRoofAge, updateRoofType, nextStep } = useSurvey();
  
  const handleContinue = () => {
    nextStep();
    navigate("/readiness-checklist/shading-analysis");
  };

  const roofAgeOptions = [
    'Less than 5 years',
    '5-10 years',
    '10-15 years',
    'More than 15 years',
  ];

  const roofTypeOptions = [
    'Asphalt shingles',
    'Metal',
    'Tile',
    'Flat roof',
    'Other',
  ];

  return (
    <SurveyContainer title="Roof Information">
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-medium mb-4">How old is your roof?</h3>
          <div className="space-y-2">
            {roofAgeOptions.map((option) => (
              <RadioOption
                key={option}
                id={`roof-age-${option}`}
                name="roof-age"
                value={option}
                checked={surveyData.roofAge === option}
                onChange={(value) => updateRoofAge(value)}
                label={option}
              />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">What type of roof do you have?</h3>
          <div className="space-y-2">
            {roofTypeOptions.map((option) => (
              <RadioOption
                key={option}
                id={`roof-type-${option}`}
                name="roof-type"
                value={option}
                checked={surveyData.roofType === option}
                onChange={(value) => updateRoofType(value)}
                label={option}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <Button 
            onClick={handleContinue}
            className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-6 py-3 rounded-full shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed hover:text-white"
            disabled={!surveyData.roofAge || !surveyData.roofType}
          >
            Continue <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </SurveyContainer>
  );
};

export default RoofInformation;