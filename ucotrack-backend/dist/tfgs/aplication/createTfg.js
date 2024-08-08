"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTfg = void 0;
const tfgRepository_1 = require("../domain/tfgRepository");
class CreateTfg {
    constructor(tfgRepository) {
        this.tfgRepository = tfgRepository;
    }
    async execute(tfgData) {
        const tfg = new tfgRepository_1.Tfg(tfgData.id, tfgData.id_profesor, tfgData.titulo, tfgData.año_academico, tfgData.descripcion, tfgData.nombre_alumno, tfgData.correo_alumno, tfgData.telefono_alumno, tfgData.estado);
        return await this.tfgRepository.create(tfg);
    }
}
exports.CreateTfg = CreateTfg;
//# sourceMappingURL=createTfg.js.map