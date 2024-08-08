import { TfgRepository, Tfg } from "../domain";
import { Nota } from "../domain/nota";
export declare class TfgController implements TfgRepository {
    private prisma;
    constructor();
    findById(id: string): Promise<Tfg | null>;
    create(tfg: Tfg): Promise<Tfg>;
    modify(tfg: Tfg): Promise<Tfg>;
    remove(id: string): Promise<boolean>;
    findAll(profesorId: string): Promise<Tfg[]>;
    private mapDbToDomain;
    addNota(id_tfg: string, nota: Nota): Promise<Nota>;
    getNotas(id_tfg: string): Promise<Nota[]>;
    deleteNota(id: string): Promise<boolean>;
}
