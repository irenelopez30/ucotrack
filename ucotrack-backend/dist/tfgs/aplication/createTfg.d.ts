import { TfgRepository, Tfg } from "../domain/tfgRepository";
export declare class CreateTfg {
    private tfgRepository;
    constructor(tfgRepository: TfgRepository);
    execute(tfgData: {
        id: string;
        id_profesor: string;
        titulo: string;
        año_academico: string;
        descripcion: string;
        nombre_alumno: string;
        correo_alumno: string;
        telefono_alumno: string;
        estado: string;
    }): Promise<Tfg>;
}
