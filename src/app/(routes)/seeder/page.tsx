"use client";

export default function Seeder(): JSX.Element {
  async function seedPatients() {
    const res = await fetch("api/patients/seed", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });

    console.log( (await res.json()).status );
  }

  async function deletePatients() {
    const res = await fetch("api/patients/seed", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });

    console.log( (await res.json()).status );
  }
  
  return (
    <div className="seeder">
      <div className="seeder__btns">
        <div 
          className="btn btn--bg-blue"
          onClick={ seedPatients }
        > ADICIONAR 10 PACIENTES (Pode demorar uns 5-10seg por causa da busca do CEP)
        </div>

        <div 
          className="btn btn--bg-red"
          onClick={ deletePatients }
        > DELETAR TODOS OS PACIENTES
        </div>
      </div>
    </div>
  )
}