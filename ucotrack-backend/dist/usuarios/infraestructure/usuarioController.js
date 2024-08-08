"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioMysqlController = void 0;
const domain_1 = require("../domain");
const client_1 = require("@prisma/client");
class UsuarioMysqlController {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    async findById(id) {
        const dbUser = await this.prisma.usuarios.findUnique({
            where: {
                id: id
            }
        });
        if (!dbUser) {
            return null;
        }
        return new domain_1.Usuario(dbUser.nombre, dbUser.correo, dbUser.contrase_a, dbUser.id);
    }
    async create(usuario) {
        const dbUser = await this.prisma.usuarios.create({
            data: {
                ...usuario.toDTO()
            }
        });
        return new domain_1.Usuario(dbUser.nombre, dbUser.correo, dbUser.contrase_a, dbUser.id);
    }
    async modify(usuario) {
        const data = {
            ...usuario.toDTO()
        };
        const user = await this.prisma.usuarios.update({
            where: { id: usuario.id },
            data,
        });
        return !!user;
    }
    async remove(id) {
        const usuario = await this.prisma.usuarios.delete({
            where: {
                id: id
            }
        });
        return !!usuario;
    }
    async findAll() {
        const usuarios = await this.prisma.usuarios.findMany();
        return usuarios.map((usuario) => new domain_1.Usuario(usuario.nombre, usuario.correo, usuario.contrase_a, usuario.id));
    }
    async findByEmail(correo) {
        const dbUser = await this.prisma.usuarios.findFirst({
            where: {
                correo: correo
            }
        });
        if (!dbUser) {
            return null;
        }
        return new domain_1.Usuario(dbUser.nombre, dbUser.correo, dbUser.contrase_a, dbUser.id);
    }
}
exports.UsuarioMysqlController = UsuarioMysqlController;
//# sourceMappingURL=usuarioController.js.map