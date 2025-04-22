import React from 'react';
import { Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="w-full bg-white shadow-sm px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center space-x-2 hover:scale-105 transition-transform duration-200">
        <Sun className="h-6 w-6 text-yellow-400" />
        <span className="text-2xl font-bold text-black tracking-tight">Anista</span>
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
        <Link to="/estimator" className="text-gray-700 hover:text-blue-400 transition-colors duration-200">Solar Estimator</Link>
        <Link to="/solar-score" className="text-gray-700 hover:text-blue-400 transition-colors duration-200">Solar Score</Link>
        <Link to="#" className="text-gray-700 hover:text-blue-400 transition-colors duration-200">Compare Solutions</Link>
        <Link to="/readiness-checklist" className="text-gray-700 hover:text-blue-400 transition-colors duration-200">Readiness Checklist</Link>
        <Link to="/chat" className="text-gray-700 hover:text-blue-400 transition-colors duration-200">AI Chat</Link>
      </div>

      {/* CTA Button */}
      <Button className="bg-black hover:bg-light text-white px-5 py-2 rounded-full shadow-md transition-all duration-300">
        Get Started
      </Button>
    </nav>
  );
};

export default Navbar;

