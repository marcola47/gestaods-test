"use client";
import { useState, useEffect, useContext, createContext, Dispatch, SetStateAction } from "react";

interface PatientsContextProps {
  patients: TPatient[];
  setPatients: Dispatch<SetStateAction<TPatient[]>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  labels: { name: string, key: string }[];
}

const PatientsContext = createContext<PatientsContextProps>({
  patients: [],
  setPatients: () => {},

  loading: true,
  setLoading: () => {},

  labels: []
});

export const PatientsContextProvider = ({ children }: { children: any }) => {
  const [patients, setPatients] = useState<TPatient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const labels = [
    { name: "Nome", key: "name" },
    { name: "CPF", key: "cpf" },
    { name: "Data de Nascimento", key: "birth" },
    { name: "Email", key: "email" },
    { name: "Cidade", key: "address.city" },
    { name: "Ações", key: "actions" }
  ]

  async function getPatients() {
    const res = await fetch("/api/patients", {
      method: "GET",
      headers: { "Content-Type": "application/json"}
    })

    const { status, error, data } = await res.json();

    if (status !== 200)
      throw new Error(error)
    
    else {
      setPatients(data);
      setLoading(false);
    }
  } useEffect(() => { getPatients() }, []);

  return (
    <PatientsContext.Provider value={{ 
      patients, 
      setPatients,
      loading,
      setLoading,
      labels
    }}> { children }
    </PatientsContext.Provider>
  )
}

export const usePatientsContext = () => useContext(PatientsContext);