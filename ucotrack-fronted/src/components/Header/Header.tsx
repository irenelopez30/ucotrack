"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../ProtectedRoutes/ProtectedRoutes";
import Image from 'next/image';

interface Paths {
  path: string;
  value: string;
}

function Header() {
  const { authState, setUserAuthInfo } = useAuth();
  const router = useRouter();

  function logout() {
    setUserAuthInfo({ token: "" });
    localStorage.removeItem("token");
    router.push("/");
  }

  const userPaths: Paths[] = [
    { path: "tfg/crear", value: "Crear TFG" },
    { path: "tfg/listar", value: "Listar TFGs" },
  ];

  const guestPaths: Paths[] = [
    { path: "sesion", value: "Iniciar Sesión" },
    { path: "registro", value: "Registrarse" },
  ];

  return (
    <header className="text-white body-font bg-gray-800">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <div className="flex title-font font-medium items-center text-white mb-4 md:mb-0 cursor-pointer" onClick={() => router.push("/")}>
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/b/b7/Logounicordoba.svg"
            alt="logo"
            width={40}
            height={40}
            className="w-10 h-10 text-white p-2 bg-white rounded-full"
          />
        </div>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          {authState.token ? (
            <>
              {userPaths.map((item: Paths, index: number) => (
                <div className="mr-5 hover:text-white-900 flex items-center cursor-pointer" key={index} onClick={() => router.push(`/${item.path}`)}>
                  <span>{item.value}</span>
                </div>
              ))}
              <div className="mr-5 hover:text-white-900 flex items-center cursor-pointer" onClick={() => logout()}>
                <span>Cerrar Sesión</span>
              </div>
            </>
          ) : (
            <>
              {guestPaths.map((item: Paths, index: number) => (
                <div className="mr-5 hover:text-white-900 flex items-center cursor-pointer" key={index} onClick={() => router.push(`/${item.path}`)}>
                  <span>{item.value}</span>
                </div>
              ))}
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
