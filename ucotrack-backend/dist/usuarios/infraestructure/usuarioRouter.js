"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarioController_1 = require("./usuarioController");
const aplication_1 = require("../aplication");
const router = (0, express_1.Router)();
const usuarioRepository = new usuarioController_1.UsuarioMysqlController();
const createUsuario = new aplication_1.CreateUsuario(usuarioRepository);
const deleteUsuarioById = new aplication_1.DeleteUsuarioById(usuarioRepository);
const getUsuario = new aplication_1.GetUsuario(usuarioRepository);
const getUsuarios = new aplication_1.GetUsuarios(usuarioRepository);
const loginUsuario = new aplication_1.loginUser(usuarioRepository);
router.get('/', async (req, res) => {
    const usuarios = await getUsuarios.execute();
    res.status(200).send(usuarios.map((usuario) => usuario.toDTO()));
});
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const usuario = await getUsuario.execute(id);
    if (usuario) {
        res.status(200).send({
            usuario: usuario.toDTO(),
            message: "Usuario encontrado",
            ok: true
        });
    }
    else {
        res.status(404).send({
            message: "Usuario no encontrado",
            ok: false
        });
    }
});
router.post('/', async (req, res) => {
    const userData = req.body;
    try {
        const usuario = await createUsuario.execute(userData);
        if (usuario) {
            res.status(201).send({
                usuario: usuario.toDTO(),
                message: "Usuario registrado exitosamente",
                ok: true
            });
        }
        else {
            res.status(409).send({
                message: "El email ya está registrado",
                ok: false
            });
        }
    }
    catch (error) {
        res.status(500).send({
            message: "Error en el servidor",
            ok: false
        });
    }
});
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const deleted = await deleteUsuarioById.execute(id);
    if (deleted) {
        res.status(200).send({
            message: "Usuario eliminado",
            ok: true
        });
    }
    else {
        res.status(404).send({
            message: "Usuario no encontrado",
            ok: false
        });
    }
});
router.post('/login', async (req, res) => {
    const userData = req.body;
    const usuario = await loginUsuario.execute(userData);
    if (usuario) {
        res.status(200).send({
            usuario: usuario.toDTO(),
            message: "Usuario encontrado",
            ok: true
        });
    }
    else {
        res.status(404).send({
            message: "Usuario no encontrado",
            ok: false
        });
    }
});
router.post('/register', async (req, res) => {
    const userData = req.body;
    const usuario = await createUsuario.execute(userData);
    if (usuario) {
        res.status(200).send({
            usuario: usuario.toDTO(),
            message: "Usuario insertado",
            ok: true
        });
    }
    else {
        res.status(404).send({
            message: "Usuario no se ha insertado correctamente",
            ok: false
        });
    }
});
exports.default = router;
//# sourceMappingURL=usuarioRouter.js.map