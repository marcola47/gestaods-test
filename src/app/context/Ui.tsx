"use client";
import { useState, useContext, createContext, Dispatch, SetStateAction } from "react";

interface UIContextProps {
  modalPatientShown: boolean;
  setModalPatientShown: Dispatch<SetStateAction<boolean>>;

  modalPatientData: Partial<TPatient> | null;
  setModalPatientData: Dispatch<SetStateAction<Partial<TPatient> | null>>;
  
  modalActionShown: boolean;
  setModalActionShown: Dispatch<SetStateAction<boolean>>;

  modalActionData: string;
  setModalActionData: Dispatch<SetStateAction<string>>;
}

const UIContext = createContext<UIContextProps>({
  modalPatientShown: false,
  setModalPatientShown: () => {},

  modalPatientData: null,
  setModalPatientData: () => {},

  modalActionShown: false,
  setModalActionShown: () => {},

  modalActionData: "",
  setModalActionData: () => {}
});

export const UIContextProvider = ({ children }: { children: any }) => {
  const [modalPatientShown, setModalPatientShown] = useState<boolean>(false);
  const [modalPatientData, setModalPatientData] = useState<Partial<TPatient> | null>(null);
  const [modalActionShown, setModalActionShown] = useState<boolean>(false);
  const [modalActionData, setModalActionData] = useState<string>("");

  return (
    <UIContext.Provider value={{ 
      modalPatientShown, setModalPatientShown,
      modalPatientData, setModalPatientData,
      modalActionShown, setModalActionShown,
      modalActionData, setModalActionData
    }}> { children }
    </UIContext.Provider>
  )
}

export const useUIContext = () => useContext(UIContext);