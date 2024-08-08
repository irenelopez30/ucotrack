import { v4 as uuidv4, validate } from 'uuid';

export class Tfg {
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
