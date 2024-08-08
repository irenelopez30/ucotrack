export interface TfgRepository {
    create(tfg: Tfg): Promise<Tfg>;
    findById(id: string): Promise<Tfg | null>;
    findAll(profesorId: string): Promise<Tfg[]>;
    remove(id: string): Promise<boolean>;
    modify(tfg: Tfg): Promise<Tfg>;
}
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
    toDTO(): any;
    constructor(id: string, id_profesor: string, titulo: string, año_academico: string, descripcion: string, nombre_alumno: string, correo_alumno: string, telefono_alumno: string, estado: string);
}
