import { NextRequest, NextResponse } from "next/server";

import dbConnection from "@/libs/dbConnection";
import Patient from "@/app/models/Patient";

export async function GET() {
  await dbConnection();
  const patients = await Patient.find({});
  return NextResponse.json({ status: 200, data: patients })
}

export async function PUT(req: NextRequest) {
  await dbConnection();
  return NextResponse.json({ status: 200 })
}

export async function DELETE(req: NextRequest) {
  await dbConnection();
  const { cpf } = await req.json();
  
  const deletedPatient = await Patient.findOneAndDelete({ cpf });

  return NextResponse.json({ 
    status: 200, 
    data: deletedPatient.cpf 
  })
}