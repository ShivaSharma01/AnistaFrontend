import './App.css';
import { FileTextIcon, BoltIcon, LeafIcon } from "lucide-react"
import { Link } from "react-router-dom"
import { SolarProvider } from './context/solarContext';
import Navbar from '@/components/Navbar'; // Import Navbar

function App() {

  return (
    <SolarProvider>
     <div className="min-h-screen flex flex-col">
      <Navbar /> {/* Use the Navbar component */}

      {/* Re-added container mx-auto */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Solar Energy Solutions</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Discover how solar energy can power your home, save you money, and help the environment.
          </p>
          <div className="mt-8">
            <Link to="/chat" className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-md text-lg">
              Chat with our AI Assistant
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <FileTextIcon className="w-6 h-6 text-blue-500" />
            </div>
            <h2 className="text-xl font-bold mb-2">Solar Panel Options</h2>
            <p className="text-gray-600">
              Explore different types of solar panels and find the perfect fit for your home and energy needs.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
              <BoltIcon className="w-6 h-6 text-yellow-500" />
            </div>
            <h2 className="text-xl font-bold mb-2">Cost & Savings</h2>
            <p className="text-gray-600">
              Calculate your potential savings and learn about financing options for your solar installation.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <LeafIcon className="w-6 h-6 text-green-500" />
            </div>
            <h2 className="text-xl font-bold mb-2">Incentives & Rebates</h2>
            <p className="text-gray-600">
              Discover federal, state, and local incentives that can significantly reduce your solar installation costs.
            </p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm border">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mr-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="6" fill="#14b8a6" />
                <path
                  d="M12 2V4M12 20V22M4 12H2M22 12H20M19.07 5L17.66 6.41M6.34 17.66L4.93 19.07M19.07 19.07L17.66 17.66M6.34 6.34L4.93 4.93"
                  stroke="#14b8a6"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold">AI Solar Assistant</h2>
          </div>
          <p className="text-gray-600 mb-6">
            Our AI-powered assistant can answer all your questions about solar energy, from technical specifications to
            financial considerations.
          </p>
          <Link to="/chat" className="inline-flex items-center text-blue-500 hover:bg-blue-700 font-medium">
            Chat with Anista AI
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </main>
    </div>
    </SolarProvider>
  )
}

export default App
