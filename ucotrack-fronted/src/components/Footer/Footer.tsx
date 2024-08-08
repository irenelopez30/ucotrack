import React from 'react';

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h3 className="text-lg font-bold">UCOTrack</h3>
          <p className="text-sm">© {new Date().getFullYear()} Todos los derechos reservados.</p>
        </div>
        <div className="flex space-x-4">
        </div>
      </div>
    </footer>
  );
}
