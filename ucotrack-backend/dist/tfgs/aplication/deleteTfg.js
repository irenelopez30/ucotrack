"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteTfgById = void 0;
class DeleteTfgById {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id) {
        const tfg = await this.repository.findById(id);
        if (!tfg)
            throw new Error("TFG no encontrado");
        return await this.repository.remove(id);
    }
}
exports.DeleteTfgById = DeleteTfgById;
exports.default = DeleteTfgById;
//# sourceMappingURL=deleteTfg.js.map