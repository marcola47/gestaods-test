"use client";
import { useState, useContext, createContext, Dispatch, SetStateAction } from "react";

interface UIContextProps {
  patientModalShown: boolean;
  setPatientModalShown: Dispatch<SetStateAction<boolean>>;

  patientModalData: Partial<TPatient> | null;
  setPatientModalData: Dispatch<SetStateAction<Partial<TPatient> | null>>;
  
  actionModalShown: boolean;
  setActionModalShown: Dispatch<SetStateAction<boolean>>;

  actionModalData: string;
  setActionModalData: Dispatch<SetStateAction<string>>;
}

const UIContext = createContext<UIContextProps>({
  patientModalShown: false,
  setPatientModalShown: () => {},

  patientModalData: null,
  setPatientModalData: () => {},

  actionModalShown: false,
  setActionModalShown: () => {},

  actionModalData: "",
  setActionModalData: () => {}
});

export const UIContextProvider = ({ children }: { children: any }) => {
  const [patientModalShown, setPatientModalShown] = useState<boolean>(false);
  const [patientModalData, setPatientModalData] = useState<Partial<TPatient> | null>(null);
  const [actionModalShown, setActionModalShown] = useState<boolean>(false);
  const [actionModalData, setActionModalData] = useState<string>("");

  return (
    <UIContext.Provider value={{ 
      patientModalShown, setPatientModalShown,
      patientModalData, setPatientModalData,
      actionModalShown, setActionModalShown,
      actionModalData, setActionModalData
    }}> { children }
    </UIContext.Provider>
  )
}

export const useUIContext = () => useContext(UIContext);