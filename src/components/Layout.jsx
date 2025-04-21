import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {/* Outlet renders the matched child route component */}
      {/* Added container div for centering and max-width */}
      <main className="flex-1 bg-gray-50 py-8"> {/* Added some vertical padding */}
        <div className="container mx-auto px-4"> {/* Apply container centering/max-width */}
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
