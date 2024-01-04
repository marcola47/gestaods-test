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

export function formatCPF(cpf) {
  if (!cpf)
    return 'CPF inválido/não informado';
  
  const newCPF = cpf.replace(/\D/g, '');

  if (newCPF.length !== 11)
    return 'CPF inválido/não informado';
  
  const first = newCPF.slice(0, 3);
  const second = newCPF.slice(3, 6);
  const third = newCPF.slice(6, 9);
  const fourth = newCPF.slice(9, 11);

  return `${first}.${second}.${third}-${fourth}`;
}