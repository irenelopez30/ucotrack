"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = void 0;
const bcrypt = require('bcryptjs');
class loginUser {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(userData) {
        try {
            const dbUser = await this.repository.findByEmail(userData.correo);
            if (!dbUser) {
                console.log('Usuario no encontrado');
                return null;
            }
            const validPassword = bcrypt.compareSync(userData.contraseña, dbUser.contrase_a);
            if (!validPassword) {
                console.log('Contraseña incorrecta');
                return null;
            }
            return dbUser;
        }
        catch (error) {
            console.error('Error al iniciar sesión:', error);
            return null;
        }
    }
}
exports.loginUser = loginUser;
//# sourceMappingURL=loginUser.js.map