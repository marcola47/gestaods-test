export function formatDate(date) {
  if (!date)
    return 'Data inválida/não informada';
  
  const newDate = new Date(date);

  if (newDate >= new Date())
    return 'Data inválida/não informada';
  
  const day = newDate.getDate().toString().padStart(2, '0');
  const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
  const year = newDate.getFullYear().toString();

  return `${day}/${month}/${year}`;
}

// preciso dos dois pq um verifica se é vazio ou não e eu to com preguiça de achar uma solução universal
export function formatCPF(cpf) {
  if (!cpf)
    return 'CPF inválido/não informado';
  
  const newCPF = cpf.replace(/\D/g, '');

  if (newCPF.length !== 11)
    return 'CPF inválido/não informado';
  
  const st = newCPF.slice(0, 3);
  const nd = newCPF.slice(3, 6);
  const rd = newCPF.slice(6, 9);
  const th = newCPF.slice(9, 11);

  return `${st}.${nd}.${rd}-${th}`;
}

export function formatCPFInput(cpf) {
  const cleanCPF = cpf.replace(/\D/g, '');
  const formattedCPF = cleanCPF.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
  return formattedCPF;
};