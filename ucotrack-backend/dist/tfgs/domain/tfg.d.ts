export declare class Tfg {
    id: string;
    id_profesor: string;
    titulo: string;
    año_academico: string;
    descripcion: string;
    nombre_alumno: string;
    correo_alumno: string;
    telefono_alumno: string;
    estado: string;
    constructor(id_profesor: string, titulo: string, año_academico: string, descripcion: string, nombre_alumno: string, correo_alumno: string, telefono_alumno: string, estado: string, id?: string);
    toDTO(): {
        id: string;
        id_profesor: string;
        titulo: string;
        año_academico: string;
        descripcion: string;
        nombre_alumno: string;
        correo_alumno: string;
        telefono_alumno: string;
        estado: string;
    };
}
