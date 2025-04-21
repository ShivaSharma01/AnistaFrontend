
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useSurvey } from "@/context/SurveyContext";
import Navbar from "@/components/Navbar";

const ReadinessChecklist = () => {
  const { resetSurvey } = useSurvey();
  
  useEffect(() => {
    // Reset the survey when entering the main checklist page
    resetSurvey();
  }, [resetSurvey]);
  
  // Redirect to the first step
  return <Navigate to="/readiness-checklist/roof-information" replace />;
};

export default ReadinessChecklist;