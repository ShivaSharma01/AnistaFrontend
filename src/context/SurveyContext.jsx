import { createContext, useContext, useState, useCallback } from 'react';

// Types for Survey Options (using strings in JavaScript)
// Note: These arrays are defined outside the component, so they are stable references.
const RoofAge = ['Less than 5 years', '5-10 years', '10-15 years', 'More than 15 years'];
const RoofType = ['Asphalt shingles', 'Metal', 'Tile', 'Flat roof', 'Other'];
const ShadeAmount = ['Little to no shade throughout the day', 'Partial shade in the morning', 'Partial shade in the afternoon', 'Heavy shade most of the day'];
const ElectricalPanel = ['Modern panel (200A or higher, less than 20 years old)', 'Older 200A panel (more than 20 years old)', '100A panel', 'Fuse box or very old panel'];
const HomeOwnership = ['Yes, I own my home', 'No, but I plan to buy soon', 'No, I rent my home'];

const SurveyContext = createContext(undefined);

export const useSurvey = () => {
  const context = useContext(SurveyContext);
  if (!context) {
    throw new Error('useSurvey must be used within a SurveyProvider');
  }
  return context;
};

// Define initialData outside the component to ensure it's a stable reference
const initialData = {
  roofAge: null,
  roofType: null,
  shadeAmount: null,
  electricalPanel: null,
  homeOwnership: null,
  currentStep: 1,
  totalSteps: 5,
};

export const SurveyProvider = ({ children }) => {
  // initialData is now defined outside the component

  const [surveyData, setSurveyData] = useState(initialData);

  // Wrap update functions in useCallback
  const updateRoofAge = useCallback((value) => {
    setSurveyData((prev) => ({ ...prev, roofAge: value }));
  }, []);

  const updateRoofType = useCallback((value) => {
    setSurveyData((prev) => ({ ...prev, roofType: value }));
  }, []);

  const updateShadeAmount = useCallback((value) => {
    setSurveyData((prev) => ({ ...prev, shadeAmount: value }));
  }, []);

  const updateElectricalPanel = useCallback((value) => {
    setSurveyData((prev) => ({ ...prev, electricalPanel: value }));
  }, []);

  const updateHomeOwnership = useCallback((value) => {
    setSurveyData((prev) => ({ ...prev, homeOwnership: value }));
  }, []);

  // Wrap navigation functions in useCallback
  const nextStep = useCallback(() => {
    setSurveyData((prev) => {
      if (prev.currentStep < prev.totalSteps) {
        return { ...prev, currentStep: prev.currentStep + 1 };
      }
      return prev;
    });
  }, []);

  const prevStep = useCallback(() => {
    setSurveyData((prev) => {
      if (prev.currentStep > 1) {
        return { ...prev, currentStep: prev.currentStep - 1 };
      }
      return prev;
    });
  }, []);

  const goToStep = useCallback((step) => {
    setSurveyData((prev) => {
      if (step >= 1 && step <= prev.totalSteps) {
        return { ...prev, currentStep: step };
      }
      return prev;
    });
  }, []);

  // Wrap resetSurvey in useCallback
  const resetSurvey = useCallback(() => {
    setSurveyData(initialData);
  }, []); // Dependency array can be empty now as initialData is stable outside

  // Wrap getCompletionPercentage in useCallback
  const getCompletionPercentage = useCallback(() => {
    return Math.round(((surveyData.currentStep - 1) / surveyData.totalSteps) * 100);
  }, [surveyData.currentStep, surveyData.totalSteps]);


  return (
    <SurveyContext.Provider
      value={{
        surveyData,
        updateRoofAge,
        updateRoofType,
        updateShadeAmount,
        updateElectricalPanel,
        updateHomeOwnership,
        nextStep,
        prevStep,
        goToStep,
        resetSurvey,
        getCompletionPercentage,
      }}
    >
     {children}
    </SurveyContext.Provider>
  );
};
