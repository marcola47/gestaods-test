import { useState, useEffect, useRef } from 'react';
import { usePatientsContext } from '@/app/context/Patients';
import { useUIContext } from '@/app/context/Ui';

import { formatDate,  formatCPF } from '@/libs/formatting'
import { FaEllipsis } from 'react-icons/fa6';

export default function Patient({ 
  itemData: patient 
}: { 
  itemData: Partial<TPatient> 
}): JSX.Element {
  const { patients, setPatients } = usePatientsContext();
  const { setModalActionShown, setModalActionData, setModalPatientData, setModalPatientShown } = useUIContext();
  const [menuShown, setMenuShown] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // faz com o que o menu suma caso ocorra um click fora dele
  useEffect(() => {
    if (menuShown) {
      function handleClickOutside(event: MouseEvent) {
        const isDescendant = (parent: Node, child: Node | null): boolean => {
          if (!parent || !child) 
            return false;

          if (parent === child) 
            return true;

          return isDescendant(parent, child.parentNode as Node | null);
        };
  
        if (menuRef.current && !isDescendant(menuRef.current, event.target as Node)) 
          setMenuShown(false);
      }
  
      window.addEventListener("mousedown", handleClickOutside);
      return () => { window.removeEventListener("mousedown", handleClickOutside) };
    }
  }, [menuShown]);

  async function editPatient() {
    setModalPatientData(patient);
    setModalPatientShown(true);
  }

  async function deletePatient() {
    if (patient.cpf) {
      setModalActionData(patient.cpf);
      setModalActionShown(true);
    }
  }

  // as divs dentro do patient__data são necessárias pra centralizar verticalmente 
  // o texto mas manter as reticências no canto direito
  return (
    <div className="patient">
      <div className="patient__data patient__name">
        <div>
          { patient.name || "Nome não informado" }
        </div>
      </div>

      <div className="patient__data patient__cpf">
        <div>
          { formatCPF(patient.cpf) }
        </div>
      </div>
      
      <div className="patient__data patient__birth">
        <div>
          { formatDate(new Date(patient.birth!)) }
        </div>
      </div>
      
      <div className="patient__data patient__email">
        <div>
          { patient.email || "Email não informado" }
        </div>
      </div>
      
      <div className="patient__data patient__city">
        <div>
          { patient.address?.city || "Endereço não informado" }
        </div>
      </div>
      
      <div 
        className="patient__actions"
        onClick={ () => { setMenuShown(true) } }
      >
        <FaEllipsis className="patient__actions__toggle"/>

        {
          menuShown &&
          <div 
            className="patient__menu"
            onClick={ e => { e.stopPropagation() } }
            ref={ menuRef }
          >
            <div 
              className="patient__action"
              onClick={ editPatient }
            > Editar
            </div>

            <div 
              className="patient__action patient__action--danger"
              onClick={ deletePatient }
            > Excluir
            </div>
          </div>
        }
      </div>
    </div>
  )
}