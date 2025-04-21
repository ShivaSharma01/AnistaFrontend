import { Card } from "@/components/ui/card";
import ProgressBar from "@/components/ProgressBar";


const SurveyContainer = ({ children, title }) => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-3">Solar-Ready Home Checklist</h1>
      
      <p className="text-center text-gray-600 mb-8">
        Answer a few questions to determine if your home is ready for solar installation.
      </p>
      
      <ProgressBar />
      
      <Card className="p-8 shadow-lg rounded-lg border border-gray-200">
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
        {children}
      </Card>
    </div>
  );
};

export default SurveyContainer;
