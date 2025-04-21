import React, { useState } from 'react';
import { MapPin, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AddressForm = ({ onAnalyze }) => {
  const [address, setAddress] = useState('47 W 13th St, New York, NY 10011, USA');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onAnalyze(address);
  };
  
  return (
    <div className="max-w-4xl mx-auto my-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button variant="outline" className="py-3 px-6 flex items-center justify-center">
          <MapPin className="mr-2 h-5 w-5" />
          <span>Enter Address</span>
        </Button>

        {/* <Button variant="outline" className="py-3 px-6 flex items-center justify-center">
          <X className="mr-2 h-5 w-5" />
          <span>Draw Your Roof</span>
        </Button> */}
      </div>
      
      <form onSubmit={handleSubmit} className="mt-6 flex flex-col md:flex-row items-stretch">
        <div className="relative flex-grow">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full py-3 px-4 pr-10 border rounded-md focus:ring-2 focus:ring-anista-blue focus:border-anista-blue"
            placeholder="Enter your address"
          />
          <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
        
        <Button
          type="submit"
          className="bg-anista-blue hover:bg-anista-light-blue text-white px-6 py-3 md:ml-2 mt-2 md:mt-0 flex items-center justify-center"
        >
          <Search className="mr-2 h-5 w-5" />
          Analyze Solar Potential
        </Button>
        
      </form>
    </div>
  );
};

export default AddressForm;
