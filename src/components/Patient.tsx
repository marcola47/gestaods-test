import { formatDate,  formatCPF } from '@/libs/formatting'
import { FaEllipsis } from 'react-icons/fa6';

export default function Patient({ 
  itemData: patient 
}: { 
  itemData: Partial<TPatient> 
}): JSX.Element {

  return (
    <div className="patient">
      <div className="patient__data patient__name">
        { patient.name || "Nome não informado" }
      </div>

      <div className="patient__data patient__cpf">
        { formatCPF(patient.cpf) }
      </div>
      
      <div className="patient__data patient__birth">
        { formatDate(new Date(patient.birth!)) }
      </div>
      
      <div className="patient__data patient__email">
        { patient.email || "Email não informado" }
      </div>
      
      <div className="patient__data patient__city">
        { patient.address?.city || "Endereço não informado" }
      </div>
      
      <div className="patient__actions">
        <FaEllipsis/>
      </div>
    </div>
  )
}