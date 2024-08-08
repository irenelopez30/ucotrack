"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../ProtectedRoutes/ProtectedRoutes';

export function Sesion() {
  const [correo, setEmail] = useState('');
  const [contraseña, setPassword] = useState('');
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [tipoMensaje, setTipoMensaje] = useState<'exito' | 'error' | null>(null);
  const router = useRouter(); // Usar useRouter para redirigir


  const { authState, setUserAuthInfo } = useAuth(); 
  const { token } = authState;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMensaje(null);
    setTipoMensaje(null);

    try {
      const response = await fetch('http://localhost:3001/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ correo, contraseña })
      });
      const data = await response.json();
      setUserAuthInfo ({ token: data.usuario.id });
      
      if (response.ok) {
        setMensaje('Inicio de sesión exitoso');
        setTipoMensaje('exito');
        router.push('/usuario'); 
      } else {
        setMensaje(data.message || 'Correo electrónico o contraseña incorrectos');
        setTipoMensaje('error');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setMensaje('Correo electrónico o contraseña incorrectos.');
      setTipoMensaje('error');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-950">
      <header className="w-full py-4 bg-white dark:bg-gray-900 shadow">
        <div className="container mx-auto flex justify-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">UCOTrack</h1>
        </div>
      </header>
      <main className="container mx-auto flex-1 flex flex-col items-center justify-center px-4 md:px-6">
        <div className="w-full max-w-md space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
            {mensaje && (
              <div className={`mb-4 p-2 rounded-md border ${tipoMensaje === 'exito' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200'}`}>
                {mensaje}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="email">
                    Correo electrónico
                  </label>
                  <input
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    id="email"
                    placeholder="Ingresa tu correo electrónico"
                    required
                    type="email"
                    value={correo}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="password">
                    Contraseña
                  </label>
                  <input
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    id="password"
                    placeholder="Ingresa tu contraseña"
                    required
                    type="password"
                    value={contraseña}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  className="inline-flex h-10 items-center justify-center rounded-md bg-blue-600 px-6 text-base font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-400 dark:focus:ring-offset-gray-900"
                  type="submit"
                >
                  Iniciar Sesión
                </button>
              </div>
            </form>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <Link
              className="inline-flex h-12 items-center justify-center rounded-md bg-transparent border border-gray-200 border-gray-300 px-8 text-base font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:focus:ring-gray-600 dark:focus:ring-offset-gray-900 dark:border-gray-800"
              href="/registro"
            >
              Registrarse
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Sesion;
