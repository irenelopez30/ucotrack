import { TfgRepository, Tfg } from '../domain/tfgRepository';

export class ModifyTfg {

  constructor(private repository: TfgRepository) {}

  async execute(tfg: Tfg): Promise<Tfg | null> {
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

export default ModifyTfg;
