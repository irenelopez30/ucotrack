"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TfgController = void 0;
const domain_1 = require("../domain");
const client_1 = require("@prisma/client");
const nota_1 = require("../domain/nota");
class TfgController {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    async findById(id) {
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
    async create(tfg) {
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
        }
        catch (error) {
            if (error.code === 'P2003') {
                console.log('Error de clave foránea: el valor no existe en la tabla referenciada.');
            }
            throw error;
        }
    }
    async modify(tfg) {
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
        }
        catch (error) {
            console.error('Error al actualizar el TFG:', error);
            console.log(error);
            throw error;
        }
    }
    async remove(id) {
        try {
            await this.prisma.tFG.delete({
                where: {
                    id: id
                }
            });
            return true;
        }
        catch (error) {
            console.error('Error al eliminar el TFG:', error);
            return false;
        }
    }
    async findAll(profesorId) {
        const tfgs = await this.prisma.tFG.findMany({
            where: {
                id_profesor: profesorId,
            },
        });
        console.log(tfgs);
        return tfgs.map((dbTfg) => this.mapDbToDomain(dbTfg));
    }
    mapDbToDomain(dbTfg) {
        return new domain_1.Tfg(dbTfg.id_profesor, dbTfg.titulo, dbTfg.a_o_academico, dbTfg.descripcion, dbTfg.nombre_alumno, dbTfg.correo_alumno, dbTfg.telefono_alumno, dbTfg.estado, dbTfg.id);
    }
    async addNota(id_tfg, nota) {
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
        }
        catch (error) {
            console.error('Error al añadir la nota al TFG:', error);
            throw error;
        }
    }
    async getNotas(id_tfg) {
        const notas = await this.prisma.seguimientos.findMany({
            where: {
                id_tfg: id_tfg
            },
            orderBy: {
                fecha: 'desc'
            }
        });
        return notas.map((dbNota) => new nota_1.Nota(dbNota.id, dbNota.id_tfg, dbNota.fecha, dbNota.informacion));
    }
    async deleteNota(id) {
        try {
            await this.prisma.seguimientos.delete({
                where: {
                    id: id
                }
            });
            return true;
        }
        catch (error) {
            console.error('Error al eliminar la nota:', error);
            return false;
        }
    }
}
exports.TfgController = TfgController;
//# sourceMappingURL=tfgController.js.map