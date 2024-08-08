"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const usuarioRouter_1 = __importDefault(require("./usuarios/infraestructure/usuarioRouter"));
const TFGRouter_1 = __importDefault(require("./tfgs/infraestructure/TFGRouter"));
async function bootstrap() {
    const app = (0, express_1.default)();
    const port = process.env.PORT || 3001;
    const env = process.env.NODE_ENV || "development";
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use("/api/user", usuarioRouter_1.default);
    app.use("/api/login", usuarioRouter_1.default);
    app.use("/api/tfg", TFGRouter_1.default);
    app.listen(port, () => {
        return console.log(`server is listening ${port}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map