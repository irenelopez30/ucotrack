import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { tfgId } = body; 

    if (!tfgId) {
      return NextResponse.json({ error: 'No se proporcionó el ID' }, { status: 400 });
    }

 
    const uploadDir = path.join(process.cwd(), 'public/uploads');

    const files = fs.readdirSync(uploadDir);
    
    const fileToDelete = files.find(file => file.startsWith(tfgId));

    if (!fileToDelete) {
      return NextResponse.json({ error: 'Archivo no encontrado' }, { status: 404 });
    }

    const filePath = path.join(uploadDir, fileToDelete);

 
    fs.unlinkSync(filePath); 

    return NextResponse.json({ message: 'Archivo eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el archivo:', error);
    return NextResponse.json({ error: 'Error al eliminar el archivo' }, { status: 500 });
  }
}
