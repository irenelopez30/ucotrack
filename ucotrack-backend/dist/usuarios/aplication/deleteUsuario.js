"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUsuarioById = void 0;
class DeleteUsuarioById {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id) {
        const usuario = await this.repository.findById(id);
        if (!usuario)
            throw new Error("Usuario no encontrado");
        return await this.repository.remove(id);
    }
}
exports.DeleteUsuarioById = DeleteUsuarioById;
exports.default = DeleteUsuarioById;
//# sourceMappingURL=deleteUsuario.js.map