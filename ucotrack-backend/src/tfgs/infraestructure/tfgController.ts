import { TfgRepository, Tfg } from "../domain";
import { PrismaClient } from '@prisma/client';
import { Nota } from "../domain/nota";

export class TfgController implements TfgRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async findById(id: string): Promise<Tfg | null> {
        const dbTfg = await this.prisma.tFG.findUnique({
            where: {
                id: id
            }
        });
        if (!dbTfg) {
            return null;
        }
        return this.mapDbToDomain(dbTfg);
    }

    async create(tfg: Tfg): Promise<Tfg> {
        try {
            const createdTfg = await this.prisma.tFG.create({
                data: {
                    id_profesor: tfg.id_profesor,
                    titulo: tfg.titulo,
                    a_o_academico: tfg.año_academico,
                    descripcion: tfg.descripcion,
                    nombre_alumno: tfg.nombre_alumno,
                    correo_alumno: tfg.correo_alumno,
                    telefono_alumno: tfg.telefono_alumno,
                    estado: tfg.estado,
                    id: tfg.id 
                }
            });
            return this.mapDbToDomain(createdTfg);
        } catch (error) {
            if (error.code === 'P2003') {
                console.log('Error de clave foránea: el valor no existe en la tabla referenciada.');
            }
            throw error;
        }
    }

    async modify(tfg: Tfg): Promise<Tfg> {
        const data = {
            id_profesor: tfg.id_profesor,
            titulo: tfg.titulo,
            a_o_academico: tfg.año_academico,
            descripcion: tfg.descripcion,
            nombre_alumno: tfg.nombre_alumno,
            correo_alumno: tfg.correo_alumno,
            telefono_alumno: tfg.telefono_alumno,
            estado: tfg.estado
        };

        try {
            const updatedTfg = await this.prisma.tFG.update({
                where: { id: tfg.id },
                data,
            });
            return this.mapDbToDomain(updatedTfg); 
        } catch (error) {
            console.error('Error al actualizar el TFG:', error);
            console.log(error);
            throw error;
        }
    }

    async remove(id: string): Promise<boolean> {
        try {
            await this.prisma.tFG.delete({
                where: {
                    id: id
                }
            });
            return true;
        } catch (error) {
            console.error('Error al eliminar el TFG:', error);
            return false;
        }
    }
    
    async findAll(profesorId: string): Promise<Tfg[]> {
        const tfgs = await this.prisma.tFG.findMany({
            where: {
                id_profesor: profesorId,
            },
        });
        console.log(tfgs);
        return tfgs.map((dbTfg) => this.mapDbToDomain(dbTfg));
    }

    private mapDbToDomain(dbTfg: any): Tfg {
        return new Tfg(
            dbTfg.id_profesor,
            dbTfg.titulo,
            dbTfg.a_o_academico,
            dbTfg.descripcion,
            dbTfg.nombre_alumno,
            dbTfg.correo_alumno,
            dbTfg.telefono_alumno,
            dbTfg.estado,
            dbTfg.id,
        );
    }

    async addNota(id_tfg: string, nota: Nota): Promise<Nota> {
        try {
            const dbnota = await this.prisma.seguimientos.create({
                data: {
                    id: nota.id,
                    id_tfg: id_tfg,
                    fecha: nota.fecha,
                    informacion: nota.informacion
                }
            });
            return dbnota;
        } catch (error) {
            console.error('Error al añadir la nota al TFG:', error);
            throw error;
        }
    }

    async getNotas(id_tfg: string): Promise<Nota[]> {
        const notas = await this.prisma.seguimientos.findMany({
            where: {
                id_tfg: id_tfg
            },
            orderBy: {
                fecha: 'desc'
            }
        });
        return notas.map((dbNota) => new Nota( dbNota.id,dbNota.id_tfg,dbNota.fecha, dbNota.informacion,));
    }

    async deleteNota(id: string): Promise<boolean> {
        try {
            await this.prisma.seguimientos.delete({
                where: {
                    id: id
                }
            });
            return true;
        } catch (error) {
            console.error('Error al eliminar la nota:', error);
            return false;
        }
    }
}
