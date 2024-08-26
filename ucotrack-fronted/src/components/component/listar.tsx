"use client";

import React, { useState, useEffect } from 'react';
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenuTrigger, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useAuth } from '../ProtectedRoutes/ProtectedRoutes';
import { v4 as uuidv4, validate } from 'uuid';
import Image from 'next/image';

class Tfg {
  id: string;
  id_profesor: string;
  titulo: string;
  año_academico: string;
  descripcion: string;
  nombre_alumno: string;
  correo_alumno: string;
  telefono_alumno: string;
  estado: string;

  constructor(
    id_profesor: string,
    titulo: string,
    año_academico: string,
    descripcion: string,
    nombre_alumno: string,
    correo_alumno: string,
    telefono_alumno: string,
    estado: string,
    id?: string
  ) {
    this.id = (id && validate(id)) ? id : uuidv4();
    this.id_profesor = id_profesor;
    this.titulo = titulo;
    this.año_academico = año_academico;
    this.descripcion = descripcion;
    this.nombre_alumno = nombre_alumno;
    this.correo_alumno = correo_alumno;
    this.telefono_alumno = telefono_alumno;
    this.estado = estado;
  }

  toDTO() {
    return {
      id: this.id,
      id_profesor: this.id_profesor,
      titulo: this.titulo,
      año_academico: this.año_academico,
      descripcion: this.descripcion,
      nombre_alumno: this.nombre_alumno,
      correo_alumno: this.correo_alumno,
      telefono_alumno: this.telefono_alumno,
      estado: this.estado
    }
  }
}

export function Listar() {
  const { authState } = useAuth();
  const { token } = authState;
  const [tfgs, setTfgs] = useState<Tfg[]>([]);
  const [mensaje, setMensaje] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTfgId, setSelectedTfgId] = useState<string | null>(null);
  const [selectedEstado, setSelectedEstado] = useState<string>('all');

  useEffect(() => {
    const fetchTFGs = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/tfg/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Error al cargar los TFGs');
        }

        const data = await response.json();
        const tfgs = data.map((tfgData: any) => new Tfg(
          tfgData.id_profesor,
          tfgData.titulo,
          tfgData.año_academico,
          tfgData.descripcion,
          tfgData.nombre_alumno,
          tfgData.correo_alumno,
          tfgData.telefono_alumno,
          tfgData.estado,
          tfgData.id
        ));
        setTfgs(tfgs);
      } catch (error) {
        setMensaje('Error al cargar los TFGs');
        console.error('Error:', error);
      }
    };

    fetchTFGs();
  }, [token]);

  const optionsEstado = [
    { value: 'all', label: 'Todos', color: 'bg-white' },
    { value: 'pending', label: 'Pendiente de petición', color: 'bg-yellow-200' },
    { value: 'approved', label: 'Petición aprobada', color: 'bg-green-200' },
    { value: 'in-progress', label: 'En desarrollo', color: 'bg-blue-200' },
    { value: 'submitted', label: 'Entregado', color: 'bg-purple-200' },
    { value: 'presented', label: 'Presentado', color: 'bg-red-200' }
  ];

  const getEstadoLabel = (value: string) => {
    const estadoObj = optionsEstado.find(option => option.value === value);
    return estadoObj ? estadoObj.label : 'Estado desconocido';
  };

  const getEstadoColor = (value: string) => {
    const estadoObj = optionsEstado.find(option => option.value === value);
    return estadoObj ? estadoObj.color : 'bg-gray-200';
  };

  const handleDelete = async () => {
    if (selectedTfgId) {
      try {
        const response = await fetch(`http://localhost:3001/api/tfg/${selectedTfgId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Error al borrar el TFG');
        }

        setTfgs(tfgs.filter(tfg => tfg.id !== selectedTfgId));
        setIsModalOpen(false);
      } catch (error) {
        setMensaje('Error al borrar el TFG');
        console.error('Error:', error);
      }
    }
  };

  const handleOpenModal = (id: string) => {
    setSelectedTfgId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTfgId(null);
  };

  const handleEstadoChange = (value: string) => {
    setSelectedEstado(value);
  };

  const filteredTfgs = selectedEstado === 'all' ? tfgs : tfgs.filter(tfg => tfg.estado === selectedEstado);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Trabajos de Fin de Grado</CardTitle>
          <CardDescription>Aquí puedes ver la lista de todos los TFG creados.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-white dark:bg-gray-950">
                  {getEstadoLabel(selectedEstado)}
                  <ChevronDownIcon className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {optionsEstado.map(option => (
                  <DropdownMenuCheckboxItem
                    key={option.value}
                    checked={selectedEstado === option.value}
                    onCheckedChange={() => handleEstadoChange(option.value)}
                  >
                    {option.label}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {mensaje && <p>{mensaje}</p>}
          <div className="grid gap-4">
            {filteredTfgs.map((tfg) => (
              <div key={tfg.id} className="p-6 border border-gray-300 rounded-lg shadow-lg mb-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-semibold text-gray-800">{tfg.titulo} <span className="text-lg text-gray-500">({tfg.año_academico})</span></h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getEstadoColor(tfg.estado)}`}>{getEstadoLabel(tfg.estado)}</span>
                </div>
                <p className="mt-4 text-gray-700 leading-relaxed">{tfg.descripcion}</p>
                <div className="mt-6 text-gray-600">
                  <p>De <strong className="text-gray-800">{tfg.nombre_alumno}</strong></p>
                  <p className="mt-1">{tfg.correo_alumno} - {tfg.telefono_alumno}</p>
                </div>
                <div className="flex justify-between mt-6">
                  <Link href={`/tfg/editar/${tfg.id}`} passHref>
                    <Button>Editar</Button>
                  </Link>
                  <Link href={`/tfg/seguimientos/${tfg.id}`} passHref>
                    <Button className="p-3">
                      <Image title="Notas" src="/notes.svg" alt="Notas" width={25} height={25} />Notas
                    </Button>
                  </Link>

                  <Button onClick={() => handleOpenModal(tfg.id)}>Borrar</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 max-w-full">
            <h2 className="text-lg font-bold">Confirmar Eliminación</h2>
            <p>¿Estás seguro de que deseas eliminar el TFG seleccionado?</p>
            <div className="flex justify-end space-x-2 mt-4">
              <Button onClick={handleDelete} >Eliminar</Button>
              <Button onClick={handleCloseModal}>Cancelar</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ChevronDownIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
