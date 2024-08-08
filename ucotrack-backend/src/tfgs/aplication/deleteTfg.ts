import { TfgRepository } from '../domain/tfgRepository';

export class DeleteTfgById {

  constructor(private repository: TfgRepository) {}

  async execute(id: string): Promise<boolean> {
    const tfg = await this.repository.findById(id);
    if (!tfg) throw new Error("TFG no encontrado");
    return await this.repository.remove(id);
  }
}

export default DeleteTfgById;
