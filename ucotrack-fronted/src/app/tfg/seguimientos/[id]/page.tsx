"use client";

import React from 'react';
import { useParams } from 'next/navigation'; 
import { Seguimientos } from '@/components/component/seguimientos';

const CrearSeguimiento = () => {
  const { id } = useParams(); 
  
  if (!id) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Seguimientos id= {id as string} /> 
    </div>
  );
};

export default CrearSeguimiento;
