"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardTitle, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { useAuth } from '../ProtectedRoutes/ProtectedRoutes';
import { v4 as uuidv4 } from 'uuid';

interface SeguimientoProps {
  id: string;
}

interface Nota {
  id: string;
  informacion: string;
  fecha: string;
}

interface TfgInfo {
  id: string;
  titulo: string;
  nombre_alumno: string;
}

export function Seguimientos({ id }: SeguimientoProps) {
  const [nota, setNota] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [notas, setNotas] = useState<Nota[]>([]);
  const [tfgInfo, setTfgInfo] = useState<TfgInfo | null>(null);

  const router = useRouter();
  const { authState } = useAuth();
  const { token } = authState;

  useEffect(() => {
    const fetchNotas = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/tfg/notes/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Error al cargar las notas');
        }

        const data = await response.json();
        setNotas(data.notas);
      } catch (error) {
        setMensaje('Error al cargar las notas');
        console.error('Error:', error);
      }
    };

    const fetchTfgInfo = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/tfg/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Error al cargar la información del TFG');
        }

        const data = await response.json();
        setTfgInfo(data.tfg);
      } catch (error) {
        setMensaje('Error al cargar la información del TFG');
        console.error('Error:', error);
      }
    };

    fetchNotas();
    fetchTfgInfo();
  }, [id, token]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const idNota = uuidv4();
      const now = new Date();
      const formattedDate = now.toISOString(); 

      const response = await fetch(`http://localhost:3001/api/tfg/notes/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: idNota,
          id_tfg: id,
          informacion: nota,
          fecha: formattedDate,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al añadir la nota');
      }

      setMensaje('Nota añadida correctamente');

      const updatedResponse = await fetch(`http://localhost:3001/api/tfg/notes/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!updatedResponse.ok) {
        throw new Error('Error al cargar las notas');
      }

      const updatedData = await updatedResponse.json();
      setNotas(updatedData.notas);
      setNota('');

    } catch (error) {
      setMensaje('Error al añadir la nota');
      console.error('Error:', error);
    }
  };

  const handleDelete = async (notaId: string) => {
    try {
      const response = await fetch(`http://localhost:3001/api/tfg/notes/${notaId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error al eliminar la nota');
      }

      setMensaje('Nota eliminada correctamente');
      setNotas(notas.filter((nota) => nota.id !== notaId));
    } catch (error) {
      setMensaje('Error al eliminar la nota');
      console.error('Error:', error);
    }
  };

  const sortedNotas = notas.sort((a, b) => {
    const dateA = new Date(a.fecha);
    const dateB = new Date(b.fecha);
    return dateB.getTime() - dateA.getTime();
  });

  const formatDate = (date: string) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString();
  };

  const handleDownload = () => {
    if (!tfgInfo) return;

    let textContent = `TFG: ${tfgInfo.titulo}\nAlumno: ${tfgInfo.nombre_alumno}\n\nNotas:\n`;
    sortedNotas.forEach((nota) => {
      textContent += `Fecha: ${formatDate(nota.fecha)}\nNota: ${nota.informacion}\n\n`;
    });

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `seguimientos_${tfgInfo.titulo.replace(/\s+/g, '_').toLowerCase()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Añadir nota al TFG de {tfgInfo && (tfgInfo.nombre_alumno)}</CardTitle>
          <h4><strong>{tfgInfo && (tfgInfo.titulo)}</strong></h4>
        </CardHeader>
        <CardContent className="grid gap-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Textarea
                  id="note"
                  placeholder="Agregar una nota..."
                  value={nota}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNota(e.target.value)}
                  required
                />
                <Button type="submit">+</Button>
              </div>
            </div>
          </form>
          {mensaje && (
            <p className="text-center text-sm text-red-500 mt-2">{mensaje}</p>
          )}
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Notas Existentes</h2>
            {sortedNotas.length > 0 ? (
              <div className="relative">
                <div className="border-l-2 border-gray-200 absolute h-full top-0 left-4"></div>
                <ul className="space-y-4 ml-8">
                  {sortedNotas.map((nota) => (
                    <li key={nota.id} className="relative flex items-start space-x-4">
                      <div className="w-2.5 h-2.5 bg-gray-200 rounded-full absolute -left-1.5 top-2"></div>
                      <div className="flex-1 flex flex-col">
                        <div className="flex items-center justify-between w-full">
                          <p><strong>{formatDate(nota.fecha)}</strong> </p>
                          <Button
                            type="button"
                            onClick={() => handleDelete(nota.id)}
                            className="ml-4 bg-red-500 text-white"
                          >
                            Eliminar
                          </Button>
                        </div>
                        <p>{nota.informacion}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>No hay notas disponibles.</p>
            )}
          </div>
          <CardFooter className="justify-end">
            <Button onClick={handleDownload}>Descargar Notas</Button>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
}
