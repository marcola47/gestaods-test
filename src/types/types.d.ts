type TGender = "male" | "female" | "other" | "not_declared";
type TMaritalStatus = "single" | "married" | "divorced" | "widower" | "not_declared";

type TPatient = {
  cpf: string;
  rg: string;
  name: string;
  nickname: string;
  email: string;
  birth: Date;
  nationality: string;
  gender: TGender;
  marital_status: TMaritalStatus;
  observations: string;
  address: {
    ibge: string;
    cep: string;
    uf: string;
    city: string;
    neighborhood: string;
    street: string;
    number: number | null | undefined;
    complement: string | null | undefined;
  }
}