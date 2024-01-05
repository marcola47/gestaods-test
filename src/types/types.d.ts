type TPatient = {
  cpf: string;
  rg: string;
  name: string;
  nickname: string;
  email: string;
  birth: Date;
  nationality: string;
  gender: "male" | "female" | "other" | "not_declared";
  marital_status: "single" | "married" | "divorced" | "widower";
  observations: string;
  address: {
    ibge: string;
    cep: string;
    uf: string;
    city: string;
    neighborhood: string;
    street: string;
    number: number;
    complement: string;
  }
}