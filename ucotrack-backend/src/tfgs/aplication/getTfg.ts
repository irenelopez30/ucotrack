import { TfgRepository, Tfg } from '../domain/tfgRepository';


export class GetTfg {

  constructor(private repository: TfgRepository) {}

  async execute(id: string): Promise<Tfg | null> {
    return await this.repository.findById(id);
  }
}

export default GetTfg;
