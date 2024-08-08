"use client";

import React from 'react';
import { useParams } from 'next/navigation'; 
import { Editar } from '@/components/component/editar';

const EditarTFG = () => {
  const { id } = useParams(); 

  if (!id) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Editar id={id as string} /> 
    </div>
  );
};

export default EditarTFG;
