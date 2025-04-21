// src/context/solarContext.js
import React, { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";

const SolarContext = createContext();

export const SolarProvider = ({ children }) => {
  const [address, setAddress] = useState("47 W 13th St, New York, NY 10011, USA");
  const [showResults, setShowResults] = useState(false);
  const [solarData, setSolarData] = useState(null);
  const [energyUsage, setEnergyUsage] = useState(500); // default 500kWh/month

  const handleAnalyze = async (inputAddress) => {
    setAddress(inputAddress);
    setShowResults(true);
    try {
      const response = await axios.get(
        `http://localhost:3001/api/solar-analysis/solar-data?address=${inputAddress}`
      );
      console.log("API Response:", response.data);
      setSolarData(response.data);
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
      }}
    >
      {children}
    </SolarContext.Provider>
  );
};

export const useSolar = () => useContext(SolarContext);
