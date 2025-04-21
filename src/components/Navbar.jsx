
import React from 'react';
import { Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from "react-router-dom";




const Navbar = () => {
  return (
    // Added w-full
    <nav className="flex justify-between items-center p-4 w-full">
      <div className="flex items-center">
        <Sun className="h-6 w-6 text-yellow-400 mr-2" />
        <span className="text-2xl font-bold text-anista-blue">Anista</span>
      </div>
      
      <div className="hidden md:flex space-x-6">
        <a href="/estimator" className="hover:text-anista-blue">Solar Estimator</a>
        <Link to="/solar-score" className="hover:text-anista-blue">Solar Score</Link>
        {/* <a href="/solar-score" >Solar Score</a> */}
        <a href="#" className="hover:text-anista-blue">Compare Solutions</a>
        <a href="/readiness-checklist" className="hover:text-anista-blue">Readiness Checklist</a>
        <a href="/chat" className="hover:text-anista-blue">AI Chat</a>
      </div>

      <Button className="bg-anista-blue hover:bg-anista-light-blue text-white">
        Get Started
      </Button>
    </nav>
  );
};

export default Navbar;
