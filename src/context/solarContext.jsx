// src/context/solarContext.js
import React, { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";

const SolarContext = createContext();

export const SolarProvider = ({ children }) => {
  const [address, setAddress] = useState("47 W 13th St, New York, NY 10011, USA");
  const [showResults, setShowResults] = useState(false);
  const [solarData, setSolarData] = useState(null);
  const [energyUsage, setEnergyUsage] = useState(500); // default 500kWh/month
  const [solarRadiationScore, setSolarRadiationScore] = useState(0);
  const [shadingScore, setShadingScore] = useState(0);
  const [roofScore, setRoofScore] = useState(0);
  const [consumptionScore, setConsumptionScore] = useState(0);
  const [financialScore, setFinancialScore] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [propertyType, setPropertyType] = useState('Residential');
  console.log("newPropertyTypeIs", propertyType)
  const getConsumptionScore = (kwh) => {
    if (kwh <= 200) return 20;
    if (kwh <= 400) return 40;
    if (kwh <= 700) return 60;
    if (kwh <= 1000) return 80;
    return 100;
  };

  const calculateFinancialScore = ({ annualSavings, paybackYears, lifetimeSavings }) => {
    const savingsScore = Math.min((annualSavings / 3000) * 40, 40);
    const paybackScore = paybackYears < 10 ? (10 - paybackYears) * 4 : 0;
    const lifetimeScore = Math.min((lifetimeSavings / 50000) * 20, 20);
    return Math.round(savingsScore + paybackScore + lifetimeScore);
  };

  const handleAnalyze = async (inputAddress) => {
    setAddress(inputAddress);
    setShowResults(true);
    try {
      const response = await axios.get(
        `http://localhost:3001/api/solar-analysis/solar-data?address=${inputAddress}`
      );
      console.log("API Response:", response.data);
      setSolarData(response.data);

      const solarRadiationScore = Math.min(
        (response.data?.solarRadiation / 150) * 100,
        100
      );
      const shadingScore =
        100 - (response.data?.shadingAnalysis?.annualShadingLossPercent || 0);
      const roofScore = Math.min(
        (response.data?.solarPotential?.maxArrayAreaMeters2 / (propertyType === 'Residential' ? 200 : 1000)) * 100,
        100
      );
      const consumptionScore = getConsumptionScore(energyUsage);
      const financialMetrics = response.data?.solarPotential?.financialMetrics;
      const financialScore = financialMetrics
        ? calculateFinancialScore({
            annualSavings: Number(financialMetrics.annualSavings),
            paybackYears: Number(financialMetrics.paybackYears),
            lifetimeSavings: Number(financialMetrics.lifetimeSavings),
          })
        : 0;
      const lat = response.data?.buildingInsights?.center?.latitude;
      const lng = response.data?.buildingInsights?.center?.longitude;
      setLatitude(lat || 0);
      setLongitude(lng || 0);
      setSolarRadiationScore(solarRadiationScore);
      setShadingScore(shadingScore);
      setRoofScore(roofScore);
      setConsumptionScore(consumptionScore);
      setFinancialScore(financialScore);

      return response.data;
    } catch (error) {
      console.error("Error fetching solar data:", error);
    }
  };

  const updateEnergyUsage = useCallback((value) => {
    console.log("Updating energy usage to:", value);
    setEnergyUsage(value);
  }, []);

  return (
    <SolarContext.Provider
      value={{
        address,
        showResults,
        solarData,
        handleAnalyze,
        setAddress,
        setShowResults,
        energyUsage,
        updateEnergyUsage,
        solarRadiationScore,
        setSolarRadiationScore,
        shadingScore,
        setShadingScore,
        roofScore,
        setRoofScore,
        consumptionScore,
        setConsumptionScore,
        financialScore,
        setFinancialScore,
        longitude,
        latitude,
        propertyType,
        setPropertyType
      }}
    >
      {children}
    </SolarContext.Provider>
  );
};

export const useSolar = () => useContext(SolarContext);
