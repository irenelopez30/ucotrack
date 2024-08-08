"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUsuarios = void 0;
class GetUsuarios {
    constructor(repository) {
        this.repository = repository;
    }
    async execute() {
        return await this.repository.findAll();
    }
}
exports.GetUsuarios = GetUsuarios;
exports.default = GetUsuarios;
//# sourceMappingURL=getUsuarios.js.map