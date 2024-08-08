"use client";
import React from 'react';
import Link from "next/link";
import { useAuth } from '../ProtectedRoutes/ProtectedRoutes';
import { useRouter } from 'next/navigation';

export function Landing() {
  const { authState, isUserAuthenticated } = useAuth();
  const router = useRouter();

  const handleStartNow = () => {
    if (isUserAuthenticated()) {
      router.push('/usuario');
    } else {
      router.push('/inicio');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-950">
      <header className="w-full py-4 bg-white dark:bg-gray-900 shadow">
        <div className="container mx-auto flex justify-center items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">UCOTrack</h1>
        </div>
      </header>
      <main className="container mx-auto flex-1 flex flex-col items-center justify-center px-4 md:px-6 space-y-10">
        <section className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-50">Gestión Eficiente de TFGs</h2>
          <p className="mt-4 text-gray-700 dark:text-gray-300 max-w-2xl">
            En el ámbito académico, la coordinación y seguimiento eficiente de los Trabajos de Fin de Grado (TFGs) se ha convertido en una tarea crucial. UCOTrack es la solución integral para gestionar estos proyectos de manera ágil y estructurada.
          </p>
          <button onClick={handleStartNow} className="text-blue-600">
            Comienza Ahora
          </button>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Seguimiento Personalizado</h3>
            <p className="mt-4 text-gray-700 dark:text-gray-300">
              Cada estudiante tiene un seguimiento detallado del progreso de su TFG con retroalimentación continua.
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Gestión de Documentos</h3>
            <p className="mt-4 text-gray-700 dark:text-gray-300">
              Organiza y almacena todos los documentos y entregas en un solo lugar seguro y accesible.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Landing;
