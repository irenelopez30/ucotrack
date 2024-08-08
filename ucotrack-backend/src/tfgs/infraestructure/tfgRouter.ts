import { Router, Request, Response } from "express";
import { TfgController } from "./tfgController";
import { Tfg } from '../domain/tfg';
import { Nota } from '../domain/nota';
import {
  CreateTfg,
  DeleteTfgById,
  GetTfg,
  GetTfgs,
  ModifyTfg 
} from "../aplication"; 

const router = Router();

const tfgController = new TfgController();

const createTfg = new CreateTfg(tfgController);
const deleteTfgById = new DeleteTfgById(tfgController);
const getTfg = new GetTfg(tfgController);
const getTfgs = new GetTfgs(tfgController);
const modifyTfg = new ModifyTfg(tfgController); // Instancia de la clase ModifyTfg

router.get('/', async (req: Request, res: Response) => {
    const jwt = req.headers.authorization.split(' ')[1];
    try {
        const tfgs = await getTfgs.execute(jwt);
        res.status(200).send(tfgs.map((tfg) => tfg.toDTO()));
    } catch (error) {
        res.status(500).send({
            message: "Error al obtener los TFGs",
            error: error.message
        });
    }
});



router.get('/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const tfg = await getTfg.execute(id);
        if (tfg) {
            res.status(200).send({
                tfg: tfg.toDTO(),
                ok: true
            });
        } else {
            res.status(404).send({
                message: "TFG no encontrado",
                ok: false
            });
        }
    } catch (error) {
        res.status(500).send({
            message: "Error al obtener el TFG",
            error: error.message
        });
    }
});

router.post('/', async (req: Request, res: Response) => {
    const tfgData = req.body;
    try {
        const tfg = await createTfg.execute(tfgData);
        if (tfg) {
            res.status(200).send({
                tfg: tfg.toDTO(),
                message: "TFG creado correctamente",
                ok: true
            });
        } else {
            res.status(400).send({
                message: "No se pudo crear el TFG",
                ok: false
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error al crear el TFG",
            error: error.message
        });
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const deleted = await deleteTfgById.execute(id);
        if (deleted) {
            res.status(200).send({
                message: "TFG eliminado correctamente",
                ok: true
            });
        } else {
            res.status(404).send({
                message: "TFG no encontrado",
                ok: false
            });
        }
    } catch (error) {
        res.status(500).send({
            message: "Error al eliminar el TFG",
            error: error.message
        });
    }
});

router.put('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const tfgData = req.body;
    try {
        const existingTfg = await tfgController.findById(id);
        if (!existingTfg) {
            return res.status(404).send({
                message: "TFG no encontrado",
                ok: false
            });
        }
        const tfg = new Tfg(
            tfgData.id_profesor,
            tfgData.titulo,
            tfgData.año_academico,
            tfgData.descripcion,
            tfgData.nombre_alumno,
            tfgData.correo_alumno,
            tfgData.telefono_alumno,
            tfgData.estado,
            id
        );

        const success = await tfgController.modify(tfg);

        if (success) {
            res.status(200).send({
                tfg: tfg.toDTO(),
                message: "TFG actualizado correctamente",
                ok: true
            });
        } else {
            res.status(400).send({
                message: "No se pudo actualizar el TFG",
                ok: false
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error al actualizar el TFG",
            error: error.message
        });
    }
});

router.post('/notes/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const nota = req.body;
    console.log(nota);
    try {
        const existingTfg = await tfgController.findById(id);
        if (!existingTfg) {
            return res.status(404).send({
                message: "TFG no encontrado",
                ok: false
            });
        }

        const success = await tfgController.addNota(id, nota);

        if (success) {
            res.status(200).send({
                message: "Nota añadida correctamente",
                ok: true
            });
        } else {
            res.status(400).send({
                message: "No se pudo añadir la nota",
                ok: false
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error al añadir la nota",
            error: error.message
        });
    }
});

router.get('/notes/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const existingTfg = await tfgController.findById(id);
        if (!existingTfg) {
            return res.status(404).send({
                message: "TFG no encontrado",
                ok: false
            });
        }

        const notas = await tfgController.getNotas(id);

        res.status(200).send({
            notas,
            ok: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error al obtener las notas",
            error: error.message
        });
    }

});

router.delete('/notes/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const success = await tfgController.deleteNota(id);

        if (success) {
            res.status(200).send({
                message: "Nota eliminada correctamente",
                ok: true
            });
        } else {
            res.status(400).send({
                message: "No se pudo eliminar la nota",
                ok: false
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error al eliminar la nota",
            error: error.message
        });
    }
});

export default router;

