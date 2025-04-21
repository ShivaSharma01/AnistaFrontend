import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx'; // Import the Layout component
import ChatPage from './pages/ChatPage.jsx';
import SolarEstimatorPage from './pages/SolarEstimaterPage';
import SolarScorePage from './pages/SolarScorePage';
import { SolarProvider } from './context/solarContext.jsx';
import { SurveyProvider} from "./context/SurveyContext";
import  SurveyLayout from "./pages/SurveyLayout";
import ReadinessChecklist from './pages/RedinessCheckList'; // Corrected casing
import RoofInformation from './pages/RoofInformation';
import ShadingAnalysis from './pages/ShadingaAnalysis';
import ElectricalSystem from './pages/ElectricalSystem';
import EnergyUsage from './pages/EnergyUsage';
import HomeOwnership from './pages/HomeOwnership';
import SurveyResults from './pages/SurveyResults';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <SolarProvider>
      <SurveyProvider>
    <BrowserRouter>
       <Routes>
        {/* Route for the home page (App) - doesn't use the shared Layout */}
        <Route path="/" element={<App />} />
        
        <Route path="/readiness-checklist" element={<SurveyLayout />}>
            <Route index element={<ReadinessChecklist />} />
            <Route path="roof-information" element={<RoofInformation />} />
            <Route path="shading-analysis" element={<ShadingAnalysis />} />
            <Route path="electrical-system" element={<ElectricalSystem />} />
            <Route path="energy-usage" element={<EnergyUsage />} />
            <Route path="home-ownership" element={<HomeOwnership />} />
            <Route path="results" element={<SurveyResults />} />
          </Route>

        {/* Routes that use the shared Layout (Navbar + Footer) */}
        <Route element={<Layout />}>
          <Route path="/chat" element={<ChatPage />} />
          <Route path='/estimator' element={<SolarEstimatorPage />} />
          <Route path='/solar-score' element={<SolarScorePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </SurveyProvider>
    </SolarProvider>
  </StrictMode>,
)
