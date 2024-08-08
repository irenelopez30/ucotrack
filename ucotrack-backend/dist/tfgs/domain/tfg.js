"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tfg = void 0;
const uuid_1 = require("uuid");
class Tfg {
    constructor(id_profesor, titulo, año_academico, descripcion, nombre_alumno, correo_alumno, telefono_alumno, estado, id) {
        this.id = (id && (0, uuid_1.validate)(id)) ? id : (0, uuid_1.v4)();
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
        };
    }
}
exports.Tfg = Tfg;
//# sourceMappingURL=tfg.js.map