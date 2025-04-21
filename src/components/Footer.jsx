
import React from 'react';
import { Sun } from 'lucide-react';

const Footer = () => {
  return (
    // Added w-full
    <footer className="bg-[#111827] text-white py-10 w-full">
      {/* Removed container mx-auto */}
      <div className="px-4">
        <div className="flex flex-col md:flex-row justify-between items-start">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center">
              <Sun className="h-6 w-6 text-yellow-400 mr-2" />
              <span className="text-2xl font-bold text-anista-blue">Anista</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Features</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-anista-blue">Solar Estimator</a></li>
                <li><a href="#" className="hover:text-anista-blue">Solar Score</a></li>
                <li><a href="#" className="hover:text-anista-blue">Compare Solutions</a></li>
                <li><a href="#" className="hover:text-anista-blue">Readiness Checklist</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-anista-blue">Guides</a></li>
                <li><a href="#" className="hover:text-anista-blue">Solar FAQs</a></li>
                <li><a href="#" className="hover:text-anista-blue">Blog</a></li>
                <li><a href="#" className="hover:text-anista-blue">Support</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-anista-blue">About Us</a></li>
                <li><a href="#" className="hover:text-anista-blue">Careers</a></li>
                <li><a href="#" className="hover:text-anista-blue">Press</a></li>
                <li><a href="#" className="hover:text-anista-blue">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
