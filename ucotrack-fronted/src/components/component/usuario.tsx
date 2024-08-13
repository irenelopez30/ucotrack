
import React from 'react';
import Link from "next/link";

const Usuario: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-800">
      <div className="max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-md dark:bg-gray-900">
        <h1 className="text-3xl font-bold mb-4 text-center dark:text-gray-200">UCOTRACK</h1>
        <p className="text-gray-600 mb-8 text-center dark:text-gray-400">Elige una opción:</p>
        <div className="grid grid-cols-2 gap-4">
          <Link href="/tfg/crear" legacyBehavior>
            <a className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">
              <PlusIcon className="mr-2 h-6 w-6" />
              Crear TFG
            </a>
          </Link>
          <Link href="/tfg/listar" legacyBehavior>
            <a className="flex items-center justify-center bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">
              <ListIcon className="mr-2 h-6 w-6" />
              Listar TFG
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Usuario;

interface IconProps extends React.SVGProps<SVGSVGElement> {}

const ListIcon: React.FC<IconProps> = (props) => {
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
      <line x1="8" x2="21" y1="6" y2="6" />
      <line x1="8" x2="21" y1="12" y2="12" />
      <line x1="8" x2="21" y1="18" y2="18" />
      <line x1="3" x2="3.01" y1="6" y2="6" />
      <line x1="3" x2="3.01" y1="12" y2="12" />
      <line x1="3" x2="3.01" y1="18" y2="18" />
    </svg>
  );
};

const PlusIcon: React.FC<IconProps> = (props) => {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
};

const EditIcon: React.FC<IconProps> = (props) => {
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
      <path d="M12 20h9"></path>
      <path d="M12 20a2.5 2.5 0 01-2.5-2.5c0-3 5-7 5-9.5a3 3 0 00-3-3h-1.8a2.5 2.5 0 00-2.5 2.5v3M6 18v-4M3 15l3-3"></path>
    </svg>
  );
};
