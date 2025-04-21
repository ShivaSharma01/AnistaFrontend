import React from 'react';
import { Sun, Zap, DollarSign, Leaf } from 'lucide-react';

const ResultsCard = ({ icon, value, unit, description, color }) => {
  const getIcon = () => {
    const iconClasses = `h-6 w-6 ${color}`;
    
    switch (icon) {
      case 'sun':
        return <Sun className={iconClasses} />;
      case 'zap':
        return <Zap className={iconClasses} />;
      case 'money':
        return <DollarSign className={iconClasses} />;
      case 'leaf':
        return <Leaf className={iconClasses} />;
      default:
        return <Sun className={iconClasses} />;
    }
  };
  
  return (
    <div className="border rounded-md p-6 flex flex-col items-center justify-center bg-white hover:shadow-md transition-shadow">
      <div className={`rounded-full p-3 mb-4 bg-opacity-20 ${color.replace('text-', 'bg-')}`}>
        {getIcon()}
      </div>
      
      <div className="text-center">
        <div className={`text-2xl font-bold ${color}`}>
          {value}
          {unit && <span className="ml-1">{unit}</span>}
        </div>
        <p className="text-gray-600 mt-1">{description}</p>
      </div>
    </div>
  );
};

export default ResultsCard;
