export interface TfgRepository {
  create(tfg: Tfg): Promise<Tfg>;
  findById(id: string): Promise<Tfg | null>;
  findAll(profesorId: string): Promise<Tfg[]>;
  remove(id: string): Promise<boolean>;
  modify(tfg: Tfg): Promise<Tfg>; 
}

export class Tfg {
  toDTO(): any {
    throw new Error("Method not implemented.");
  }
  constructor(
    public id: string,
    public id_profesor: string,
    public titulo: string,
    public año_academico: string,
    public descripcion: string,
    public nombre_alumno: string,
    public correo_alumno: string,
    public telefono_alumno: string,
    public estado: string
  ) {}
}
