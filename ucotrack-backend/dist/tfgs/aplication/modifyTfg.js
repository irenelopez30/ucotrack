"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModifyTfg = void 0;
class ModifyTfg {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(tfg) {
        const existingTfg = await this.repository.findById(tfg.id);
        if (!existingTfg) {
            throw new Error('TFG no encontrado');
        }
        const success = await this.repository.modify(tfg);
        if (!success) {
            throw new Error('No se pudo actualizar el TFG');
        }
        return await this.repository.findById(tfg.id);
    }
}
exports.ModifyTfg = ModifyTfg;
exports.default = ModifyTfg;
//# sourceMappingURL=modifyTfg.js.map