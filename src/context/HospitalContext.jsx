import React, { createContext, useContext, useState } from "react";

export const HospitalContext = createContext();

export const useHospital = () => {
  const context = useContext(HospitalContext);
  if (context === undefined) {
    throw new Error("useHospital must be used within a HospitalContextProvider");
  }
  return context;
};

export const HospitalContextProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [doctorServices, setDoctorServices] = useState([]);

  const getDoctors = async () => {
   
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/doctors");
      if (!response.ok) {
        throw new Error("Error al obtener los doctores");
      }
      const data = await response.json();
      console.log("Doctores obtenidos:", data);
      setDoctors(data);
    } catch (error) {
      setError(error.message);
      console.log("Error en getDoctors:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDoctors = () => {
    
    getDoctors(); 
  };
 
  const getServices = async () => {
    
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/services");
      if (!response.ok) {
        throw new Error("Error al obtener los servicios");
      }
      const data = await response.json();
      console.log("Servicios obtenidos:", data);
      setServices(data);
    } catch (error) {
      setError(error.message);
      console.log("Error en getServices:", error);
    } finally {
      setLoading(false);
      console.log("setLoading(false) en getServices");
    }
  };


  const fetchServices = () => {
   
    getServices();
  };

  const getDoctorServices = async () => {

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/doctor-services"); 
      if (!response.ok) {
        throw new Error("Error al obtener los servicios de los doctores");
      }
      const data = await response.json();
      console.log("Servicios de doctores obtenidos:", data);
      setDoctorServices(data); 
    } catch (error) {
      setError(error.message);
      console.log("Error en getDoctorServices:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const fetchDoctorServices = () => {

    getDoctorServices(); 
    console.log(doctorServices)
  };
  

  return (
    <HospitalContext.Provider
      value={{
        doctors,
        services,
        doctorServices,
        loading,
        error,
        fetchDoctors,
        fetchServices,
        fetchDoctorServices,
        getDoctors
      }}
    >
      {children}
    </HospitalContext.Provider>
  );
};
