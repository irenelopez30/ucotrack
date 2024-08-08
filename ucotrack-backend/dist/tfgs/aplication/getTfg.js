"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTfg = void 0;
class GetTfg {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id) {
        return await this.repository.findById(id);
    }
}
exports.GetTfg = GetTfg;
exports.default = GetTfg;
//# sourceMappingURL=getTfg.js.map