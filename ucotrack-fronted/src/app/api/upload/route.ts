import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const tfgId = formData.get('id') as string;

    const file = formData.get('file') as File;

    if (!file || !tfgId) {
      return NextResponse.json({ error: 'No se proporcionaron archivos o ID' }, { status: 400 });
    }

    const uploadDir = path.join(process.cwd(), 'public/uploads');

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

   
    const fileExtension = path.extname(file.name); 

    if(fileExtension !== '.pdf') {
      return NextResponse.json({ error: 'Solo se permiten archivos PDF' }, { status: 400 });
    }
    const filePath = path.join(uploadDir, `${tfgId}${fileExtension}`);


    const buffer = Buffer.from(await file.arrayBuffer());

    fs.writeFileSync(filePath, buffer);

    return NextResponse.json({ message: 'Archivo guardado correctamente' });
  } catch (error) {
    console.error('Error al guardar el archivo:', error);
    return NextResponse.json({ error: 'Error al guardar el archivo' }, { status: 500 });
  }
}
