"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUsuario = void 0;
const domain_1 = require("../domain");
const bcrypt = require('bcryptjs');
class CreateUsuario {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(userData) {
        const dbUser = await this.repository.findByEmail(userData.correo);
        if (dbUser)
            return null;
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(userData.contraseña, salt);
        userData.contraseña = hash;
        const usuario = new domain_1.Usuario(userData.nombre, userData.correo, userData.contraseña);
        return await this.repository.create(usuario);
    }
}
exports.CreateUsuario = CreateUsuario;
//# sourceMappingURL=createUsuario.js.map