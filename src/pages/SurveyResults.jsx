import { useNavigate } from "react-router-dom";
import { useSurvey } from "@/context/SurveyContext"
import { Button } from "@/components/ui/button";
import { Check, AlertTriangle } from "lucide-react";
import ResultsGradientBar from "@/components/ResultGradientBar";

const ResultItem = ({ title, description }) => {
  const isIdeal = () => {
    if (title === "Roof Condition" && description.includes("may need evaluation")) return false;
    if (title === "Roof Shading" && description.includes("Significant shading")) return false;
    if (title === "Electrical Setup" && description.includes("Panel upgrade likely required")) return false;
    return true;
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6 mb-4">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <div className={`rounded-full p-1 ${isIdeal() ? "bg-green-100" : "bg-orange-100"}`}>
            {isIdeal() ? (
              <Check className="h-5 w-5 text-green-600" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-orange-600" />
            )}
          </div>
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-medium">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
};

const SurveyResults = () => {
  const navigate = useNavigate();
  const { surveyData, resetSurvey } = useSurvey();

  const handleRestart = () => {
    resetSurvey();
    navigate("/readiness-checklist/roof-information");
  };

  // Generate appropriate descriptions based on survey answers
  const getRoofDescription = () => {
    if (surveyData.roofAge === 'Less than 5 years') {
      return `New ${surveyData.roofType?.toLowerCase()} roof, optimal for solar installation`;
    } else if (surveyData.roofAge === '5-10 years') {
      return `Moderately aged roof, ${surveyData.roofType} roof requires special mounting hardware`;
    } else {
      return `Aging ${surveyData.roofType?.toLowerCase()} roof, may need evaluation before installation`;
    }
  };

  const getShadeDescription = () => {
    if (surveyData.shadeAmount === 'Little to no shade throughout the day') {
      return 'Excellent sun exposure with minimal shading';
    } else if (
      surveyData.shadeAmount === 'Partial shade in the morning' ||
      surveyData.shadeAmount === 'Partial shade in the afternoon'
    ) {
      return 'Good sun exposure with some shading, consider panel placement carefully';
    } else {
      return 'Significant shading may reduce solar efficiency, consider tree trimming';
    }
  };

  const getElectricalDescription = () => {
    if (surveyData.electricalPanel === 'Modern panel (200A or higher, less than 20 years old)') {
      return 'Modern panel with capacity for solar';
    } else if (surveyData.electricalPanel === 'Older 200A panel (more than 20 years old)') {
      return 'Panel has capacity but may need inspection';
    } else {
      return 'Panel upgrade likely required before solar installation';
    }
  };

  const getEnergyDescription = () => {
    if (surveyData.energyUsage === 'High daytime usage (home occupied during day)') {
      return 'Daytime usage pattern ideal for direct solar consumption';
    } else {
      return 'Evening usage pattern may benefit from battery storage';
    }
  };

  const getOwnershipDescription = () => {
    if (surveyData.homeOwnership === 'Yes, I own my home') {
      return 'Home ownership allows for solar installation';
    } else if (surveyData.homeOwnership === 'No, but I plan to buy soon') {
      return 'Consider solar options when purchasing your home';
    } else {
      return 'Discuss solar options with your landlord';
    }
  };

  // Determine overall readiness
  const getReadinessScore = () => {
    let score = 0;
    
    // Roof age and type
    if (surveyData.roofAge === 'Less than 5 years') score += 25;
    else if (surveyData.roofAge === '5-10 years') score += 20;
    else if (surveyData.roofAge === '10-15 years') score += 10;
    else score += 5;

    // Shading
    if (surveyData.shadeAmount === 'Little to no shade throughout the day') score += 25;
    else if (surveyData.shadeAmount === 'Partial shade in the morning' || 
             surveyData.shadeAmount === 'Partial shade in the afternoon') score += 15;
    else score += 5;

    // Electrical panel
    if (surveyData.electricalPanel === 'Modern panel (200A or higher, less than 20 years old)') score += 25;
    else if (surveyData.electricalPanel === 'Older 200A panel (more than 20 years old)') score += 20;
    else if (surveyData.electricalPanel === '100A panel') score += 10;
    else score += 5;

    // Home ownership
    if (surveyData.homeOwnership === 'Yes, I own my home') score += 25;
    else if (surveyData.homeOwnership === 'No, but I plan to buy soon') score += 10;
    else score += 0;

    return score;
  };

  const readinessScore = getReadinessScore();
  const readinessStatus = readinessScore >= 70 ? 'Ready for Solar' : 'Some Preparation Needed';

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-3">Solar Readiness Results</h1>
      
      <div className="mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Solar Readiness Results</h2>
            <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">
              {readinessStatus}
            </span>
          </div>
          
          <div className="mb-6">
            <ResultsGradientBar percentage={readinessScore} />
          </div>

          <div className="space-y-4">
            <ResultItem title="Roof Condition" description={getRoofDescription()} />
            <ResultItem title="Roof Shading" description={getShadeDescription()} />
            <ResultItem title="Electrical Setup" description={getElectricalDescription()} />
            <ResultItem title="Energy Usage Profile" description={getEnergyDescription()} />
            <ResultItem title="Home Ownership" description={getOwnershipDescription()} />
          </div>
          
          <div className="mt-8 flex justify-center space-x-4">
           {/* Download Full Report Button */}
          <Button 
            variant="outline"
            className="flex items-center space-x-2 border-blue-500 text-white hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            <span>Download Full Report</span>
          </Button>

          {/* Get Solar Estimate Button */}
          <Button 
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800 transition-all duration-200 shadow-md"
            onClick={handleRestart}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
            </svg>
            <span>Get Solar Estimate</span>
          </Button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyResults;
