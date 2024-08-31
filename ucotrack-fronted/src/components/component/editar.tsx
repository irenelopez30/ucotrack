"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; 
import { Label } from '@/components/ui/label'; 
import { Textarea } from '@/components/ui/textarea';
import Select from 'react-select';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

interface EditarProps {
  id: string;
}

const generateAcademicYearOptions = () => {
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 3; 
  const endYear = currentYear + 3; 
  const options = [];

  for (let year = startYear; year <= endYear; year++) {
    options.push({
      value: `${year}-${year + 1}`,
      label: `${year}-${year + 1}`
    });
  }

  return options;
};

const optionsAñoAcademico = generateAcademicYearOptions();

const optionsEstado = [
  { value: 'pending', label: 'Pendiente de petición' },
  { value: 'approved', label: 'Petición aprobada' },
  { value: 'in-progress', label: 'En desarrollo' },
  { value: 'submitted', label: 'Entregado' },
  { value: 'presented', label: 'Presentado' }
];

export function Editar({ id }: EditarProps) {
  const [tfg, setTfg] = useState<any>(null);
  const [titulo, setTitulo] = useState('');
  const [añoAcademico, setAñoAcademico] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [nombreAlumno, setNombreAlumno] = useState('');
  const [correoAlumno, setCorreoAlumno] = useState('');
  const [telefonoAlumno, setTelefonoAlumno] = useState('');
  const [estado, setEstado] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState<File | null>(null); // State to store the file
  const [fileError, setFileError] = useState<string | null>(null); // State to store file error message
  const router = useRouter();

  useEffect(() => {
    const fetchTFG = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3001/api/tfg/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Error al cargar el TFG');
        }

        const data = await response.json();
        const { tfg } = data;
        setTfg(tfg);
        setTitulo(tfg.titulo);
        setAñoAcademico(tfg.año_academico);
        setDescripcion(tfg.descripcion);
        setNombreAlumno(tfg.nombre_alumno);
        setCorreoAlumno(tfg.correo_alumno);
        setTelefonoAlumno(tfg.telefono_alumno);
        setEstado(tfg.estado);
      } catch (error) {
        setMensaje('Error al cargar el TFG');
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTFG();
    }
  }, [id]);

  const handleSave = async () => {
    try {
      const isValidYear = optionsAñoAcademico.some(option => option.value === añoAcademico);
      if (!isValidYear) {
        setMensaje('El año académico ingresado no es válido.');
        return;
      }

      const tfgToUpdate = {
        ...tfg,
        titulo,
        año_academico: añoAcademico,
        descripcion,
        nombre_alumno: nombreAlumno,
        correo_alumno: correoAlumno,
        telefono_alumno: telefonoAlumno,
        estado
      };

      const response = await fetch(`http://localhost:3001/api/tfg/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(tfgToUpdate),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el TFG');
      }

      if (file) {
        const uploadData = new FormData();
        uploadData.append('id', tfg.id);
        uploadData.append('file', file);
  
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: uploadData,
        });

        if (!uploadResponse.ok) {
          throw new Error('Error al subir el nuevo anteproyecto');
        }
      }

      setMensaje('TFG actualizado correctamente');
      router.push('/tfg/listar');
    } catch (error) {
      setMensaje('Error al actualizar el TFG');
      console.error('Error:', error);
    }
  };

  const handleDeleteFile = async () => {
    try {
      const response = await fetch('/api/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ tfgId: id }), 
      });
  
      if (!response.ok) {
        throw new Error('Error al eliminar el anteproyecto');
      }
  
      setMensaje('Anteproyecto eliminado correctamente');
      setFile(null);
  
    } catch (error) {
      setMensaje('Error al eliminar el anteproyecto');
      console.error('Error:', error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    if (selectedFile && selectedFile.type !== 'application/pdf') {
      setFileError('Solo se permiten archivos PDF.');
      setFile(null);
    } else {
      setFileError(null);
      setFile(selectedFile);
    }
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Editar TFG</h1>
      {mensaje && (
        <div
          className={`p-4 mb-4 text-sm rounded-lg ${
            mensaje.includes('correctamente')
              ? 'text-green-800 bg-green-100'
              : 'text-red-800 bg-red-100'
          }`}
          role="alert"
        >
          {mensaje}
        </div>
      )}

      {tfg && (
        <div className="space-y-4">
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
            />
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
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="file">Anteproyecto</Label>
            <Input
              id="file"
              type="file"
              accept=".pdf" // Only allow PDF files
              onChange={handleFileChange}
            />
            {fileError && (
              <p className="text-red-500">{fileError}</p>
            )}
            <Button onClick={handleDeleteFile}>Eliminar Anteproyecto</Button>
          </div>
          <Button onClick={handleSave}>Guardar Cambios</Button>
        </div>
      )}
    </div>
  );
}
