import { NextResponse } from "next/server";
import { faker } from "@faker-js/faker";

import dbConnection from "@/libs/dbConnection"
import Patient from "@/app/models/Patient";

function cepCallback(address: any, conteudo: any) {
  if (!("erro" in conteudo)) {
    address.ibge = conteudo.ibge;
    address.cep = conteudo.cep;
    address.uf = conteudo.uf;
    address.city = conteudo.localidade;
    address.neighborhood = conteudo.bairro;
    address.street = conteudo.logradouro;
    address.number = faker.number.int({ min: 1, max: 3000 });
    address.complement = faker.string.sample({ min: 32, max: 128 });
  }
}

export async function POST() {
  try {
    dbConnection();
    const patients: TPatient[] = []

    const ceps = [
      "83212270", "69918040", "49037509", "69316132", "54320334", "72507411",
      "79090060", "68903369", "78068744", "93044050", "69101176", "41219005",
      "58036015", "58404210", "69060010", "57025830", "44091558", "69077620",
      "88816274", "33920200", "66921240", "22753709", "95020170", "88054648"
    ]

    for (let i = 0; i < 100; i++) {
      const random = Math.round(Math.random())
      const sex = random === 0 ? "male" : "female"

      const cep = faker.helpers.arrayElement(ceps);
      const address = {
        ibge: "",
        cep: "",
        uf: "",
        city: "Cidade Foda",
        neighborhood: "",
        street: "",
        number: 0,
        complement: ""
      }

      // const cepResponse = await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
      //   method: "GET",
      //   headers: {
      //     "Content-Type": "application/json"
      //   }
      // })

      // if (cepResponse.ok) {
      //   const cepJson = await cepResponse.json()
      //   cepCallback(address, cepJson)
      // }

      const patient = new Patient({
        cpf: faker.string.numeric(11),
        rg: faker.string.numeric(9),
        name: faker.person.fullName({ sex: sex }),
        nickname: faker.internet.displayName(),
        email: faker.internet.email(),
        birth: faker.date.between({ from: '1950-01-01T00:00:00.000Z', to: '2006-01-01T00:00:00.000Z' }),
        nationality: "Brasil",
        gender: faker.helpers.arrayElement([sex, "other", "not_declared"]),
        marital_status: faker.helpers.arrayElement(["single", "married", "divorced", "widower"]),
        address: address
      });

      patients.push(patient);
    }

    console.log(patients)
    await Patient.insertMany(patients);
    return NextResponse.json({ status: 200 })
  }

  catch (err) {
    console.log(err)
    return NextResponse.json({
      status: 500,
      error: err
    })
  }
}

export async function DELETE() {
  try {
    dbConnection();
    await Patient.deleteMany({});
    return NextResponse.json({ status: 200 })
  }

  catch (err) {
    console.log(err)
    return NextResponse.json({
      status: 500,
      error: err
    })
  }
}