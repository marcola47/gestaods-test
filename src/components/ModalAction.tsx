"use client";
import { usePatientsContext } from "@/app/context/Patients";
import { useUIContext } from "@/app/context/Ui";

import { FaXmark } from "react-icons/fa6";

export default function ModalAction(): JSX.Element {
  const { patients, setPatients } = usePatientsContext();
  const { setModalActionShown, setModalActionData, modalActionData } = useUIContext();
  
  async function deletePatient() {
    const res = await fetch(`/api/patients`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cpf: modalActionData })
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
    setModalActionShown(false);
    setModalActionData("");
  }

  return (
    <div 
      className="backdrop"
      onClick={ hideModal }
    >
      <div 
        className="modal modal--action"
        onClick={ e => e.stopPropagation() }
      >
        <div className="modal--action__header">
          <h2 className="modal__title">
            Excluir paciente?
          </h2>
          
          <FaXmark 
            className="modal__close"
            onClick={ () => setModalActionShown(false) }
          />
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
