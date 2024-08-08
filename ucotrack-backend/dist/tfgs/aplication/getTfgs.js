"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTfgs = void 0;
class GetTfgs {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(profesorId) {
        return await this.repository.findAll(profesorId);
    }
}
exports.GetTfgs = GetTfgs;
exports.default = GetTfgs;
//# sourceMappingURL=getTfgs.js.map