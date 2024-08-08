"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const uuid_1 = require("uuid");
const Email_1 = require("./Email");
class Usuario {
    constructor(nombre, correo, contrase_a, id) {
        this.id = (id && (0, uuid_1.validate)(id)) ? id : (0, uuid_1.v4)();
        this.nombre = nombre;
        this.contrase_a = contrase_a;
        this.correo = new Email_1.Email(correo);
    }
    toDTO() {
        return {
            id: this.id,
            nombre: this.nombre,
            correo: this.correo.getValue(),
            contrase_a: this.contrase_a,
        };
    }
}
exports.Usuario = Usuario;
//# sourceMappingURL=usuario.js.map