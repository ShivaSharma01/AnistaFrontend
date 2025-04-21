import { useNavigate } from "react-router-dom";
import { useSurvey } from "../context/SurveyContext";
import { Button } from "@/components/ui/button"
import SurveyContainer from "@/components/SurveryContainer";
import RadioOption from "../components/RadioOpiton"
import { ArrowRight, ArrowLeft } from "lucide-react";

const ElectricalSystem = () => {
  const navigate = useNavigate();
  const { surveyData, updateElectricalPanel, nextStep, prevStep } = useSurvey();
  
  const handleContinue = () => {
    nextStep();
    navigate("/readiness-checklist/energy-usage");
  };

  const handleBack = () => {
    prevStep();
    navigate("/readiness-checklist/shading-analysis");
  };

  const panelOptions = [
    'Modern panel (200A or higher, less than 20 years old)',
    'Older 200A panel (more than 20 years old)',
    '100A panel',
    'Fuse box or very old panel',
  ];

  return (
    <SurveyContainer title="Electrical System">
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-medium mb-4">What type of electrical panel do you have?</h3>
          <div className="space-y-2">
            {panelOptions.map((option) => (
              <RadioOption
                key={option}
                id={`panel-${option}`}
                name="electrical-panel"
                value={option}
                checked={surveyData.electricalPanel === option}
                onChange={(value) => updateElectricalPanel(value as any)}
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
            disabled={!surveyData.electricalPanel}
          >
            Continue <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </SurveyContainer>
  );
};

export default ElectricalSystem;