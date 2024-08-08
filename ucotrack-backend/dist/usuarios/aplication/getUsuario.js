"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUsuario = void 0;
class GetUsuario {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id) {
        return await this.repository.findById(id);
    }
}
exports.GetUsuario = GetUsuario;
exports.default = GetUsuario;
//# sourceMappingURL=getUsuario.js.map