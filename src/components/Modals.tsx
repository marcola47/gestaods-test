"use client";
import { usePatientsContext } from "@/app/context/Patients";
import { useUIContext } from "@/app/context/Ui";

import { FaX, FaXmark } from "react-icons/fa6";

export function ModalAction(): JSX.Element {
  const { patients, setPatients } = usePatientsContext();
  const { setActionModalShown, setActionModalData, actionModalData } = useUIContext();
  
  async function deletePatient() {
    const res = await fetch(`/api/patients`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cpf: actionModalData })
    })

    const { status, error, data } = await res.json();

    if (status !== 200)
      throw new Error(error)
    
    else {
      const patientsCopy = patients.filter(p => p.cpf !== data);
      setPatients(patientsCopy);
      hideModal();
    }
  }
  
  function hideModal() {
    setActionModalShown(false);
    setActionModalData("");
  }

  return (
    <div className="backdrop">
      <div className="modal modal--action">
        <div className="modal--action__header">
          <h2>Excluir paciente?</h2>
          <FaXmark onClick={ () => setActionModalShown(false) }/>
        </div>
  
        <div className="modal--action__body">
          <img 
            className="modal__art"
            src="art.png" 
            alt="art" 
          />

          <p className="modal__prompt">
            Tem certeza que deseja excluir o paciente selecionado?
          </p>
          
          <p className="modal__warning">
            Essa ação não poderá ser desfeita.
          </p>
        </div>

        <div className="modal__btns">
          <div 
            className="btn btn--border-blue"
            onClick={ hideModal }
          > Cancelar
          </div>

          <div 
            className="btn btn--bg-red"
            onClick={ deletePatient }
          > Excluir
          </div>
        </div>
      </div>
    </div>
  )
}

export function ModalPatient(): JSX.Element {
  
  return (
    <div className="modal modal--patient">
      asdasdasda
    </div>
  )
}