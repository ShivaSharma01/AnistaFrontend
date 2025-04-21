import { Lightbulb } from "lucide-react";

const AIAnalysis = ({solarData}) => {
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <div className="flex items-center mb-4">
        <Lightbulb className="h-6 w-6 text-blue-500 mr-2" />
        <h3 className="text-lg font-semibold">AI Analysis</h3>
      </div>
      
      <div className="text-gray-700 space-y-4">
        <p>
          Based on our comprehensive analysis of your home and location, our AI has determined that solar energy is a 
          highly suitable and financially beneficial option for you. Here's why:
        </p>
        
        <p>
          Your property receives approximately 5.8 peak sun hours daily, which is 20% above the national average. The 
          south-facing sections of your roof have an optimal tilt angle of 22°, maximizing solar capture throughout the 
          year.
        </p>
        
        <p>
          With your current electricity consumption of approximately 950 kWh monthly, we estimate an 8.5 kW system 
          would offset 92% of your utility costs. Based on current local incentives and electricity rates, you could expect 
          to recoup your initial investment within 7-9 years.
        </p>
        
        <p>
          Additionally, your location qualifies for the 30% federal tax credit and local utility rebates of approximately 
          $2,000, further improving the economics of your installation.
        </p>
      </div>
    </div>
  );
};

export default AIAnalysis;