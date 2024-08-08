"use client"
import React, { useState } from 'react';
import { Card, CardTitle, CardDescription, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Select from 'react-select';
import { v4 as uuid4 } from 'uuid';
import { useAuth } from '../ProtectedRoutes/ProtectedRoutes';
import { useRouter } from 'next/navigation';

export function Crear() {
  const [titulo, setTitulo] = useState('');
  const [añoAcademico, setAñoAcademico] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [nombreAlumno, setNombreAlumno] = useState('');
  const [correoAlumno, setCorreoAlumno] = useState('');
  const [telefonoAlumno, setTelefonoAlumno] = useState('');
  const [estado, setEstado] = useState('');
  const [mensaje, setMensaje] = useState('');

  const router = useRouter();
  const { authState } = useAuth(); 
  const { token } = authState;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validar que los campos "Estado" y "Año Académico" no estén vacíos
    if (!estado || !añoAcademico) {
      setMensaje('Por favor, selecciona un estado y un año académico.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/tfg/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: uuid4(),
          id_profesor: token,
          titulo,
          año_academico: añoAcademico,
          descripcion,
          nombre_alumno: nombreAlumno,
          correo_alumno: correoAlumno,
          telefono_alumno: telefonoAlumno,
          estado,
        }),
      });

      if (!response.ok) {
        console.log(response);
        throw new Error('Error al crear el TFG');
      }

      const data = await response.json();
      setMensaje('TFG creado correctamente');
      router.push('/tfg/listar');
    } catch (error) {
      setMensaje('Error al crear el TFG');
      console.error('Error:', error);
    }
  };

  const currentYear = new Date().getFullYear();

  // Crear las opciones para los 3 años anteriores y 3 años posteriores
  const optionsAñoAcademico = Array.from({ length: 7 }, (_, index) => {
    const year = currentYear - 3 + index;
    return { value: `${year}-${year + 1}`, label: `${year}-${year + 1}` };
  });

  // Opciones para el Select de Estado
  const optionsEstado = [
    { value: 'pending', label: 'Pendiente de petición' },
    { value: 'approved', label: 'Petición aprobada' },
    { value: 'in-progress', label: 'En desarrollo' },
    { value: 'submitted', label: 'Entregado' },
    { value: 'presented', label: 'Presentado' }
  ];

  return (
    <div className="flex justify-center items-center min-h-screen">
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Crear Trabajo de Fin de Grado</CardTitle>
        <CardDescription>Completa el formulario para crear un nuevo TFG.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                placeholder="Ingresa el título del TFG"
                required
                value={titulo}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitulo(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="year">Año Académico</Label>
              <Select
                options={optionsAñoAcademico}
                value={optionsAñoAcademico.find(option => option.value === añoAcademico)}
                onChange={(option: any) => setAñoAcademico(option.value)}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              placeholder="Describe el TFG"
              value={descripcion}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescripcion(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="student-name">Nombre del Alumno</Label>
              <Input
                id="student-name"
                placeholder="Ingresa el nombre del alumno"
                required
                value={nombreAlumno}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNombreAlumno(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="student-email">Correo Electrónico</Label>
              <Input
                id="student-email"
                placeholder="Ingresa el correo electrónico"
                type="email"
                value={correoAlumno}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCorreoAlumno(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="student-phone">Teléfono</Label>
              <Input
                id="student-phone"
                placeholder="Ingresa el número de teléfono"
                type="tel"
                value={telefonoAlumno}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTelefonoAlumno(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Estado</Label>
              <Select
                options={optionsEstado}
                value={optionsEstado.find(option => option.value === estado)}
                onChange={(option: any) => setEstado(option.value)}
                required
              />
            </div>
          </div>
          <CardFooter className="justify-end">
            <Button type="submit">Crear TFG</Button>
          </CardFooter>
        </form>
        {mensaje && (
          <p className="text-center text-sm text-red-500 mt-2">{mensaje}</p>
        )}
      </CardContent>
    </Card>
    </div>
  );
}
